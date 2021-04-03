const nodeFetch = require('node-fetch')

export enum ApiUrl {
  allUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  biggerThan1Url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson',
  biggerThan2point5Url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
  biggerThan4point5Url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson',
  sigUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson',
}

export class GetQuakeInfo {
  private currentUrl: ApiUrl
  constructor(currentUrl: ApiUrl = ApiUrl.allUrl) {
    this.currentUrl = currentUrl
  }
  public async getLatest(): Promise<string> {
    return await nodeFetch(this.currentUrl)
      .then((res) => res.json())
      .then((json) => {
        //test
        return json
      })
  }
}
