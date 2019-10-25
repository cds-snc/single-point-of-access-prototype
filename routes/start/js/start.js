const searchQuery = document.querySelector('input[name=q]')
const searchButton = document.getElementById('search')
const statusCheckboxes = document.querySelectorAll('input[name=apply_filters]')
const locationCheckboxes = document.querySelectorAll(
  'input[name=apply_locations]',
)
const categoryLinks = document.querySelectorAll('.categories a')

const fetch = window.fetch
const origin = window.location.origin
const results = document.getElementById('results')
const pageLink = document.getElementById('page-link')

let filters = ''
let keyword = ''
let category = ''
let page = 1

/* Ajax request */
const fetchItems = async () => {
  console.log("hi")

  const params = `?k=${keyword}&filters=${filters}&category=${category}&page=${page.toString()}`
  const response = await fetch(`${origin}/en/search${params}`)
  const result = await response.text()

  results.innerHTML = result
  window.history.replaceState(
    { html: result, pageTitle: response.pageTitle },
    '',
    params,
  )

  formatDates()
}

/* Get all filters that are checked */
const getChecked = () => {
  const checked = []

  const statusCheckboxesChecked = document.querySelectorAll(
    'input[name=apply_filters]:checked',
  )
  const locationCheckboxesChecked = document.querySelectorAll(
    'input[name=apply_locations]:checked',
  )

  statusCheckboxesChecked.forEach(item => {
    checked.push(item.value)
  })

  locationCheckboxesChecked.forEach(item => {
    checked.push(item.value)
  })

  filters = checked.join(',')

  fetchItems()
}

/* Click events */
searchButton.addEventListener('click', async e => {
  e.preventDefault()
  keyword = searchQuery.value
  fetchItems()
})

pageLink.addEventListener('click', async e => {
  // e.preventDefault()
  page += 1
  fetchItems()
})

statusCheckboxes.forEach(item => {
  item.addEventListener('click', e => {
    getChecked()
  })
})

locationCheckboxes.forEach(item => {
  item.addEventListener('click', e => {
    getChecked()
  })
})

categoryLinks.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault()
    category = e.currentTarget.text
    fetchItems()
  })
})

/* format dates */
const formatDates = () => {
  const publishDates = document.querySelectorAll('.publish-date')
  const closingDates = document.querySelectorAll('.closing-date')

  publishDates.forEach(item => {
    const date = new Date(item.innerHTML)
    item.innerHTML = date.toLocaleString("en-US", {"month": "long", "day": "numeric", "year": "numeric"})
  })

  closingDates.forEach(item => {
    const date = new Date(item.innerHTML)
    item.innerHTML = date.toLocaleString("en-US", {"month": "long", "day": "numeric", "year": "numeric", "hour": "numeric"})
  })
}

// formatDates()
fetchItems()