const { routeUtils, getClientJs } = require('../../utils')
const fs = require('fs')
const url = require('url')

module.exports = (app, route) => {
  const name = route.name

  const _sampleData = fs.readFileSync('data/sample_data.json')
  const sampleData = JSON.parse(_sampleData)

  const _gsinDict = fs.readFileSync('data/full_dict_reverse.json')
  const gsinDict = JSON.parse(_gsinDict)

  route.draw(app)
    .get((req, res) => {
      const id = req.query.id ? req.query.id : ""
      const results = sampleData.filter(x => x.id.toString() === id)
      if (results.length !== 1) {
        console.log("oh no!")
        // need to redirect to 404 if no valid id
      }
      // const gsinCategory = gsinDict[results[0].GSIN_code]
      const gsins = results[0].GSIN_code.map(x => {
        return {
          gsinCode: x, 
          gsinCategory: gsinDict[x], 
          gsinLastCategory: gsinDict[x].split(" > ").slice(-1)[0],
        }
      })
      const js = getClientJs(req, route.name)

      const queryParams = {...req.session.searchData, ...req.query}
      const backUrl = url.format({
        pathname: "start",
        query: queryParams,
      })

      res.render(name, routeUtils.getViewData(req, {
        item: results[0],
        backUrl: backUrl,
        jsFiles: js ? [js] : false,
        gsins: gsins,
      }))
    })
}
