const axios = require('axios')
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { DocumentNode } from 'graphql'

export class HasuraConnection {
  private password: string
  private url: string
  constructor(url: string, password: string) {
    this.password = password
    this.url = url
  }

  public async runQuery(queryNode: DocumentNode, variables: object = {}) {
    const query = print(queryNode)
    console.log(query)
    console.log(variables)
    const response = await axios.post(
      this.url,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': this.password,
        },
      }
    )
    const output = response.data
    if (output.errors) {
      console.error(query)
      if (variables) {
        console.error(variables)
      }
      console.error(JSON.stringify(output.errors))
      throw new Error(JSON.stringify(output.errors))
    }
    return output
  }
}

export default HasuraConnection
