const { routeUtils, getClientJs } = require('../../utils/index')
const fs = require('fs')

const provTerrOptions = {
  'AB': 'Alberta',
  'BC': 'British Columbia',
  'MB': 'Manitoba',
  'NB': 'New Brunswick',
  'NL': 'Newfoundland and Labrador',
  'NT': 'Northwest Territories',
  'NS': 'Nova Scotia',
  'NU': 'Nunavut',
  'ON': 'Ontario',
  'PE': 'Prince Edward Island',
  'QC': 'Quebec',
  'SK': 'Saskatchewan',
  'YK': 'Yukon',
}

module.exports = (app, route) => {
  const name = route.name

  // redirect from "/" → "/start"
  app.get('/', (req, res) => res.redirect(route.path[req.locale]))

  const sampleData = fs.readFileSync('data/sample_data.json')
  const sampleDataParsed = JSON.parse(sampleData)

  route.draw(app).get(async (req, res) => {
    const js = getClientJs(req, route.name)

    res.render(
      name,
      routeUtils.getViewData(res, {
        items: sampleDataParsed.slice(0, 10),// sortPostingDate(sampleDataParsed),
        jsFiles: js ? [js] : false,
        provTerrOptions: provTerrOptions,
      }),
    )
  })
}
