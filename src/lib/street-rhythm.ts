import { LocationResourceDataType } from "@/Types/LocationResourceDataType";
import {
  StreetRhythmLanguageGroup,
  StreetRhythmRouteBundle,
} from "@/Types/StreetRhythmRouteType";

const TYPE_LABELS: Record<string, string> = {
  text: "Overview",
  image: "Landmarks",
  video: "Watch Route",
  sound: "Audio Guide",
  ai: "AI Direction",
};

export function normalizeStreetRhythmLanguage(language?: string) {
  return language?.trim().toLowerCase() || "general";
}

export function formatStreetRhythmLanguageLabel(language?: string) {
  const normalized = normalizeStreetRhythmLanguage(language);
  if (normalized === "general") return "General";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function getStreetRhythmResourceLabel(resource: LocationResourceDataType) {
  return resource.title
    ?? resource.landmark_title
    ?? resource.landmark_name
    ?? resource.subtitle
    ?? TYPE_LABELS[resource.type.toLowerCase()]
    ?? "Route Asset";
}

export function sortStreetRhythmResources(resources: LocationResourceDataType[]) {
  return [...resources].sort((left, right) => {
    const orderDelta = (left.order ?? 0) - (right.order ?? 0);
    if (orderDelta !== 0) return orderDelta;

    return getStreetRhythmResourceLabel(left).localeCompare(
      getStreetRhythmResourceLabel(right)
    );
  });
}

export function groupStreetRhythmResourcesByLanguage(
  resources: LocationResourceDataType[]
): StreetRhythmLanguageGroup[] {
  const groups = new Map<string, LocationResourceDataType[]>();

  for (const resource of sortStreetRhythmResources(resources)) {
    const normalizedLanguage = normalizeStreetRhythmLanguage(resource.language);
    const existing = groups.get(normalizedLanguage) ?? [];
    existing.push(resource);
    groups.set(normalizedLanguage, existing);
  }

  return [...groups.entries()].map(([language, items]) => ({
    language,
    label: formatStreetRhythmLanguageLabel(language),
    items,
  }));
}

export function buildStreetRhythmRouteBundle(
  resources: LocationResourceDataType[]
): StreetRhythmRouteBundle | null {
  if (!resources.length) return null;

  const sortedResources = sortStreetRhythmResources(resources);
  const firstResource = sortedResources[0];
  const overviews = sortedResources.filter((resource) => resource.type.toLowerCase() === "text");
  const landmarks = sortedResources.filter((resource) => resource.type.toLowerCase() === "image");
  const videos = sortedResources.filter((resource) => resource.type.toLowerCase() === "video");
  const audioGuides = sortedResources.filter((resource) => resource.type.toLowerCase() === "sound");
  const aiDirections = sortedResources.filter((resource) => resource.type.toLowerCase() === "ai");

  const languages = Array.from(
    new Set(sortedResources.map((resource) => normalizeStreetRhythmLanguage(resource.language)))
  );

  return {
    routeKey: firstResource.route_key,
    from: firstResource.from_location,
    to: firstResource.to_location,
    tags: firstResource.tags ?? [],
    languages,
    resources: sortedResources,
    overviews,
    landmarks,
    videos,
    audioGuides,
    aiDirections,
    overviewGroups: groupStreetRhythmResourcesByLanguage(overviews),
    videoGroups: groupStreetRhythmResourcesByLanguage(videos),
    audioGroups: groupStreetRhythmResourcesByLanguage(audioGuides),
  };
}
