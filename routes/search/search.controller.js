const { routeUtils } = require('./../../utils')
const fs = require('fs')

module.exports = (app, route) => {
  const name = route.name

  const sampleData = fs.readFileSync('data/sample_data.json')
  const sampleData2 = JSON.parse(sampleData)

  route.draw(app).get((req, res) => {
    const shuffle = array => {
      return array.sort(() => Math.random() - 0.5)
    }

    let category = ' All categories'

    if (req.query.category) {
      category = req.query.category
    }

    res.render(
      name,
      routeUtils.getViewData(req, { items: shuffle(sampleData2), category }),
    )
  })
}
