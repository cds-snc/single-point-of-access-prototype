const { routeUtils } = require('./../../utils')
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

const sortPostingDate = array => {
  return array.sort((a, b) => {
    const dateA = new Date(a.published_date)
    const dateB = new Date(b.published_date)
    return dateB - dateA
})
}

module.exports = (app, route) => {
  const name = route.name

  const _sampleData = fs.readFileSync('data/sample_data.json')
  const sampleData = JSON.parse(_sampleData)

  const filterByProvince = (array, selectedProvinces) => {
    if(selectedProvinces.size < 1) {
      return array
    }
    return array.filter(x => {
      const listedProvinces = new Set(x.province_territory_of_work)
      if (intersection(listedProvinces, selectedProvinces).size > 0) {
        return true
      }
        return false
    })
  }

  const filterByGsin = (array, selectedGsins) => {
    if(selectedGsins.length < 1) {
      return array
    }
    const gsin = selectedGsins[0] // there is only 1 for now
    return array.filter(x => {
      const matchingElements = x.GSIN_code.filter(listingGsin => {
        const firstChars = listingGsin.slice(0, gsin.length)
        return firstChars === gsin
      })
      return matchingElements.length > 0
    })
  }

  route.draw(app).get((req, res) => {

    let category = ' All categories'

    if (req.query.category) {
      category = req.query.category
    }

    let provTerr = ""
    if (req.query.filters) {
      provTerr = req.query.filters
    }

    let gsin = ""
    if (req.query.gsin) {
      gsin = req.query.gsin
    }

    req.session.searchData = {gsin: gsin, filters: provTerr}

    const selectedProvinces = new Set(provTerr.split(",").filter(x => x))
    const selectedGsins = gsin.split(",").filter(x => x)
    const _results = filterByGsin(sampleData, selectedGsins)
    const results = filterByProvince(_results, selectedProvinces)

    res.render(
      name,
      routeUtils.getViewData(req, { 
        items: sortPostingDate(results).slice(0, 40),
        category: category,
        totalResults: results.length,
      }),
    )
  })
}
