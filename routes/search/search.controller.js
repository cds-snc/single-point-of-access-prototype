const { routeUtils } = require('./../../utils')

module.exports = (app, route) => {
  const name = route.name

  const items = [
    {
      heading: 'Business Analyst',
      location1: 'Department for Business, Energy and Industrial Strategy',
      location2: 'London',
      title: 'Digital specialists Business analyst',
      published: 'Published: Monday 21 October 2019',
      deadline: 'Deadline for asking questions: Monday 28 October 2019',
      closing: 'Closing: Monday 4 November 2019',
      description:
        'BA sought to provide technical expertise for a stakeholder engagement tool, working with policy and developers. Preference for Salesforce skills and testing experience. Will require regular liaison with multiple teams.',
    },
    {
      heading: 'NaBIS Database Update Analyst/Developer',
      location1: 'Home Office',
      location2: 'London',
      title: 'Digital specialists Developer',
      published: 'Published: Monday 21 October 2019',
      deadline: 'Deadline for asking questions: Wednesday 23 October 2019',
      closing: 'Closing: Monday 28 October 2019',
      description:
        'An analyst to analyse the code, faults and change requests to specify the development; analysing and directing the development.',
    },
    {
      heading: 'NaBIS Database Update Developer',
      location1: 'Home Office',
      location2: 'London',
      title: 'Digital specialists Developer',
      published: 'Published: Monday 21 October 2019',
      deadline: 'Deadline for asking questions: Wednesday 23 October 2019',
      closing: 'Closing: Monday 28 October 2019',
      description:
        'An analyst to analyse the code, faults and change requests to specify the development; analysing and directing the development.',
    },
    {
      heading:
        'Discovery to determine requirements for a Learning Management /Induction & Onboarding System',
      location1: 'Health Education England',
      location2: 'Off-site',
      title: 'Digital specialists Business analyst',
      published: 'Published: Monday 21 October 2019',
      deadline: 'Deadline for asking questions: Wednesday 23 October 2019',
      closing: 'Closing: Monday 28 October 2019',
      description:
        'HEE are looking for technical expertise across a discovery phase into the needs of our users and potential systems we could implement in relation to a learning management, induction and onboarding system.',
    },
  ]

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
      routeUtils.getViewData(req, { items: shuffle(items), category }),
    )
  })
}
