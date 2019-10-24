const searchQuery = document.querySelector('input[name=q]')
const searchButton = document.getElementById('search')
const statusCheckboxes = document.querySelectorAll('input[name=gsin_category_filter]')
const locationCheckboxes = document.querySelectorAll(
  'input[name=location_filter]',
)
const categoryLinks = document.querySelectorAll('.categories a')

const fetch = window.fetch
const origin = window.location.origin
const results = document.getElementById('results')

let filters = ''
let keyword = ''
let category = ''

/* Ajax request */
const fetchItems = async () => {
  const params = `?k=${keyword}&filters=${filters}&category=${category}`
  const response = await fetch(`${origin}/en/search${params}`)
  const result = await response.text()

  results.innerHTML = result
  window.history.replaceState(
    { html: result, pageTitle: response.pageTitle },
    '',
    params,
  )
}

/* Get all filters that are checked */
const getChecked = () => {
  const checked = []

  const statusCheckboxesChecked = document.querySelectorAll(
    'input[name=gsin_category_filter]:checked',
  )
  const locationCheckboxesChecked = document.querySelectorAll(
    'input[name=location_filter]:checked',
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
