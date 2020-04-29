Used SAM to being to flesh out some Google Sheets wrangling.

Used `google-spreadsheet` and a service level account on Google.

Example function taken out of context from the [repo](https://github.com/doingandlearning/soul-farm/)
showing reading with the library.

```js
var doc = new GoogleSpreadsheet(spreadSheet)
await doc.useServiceAccountAuth(creds)
await doc.loadInfo()
const sheet = doc.sheetsByIndex[0]
const rows = await sheet.getRows()
const headers = sheet.headerValues.filter(item => item !== 'No')
const monthlyData = rows.reduce((acc, row) => {
  acc[row.No] = acc[row.No] || []
  acc[row.No] = Object.fromEntries(
    headers.map(header => {
      return [header, row[header]]
    })
  )
  return acc
}, [])
return monthlyData
```

and an example of writing with the library

```js
async function writeOrders(orders) {
  var doc = new GoogleSpreadsheet(orderSpreadsheet)
  try {
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    console.log(orders)
    await sheet.addRows(orders)
    return true
  } catch (err) {
    console.log(err)
  }
}
```
