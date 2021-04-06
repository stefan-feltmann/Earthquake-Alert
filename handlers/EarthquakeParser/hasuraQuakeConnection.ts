import gql from 'graphql-tag'
import HasuraConnection from '../common/hasuraConnection'
import { EarthquakeFull } from '../__types'

export class HasuraQuakeConnection extends HasuraConnection {
  constructor(url: string, password: string) {
    super(url, password)
  }

  public async insertQuakes(quakes: EarthquakeFull) {
    for (const quake of quakes.features) {
      const properties = quake.properties
      let InsertEarthquakeInfoMutationVariables = {
        alert: properties.alert,
        cdi: properties.cdi,
        code: properties.code,
        epicenter_distance: properties.dmail,
        event_type: properties.type,
        felt: properties.felt,
        gaps: properties.gaps,
        geojson_url: properties.detail,
        geometry: `${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]}`,
        ids: properties.ids,
        mag_type: properties.magType,
        magnitude: properties.mag,
        mmi: properties.mmi,
        network: properties.net,
        place: properties.place,
        product_types: properties.types,
        root_mean_square: properties.rms,
        significance: properties.sig,
        sources: properties.sources,
        station_count: properties.nst,
        status: properties.status,
        time: new Date(properties.time),
        timezone: properties.tz,
        tsunami: properties.tsunami,
        updated: new Date(properties.updated),
        url: properties.url,
      }

      //   let InsertEarthquakeInfoMutationVariables = {
      //     alert: properties.alert,
      //     cdi: properties.cdi,
      //     code: properties.code,
      //     epicenter_distance: properties.dmail,
      //     event_type: properties.type,
      //     felt: properties.felt,
      //     gaps: properties.gaps,
      //     geojson_url: properties.detail,
      //     ids: properties.ids,
      //     mag_type: properties.magType,
      //     magnitude: properties.mag,
      //     mmi: properties.mmi,
      //     network: properties.net,
      //     place: properties.place,
      //     product_types: properties.types,
      //     root_mean_square: properties.rms,
      //     significance: properties.sig,
      //     sources: properties.sources,
      //     station_count: properties.nst,
      //     status: properties.status,
      //     timezone: properties.tz,
      //     tsunami: properties.tsunami,
      //     url: properties.url,
      //   }

      let InsertEarthquakeInfoMutation = gql`
        mutation MyMutation(
          $alert: String = ""
          $cdi: Float = 1.5
          $code: String = ""
          $epicenter_distance: Float = 1.5
          $event_type: String = ""
          $felt: Int = 10
          $gaps: Float = 1.5
          $geojson_url: String = ""
          $geometry: point = ""
          $ids: String = ""
          $mag_type: String = ""
          $magnitude: Float = 1.5
          $mmi: Float = 1.5
          $network: String = ""
          $place: String = ""
          $product_types: String = ""
          $root_mean_square: Float = 1.5
          $significance: Int = 10
          $sources: String = ""
          $station_count: Int = 10
          $status: String = ""
          $time: timestamp = ""
          $timezone: Int = 10
          $tsunami: Int = 10
          $updated: timestamp = ""
          $url: String = ""
        ) {
          insert_EarthquakeInfo_one(
            object: {
              alert: $alert
              cdi: $cdi
              code: $code
              epicenter_distance: $epicenter_distance
              event_type: $event_type
              felt: $felt
              gaps: $gaps
              geojson_url: $geojson_url
              geometry: $geometry
              ids: $ids
              mag_type: $mag_type
              magnitude: $magnitude
              mmi: $mmi
              network: $network
              place: $place
              product_types: $product_types
              root_mean_square: $root_mean_square
              significance: $significance
              sources: $sources
              station_count: $station_count
              status: $status
              time: $time
              timezone: $timezone
              tsunami: $tsunami
              updated: $updated
              url: $url
            }
          ) {
            alert
            cdi
            code
            epicenter_distance
            event_type
            felt
            gaps
            geojson_url
            geometry
            ids
            mag_type
            magnitude
            mmi
            network
            place
            product_types
            root_mean_square
            significance
            sources
            station_count
            status
            url
            updated
            tsunami
            timezone
            time
          }
        }
      `

      //   let InsertEarthquakeInfoMutation = gql`
      //     mutation MyMutation(
      //       $alert: String = ""
      //       $cdi: Float = 1.5
      //       $code: String = ""
      //       $epicenter_distance: Float = 1.5
      //       $event_type: String = ""
      //       $felt: Int = 10
      //       $gaps: Float = 1.5
      //       $geojson_url: String = ""
      //       $ids: String = ""
      //       $mag_type: String = ""
      //       $magnitude: Float = 1.5
      //       $mmi: Float = 1.5
      //       $network: String = ""
      //       $place: String = ""
      //       $product_types: String = ""
      //       $root_mean_square: Float = 1.5
      //       $significance: Int = 10
      //       $sources: String = ""
      //       $station_count: Int = 10
      //       $status: String = ""
      //       $timezone: Int = 10
      //       $tsunami: Int = 10
      //       $url: String = ""
      //     ) {
      //       insert_EarthquakeInfo_one(
      //         object: {
      //           alert: $alert
      //           cdi: $cdi
      //           code: $code
      //           epicenter_distance: $epicenter_distance
      //           event_type: $event_type
      //           felt: $felt
      //           gaps: $gaps
      //           geojson_url: $geojson_url
      //           ids: $ids
      //           mag_type: $mag_type
      //           magnitude: $magnitude
      //           mmi: $mmi
      //           network: $network
      //           place: $place
      //           product_types: $product_types
      //           root_mean_square: $root_mean_square
      //           significance: $significance
      //           sources: $sources
      //           station_count: $station_count
      //           status: $status
      //           timezone: $timezone
      //           tsunami: $tsunami
      //           url: $url
      //         }
      //       ) {
      //         alert
      //         cdi
      //         code
      //         epicenter_distance
      //         event_type
      //         felt
      //         gaps
      //         geojson_url
      //         geometry
      //         ids
      //         mag_type
      //         magnitude
      //         mmi
      //         network
      //         place
      //         product_types
      //         root_mean_square
      //         significance
      //         sources
      //         station_count
      //         status
      //         url
      //         updated
      //         tsunami
      //         timezone
      //         time
      //       }
      //     }
      //   `
      await super.runQuery(InsertEarthquakeInfoMutation, InsertEarthquakeInfoMutationVariables)
    }
  }
}
