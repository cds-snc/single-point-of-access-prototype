const { routeUtils, getClientJs } = require('../../utils/index')
const fs = require('fs')

const intersection = (setA, setB) => {
  var _intersection = new Set();
  for (var elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem);
      }
  }
  return _intersection;
}

module.exports = (app, route) => {
  const name = route.name

  const sampleData = fs.readFileSync('data/sample_data.json')
  const sampleData2 = JSON.parse(sampleData)

  route.draw(app).get((req, res) => {
    const js = getClientJs(req, route.name)

    const filter = (array, selectedProvinces) => {
      return array.filter(x => {
        const listedProvinces = new Set(x.province_territory_of_work)
        if (intersection(listedProvinces, selectedProvinces).size > 0) {
          return true
        }
          return false
      })
    }

    let category = ' All categories'

    if (req.query.category) {
      category = req.query.category
    }

    let provTerr = ""
    if (req.query.filters) {
      provTerr = req.query.filters
    }
    const selectedProvinces = new Set(provTerr.split(","))
    const results = filter(sampleData2, selectedProvinces)
    res.render(
      name,
      routeUtils.getViewData(req, { 
        items: results,
        jsFiles: js ? [js] : false,
        category: category,
      }),
    )
  })
}
