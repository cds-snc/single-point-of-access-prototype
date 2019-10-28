// your js code here
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

  formatDates()