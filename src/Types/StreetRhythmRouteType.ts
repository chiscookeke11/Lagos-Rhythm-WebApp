import { LocationResourceDataType } from "./LocationResourceDataType";

export interface StreetRhythmLanguageGroup {
  language: string;
  label: string;
  items: LocationResourceDataType[];
}

export interface StreetRhythmRouteBundle {
  routeKey: string;
  from: string;
  to: string;
  tags: string[];
  languages: string[];
  resources: LocationResourceDataType[];
  overviews: LocationResourceDataType[];
  landmarks: LocationResourceDataType[];
  videos: LocationResourceDataType[];
  audioGuides: LocationResourceDataType[];
  aiDirections: LocationResourceDataType[];
  overviewGroups: StreetRhythmLanguageGroup[];
  videoGroups: StreetRhythmLanguageGroup[];
  audioGroups: StreetRhythmLanguageGroup[];
}
