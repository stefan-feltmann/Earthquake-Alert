import gql from 'graphql-tag'
import HasuraConnection from './hasuraConnection'

let hasuraUrl = 'http://localhost:8080/v1/graphql'
let password = 'admin'

describe('hasuraConnection', () => {
  test('', async () => {
    let connection = new HasuraConnection(hasuraUrl, password)

    let dispatchPayloadQuery = gql`
      query ConnectionTestQuery {
        EarthquakeInfo {
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
          updated
          tsunami
          timezone
          time
          status
          station_count
          sources
          significance
          root_mean_square
          product_types
        }
      }
    `

    let foo = await connection.runQuery(dispatchPayloadQuery)

    expect(foo).toBeTruthy()
  })
})
