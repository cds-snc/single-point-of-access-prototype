console.log('start')
const searchEl = document.getElementById('search')
const results = document.getElementById('results')

const origin = 'http://localhost:3000'
var counter = 1

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

searchEl.addEventListener('click', async e => {
  e.preventDefault()
  const response = await fetch(`${origin}/en/search`)
  const result = await response.text()
  results.innerHTML = result
  // demo update the browser url
  window.history.replaceState(
    { html: result, pageTitle: response.pageTitle },
    '',
    `?times-search=${getRandomInt(100)}`,
  )
})
