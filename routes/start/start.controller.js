const { routeUtils, getClientJs } = require('../../utils/index')
const fs = require('fs')


module.exports = (app, route) => {
  const name = route.name

  // redirect from "/" → "/start"
  app.get('/', (req, res) => res.redirect(route.path[req.locale]))

  const sampleData = fs.readFileSync('data/sample_data.json')
  const sampleData2 = JSON.parse(sampleData)

  route.draw(app).get(async (req, res) => {
    const js = getClientJs(req, route.name)

    const shuffle = array => {
      return array.sort(() => Math.random() - 0.5)
    }

    res.render(
      name,
      routeUtils.getViewData(res, {
        items: shuffle(sampleData2.slice(0, 10)),
        jsFiles: js ? [js] : false,
      }),
    )
  })
}
