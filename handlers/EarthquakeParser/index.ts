import { EarthquakeFull } from "../__types";
import { GetQuakeInfo } from "./fetchQuakeInfo";
import QuakeParser from "./quakeParser";

let quakeParser = new QuakeParser()

exports.handler = async function(event) {
  let getQuakeInfo = new GetQuakeInfo() // TODO: Figure out how to make this easily configurable
  let getLatest = await getQuakeInfo.getLatest()
  console.log("getLatest:", getLatest)
  const getLatestJson = getLatest as unknown as EarthquakeFull
  console.log("getLatestJson:", getLatestJson)
  let parsed = quakeParser.parse(getLatestJson)
  console.log("parsed:", JSON.stringify(parsed))
  // console.log("request:", JSON.stringify(event, undefined, 2));
  // return {
  //   statusCode: 200,
  //   headers: { "Content-Type": "text/plain" },
  //   body: `Hello, CDK! You've hit ${event.path}\n`
  // };
  return
}