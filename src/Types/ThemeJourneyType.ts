export interface PackageOption {
  duration: string
  price: number
}

export interface PackageItem {
  id: number
  title: string
  options: PackageOption[]
}

export interface ThemeJourneyType {
  title: string
  description: string
  majorPackages?: PackageItem[]
  minorPackages?: PackageItem[]
}
