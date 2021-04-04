import { GetQuakeInfo, ApiUrl } from './fetchQuakeInfo'

jest.setTimeout(50000)

describe('GetQuakeInfo', () => {
  test('', async () => {
    let defaultApi = new GetQuakeInfo()
    let defaultOutput = await defaultApi.getLatest()
    // console.log(bar)
    expect(defaultOutput).toBeDefined()

    let allApi = new GetQuakeInfo(ApiUrl.allUrl)
    let allOutput = await allApi.getLatest()
    expect(allOutput).toBeDefined()

    let oneApi = new GetQuakeInfo(ApiUrl.biggerThan1Url)
    let oneOutput = await oneApi.getLatest()
    expect(oneOutput).toBeDefined()

    let twoApi = new GetQuakeInfo(ApiUrl.biggerThan2point5Url)
    let twoOutput = await twoApi.getLatest()
    expect(twoOutput).toBeDefined()

    let fourApi = new GetQuakeInfo(ApiUrl.biggerThan4point5Url)
    let fourOutput = await fourApi.getLatest()
    expect(fourOutput).toBeDefined()

    let sigApi = new GetQuakeInfo(ApiUrl.sigUrl)
    let sigOutput = await sigApi.getLatest()
    expect(sigOutput).toBeDefined()
  })
})
