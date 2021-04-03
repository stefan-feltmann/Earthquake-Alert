export type EarthquakeInfo = {
  mag: number
  place: string
  time: number
  updated: number
  tz: number
  url: string
  detail: string
  felt: number
  cdi: number
  mmi: number
  alert: string
  status: string
  tsunami: number
  sig: number
  net: string
  code: string
  ids: string
  sources: string
  types: string
  nst: number
  dmail: number
  rms: number
  gaps: number
  magType: string
  type: string
}

export type EarthquakeMetadata = {
  generated: number
  url: string
  title: string
  api: string
  count: number
  status: number
}

export type EarthquakeGeometry = {
  generated: number
  url: string
  title: string
  api: string
  count: number
  status: number
}

export type EarthquakeFeature = {
  properties: EarthquakeInfo
  geometry: {
    coordinates: number[]
  }
}

export type EarthquakeFull = {
  metadata: EarthquakeMetadata
  bbox: number[]
  features: EarthquakeFeature[]
}
