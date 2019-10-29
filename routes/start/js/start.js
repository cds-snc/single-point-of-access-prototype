import accessibleAutocomplete from 'accessible-autocomplete'
import gsinData from '../../../data/L2_dict.json'
import gsinDataReverse from '../../../data/L2_dict_reverse.json'

const locationCheckboxes = document.querySelectorAll(
  'input[name=apply_locations]',
)
const clearFilters = document.getElementById('clear-filters')
// const categoryLinks = document.querySelectorAll('.categories a')

const fetch = window.fetch
const origin = window.location.origin
const results = document.getElementById('results')

const getQueryVariable = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

let filters = ''
let gsin = ''

if(window.location.search) {
  filters = getQueryVariable("filters") ? getQueryVariable("filters") : ''
  gsin = getQueryVariable("gsin") ? getQueryVariable("gsin") : ''
}

const checkTheBoxes = () => {
  locationCheckboxes.forEach(item => {
    if (filters.indexOf(item.value) > -1) {
      item.checked = true
    }
  })
}

const showOrHideClearFilters = () => {
  if (
    ((filters || gsin) && clearFilters.classList.contains("hidden"))
    || ((!filters && !gsin) && !clearFilters.classList.contains("hidden"))
    ) {
    clearFilters.classList.toggle("hidden")
  }  
}


checkTheBoxes()
/* Ajax request */
const fetchItems = async () => {
  const params = `?filters=${filters}&gsin=${gsin}`
  const response = await fetch(`${origin}/en/search${params}`)
  const result = await response.text()

  results.innerHTML = result
  window.history.replaceState(
    { html: result, pageTitle: response.pageTitle },
    '',
    params,
  )
    
  formatDates()
  showOrHideClearFilters()

}

/* Get all filters that are checked */
const getChecked = () => {
  const checked = []

  const locationCheckboxesChecked = document.querySelectorAll(
    'input[name=apply_locations]:checked',
  )

  locationCheckboxesChecked.forEach(item => {
    checked.push(item.value)
  })

  filters = checked.join(',')

  fetchItems()
}

/* Click events */

locationCheckboxes.forEach(item => {
  item.addEventListener('click', e => {
    getChecked()
  })
})

// categoryLinks.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault()
//     category = e.currentTarget.text
//     fetchItems()
//   })
// })

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

accessibleAutocomplete({
  element: document.querySelector('#gsin-search'),
  id: 'gsin', // To match it to the existing <label>.
  source: Object.keys(gsinData),
  defaultValue: gsin !== "" ? gsinDataReverse[gsin] : "",
  onConfirm: (gsinName) => {
    if(gsinName === undefined) {
      // autocomplete's onConfirm seems to fire spuriously when the checkboxes are clicked
      return
    }
    gsin = gsinData[gsinName]
    fetchItems()
  },
})

fetchItems()
