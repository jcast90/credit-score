const REPORTS_URL = 'https://sandbox.sweatpantsclubapps.com/reports'

export default async () => {
  const response = await fetch(REPORTS_URL)
  const rawData = await response.json()

  // reduce data mapping
  const body = rawData.data[0].data

  return {
    statusCode: response.status,
    body,
  }
}
