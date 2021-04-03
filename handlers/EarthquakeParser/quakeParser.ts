import { EarthquakeFull } from '../__types'
class QuakeParser {
  constructor() {}
  public parse(msg: EarthquakeFull): EarthquakeFull {
    console.log(msg)
    return msg
  }
}

export default QuakeParser
