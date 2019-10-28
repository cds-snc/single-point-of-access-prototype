import accessibleAutocomplete from 'accessible-autocomplete'

const gsinData = {"Research and Development": "A", "Special Studies and Analysis - not R&D": "B", "Architecture and Engineering Services": "C", "Information Processing and Related Telecommunications Services": "D", "Environmental Services": "E", "Natural Resources and Conservation Services": "F", "Health and Social Services": "G", "Quality Control, Testing and Inspection and Technical Representative Services": "H", "Maintenance, Repair, Modification, Rebuilding and Installation of Equipment": "J", "Custodial Operations and Related Services": "K", "Financial and Related Services": "L", "Operation of Government Owned Facilities": "M", "Professional, Administrative and Management Support Services": "R", "Utilities": "S", "Communications, Photographic, Mapping, Printing and Publications Services": "T", "Education and Training Services": "U", "Transportation, Travel and Relocation Services": "V", "Lease or Rental of Equipment": "W", "Weapons": "N10", "Nuclear Ordinance": "N11", "Fire Control Equipment": "N12", "Ammunition and Explosives": "N13", "Guided Missiles": "N14", "Aircraft and Airframe Structural Components": "N15", "Aircraft Components and Accessories": "N16", "Aircraft Launching, Landing, and Ground Handling Equipment": "N17", "Space Vehicles": "N18", "Ships, Small Craft, Pontoons, and Floating Docks": "N19", "Ship and Marine Equipment": "N20", "Railway Equipment": "N22", "Ground Effect Vehicles, Motor Vehicles, Trailers, and Cycles": "N23", "Tractors": "N24", "Vehicular Equipment Components": "N25", "Tires and Tubes": "N26", "Engines, Turbines, and Components": "N28", "Engine Accessories": "N29", "Mechanical Power Transmission Equipment": "N30", "Bearings": "N31", "Woodworking Machinery and Equipment": "N32", "Metalworking Machinery": "N34", "Service and Trade Equipment": "N35", "Special Industry Machinery": "N36", "Agricultural Machinery and Equipment": "N37", "Construction, Mining, Excavating, and Highway Maintenance Equipment": "N38", "Materials Handling Equipment": "N39", "Rope, Cable, Chain, and Fittings": "N40", "Refrigeration, Air Conditioning, and Air Circulating Equipment": "N41", "Fire Fighting, Rescue, and Safety Equipment; and Environmental Protection Equipment and Materials": "N42", "Pumps and Compressors": "N43", "Furnace, Steam Plant, and Drying Equipment; and Nuclear Reactors": "N44", "Plumbing, Heating, and Waste Disposal Equipment": "N45", "Water Purification and Sewage Treatment Equipment": "N46", "Pipe, Tubing, Hose, and Fittings": "N47", "Valves": "N48", "Maintenance and Repair Shop Equipment": "N49", "Hand Tools": "N51", "Measuring Tools": "N52", "Hardware and Abrasives": "N53", "Prefabricated Structures and Scaffolding": "N54", "Lumber, Millwork, Plywood, and Veneer": "N55", "Construction and Building Materials": "N56", "Communication, Detection, and Coherent Radiation Equipment": "N58", "Electrical and Electronic Equipment Components": "N59", "Fiber Optics Materials, Components, Assemblies, and Accessories": "N60", "Electric Wire, and Power and Distribution Equipment": "N61", "Lighting Fixtures and Lamps": "N62", "Alarm, Signal and Security Detection Systems": "N63", "Medical, Dental, and Veterinary Equipment and Supplies": "N65", "Instruments and Laboratory Equipment": "N66", "Photographic Equipment": "N67", "Chemicals and Chemical Products": "N68", "Training Aids and Devices": "N69", "Automatic Data Processing Equipment (Including Firmware), Software, Supplies and Support Equipment": "N70", "Furniture": "N71", "Household and Commercial Furnishings and Appliances": "N72", "Food Preparation and Serving Equipment": "N73", "Office Machines, Text Processing Systems and Visible Record Equipment": "N74", "Office Supplies and Devices": "N75", "Books, Maps, and Other Publications": "N76", "Musical Instruments, Phonographs, and Home-Type Radios": "N77", "Recreational and Athletic Equipment": "N78", "Cleaning Equipment and Supplies": "N79", "Brushes, Paints, Sealers, and Adhesives": "N80", "Containers, Packaging, and Packing Supplies": "N81", "Textiles, Leather, Furs, Apparel and Shoe Findings, Tents and Flags": "N83", "Clothing, Individual Equipment, and Insignia": "N84", "Toiletries": "N85", "Agricultural Supplies": "N87", "Live Animals": "N88", "Subsistence": "N89", "Fuels, Lubricants, Oils, and Waxes": "N91", "Nonmetallic Fabricated Materials": "N93", "Nonmetallic Crude Materials": "N94", "Metal Bars, Sheets, and Shapes": "N95", "Ores, Minerals, and Their Primary Products": "N96", "Miscellaneous ": "N99", "For the purposes of trade agreement coverage, NCLOG procurements are considered not covered. ": "N1"}
const gsinDataReverse = {"A": "Research and Development", "B": "Special Studies and Analysis - not R&D", "C": "Architecture and Engineering Services", "D": "Information Processing and Related Telecommunications Services", "E": "Environmental Services", "F": "Natural Resources and Conservation Services", "G": "Health and Social Services", "H": "Quality Control, Testing and Inspection and Technical Representative Services", "J": "Maintenance, Repair, Modification, Rebuilding and Installation of Equipment", "K": "Custodial Operations and Related Services", "L": "Financial and Related Services", "M": "Operation of Government Owned Facilities", "R": "Professional, Administrative and Management Support Services", "S": "Utilities", "T": "Communications, Photographic, Mapping, Printing and Publications Services", "U": "Education and Training Services", "V": "Transportation, Travel and Relocation Services", "W": "Lease or Rental of Equipment", "N10": "Weapons", "N11": "Nuclear Ordinance", "N12": "Fire Control Equipment", "N13": "Ammunition and Explosives", "N14": "Guided Missiles", "N15": "Aircraft and Airframe Structural Components", "N16": "Aircraft Components and Accessories", "N17": "Aircraft Launching, Landing, and Ground Handling Equipment", "N18": "Space Vehicles", "N19": "Ships, Small Craft, Pontoons, and Floating Docks", "N20": "Ship and Marine Equipment", "N22": "Railway Equipment", "N23": "Ground Effect Vehicles, Motor Vehicles, Trailers, and Cycles", "N24": "Tractors", "N25": "Vehicular Equipment Components", "N26": "Tires and Tubes", "N28": "Engines, Turbines, and Components", "N29": "Engine Accessories", "N30": "Mechanical Power Transmission Equipment", "N31": "Bearings", "N32": "Woodworking Machinery and Equipment", "N34": "Metalworking Machinery", "N35": "Service and Trade Equipment", "N36": "Special Industry Machinery", "N37": "Agricultural Machinery and Equipment", "N38": "Construction, Mining, Excavating, and Highway Maintenance Equipment", "N39": "Materials Handling Equipment", "N40": "Rope, Cable, Chain, and Fittings", "N41": "Refrigeration, Air Conditioning, and Air Circulating Equipment", "N42": "Fire Fighting, Rescue, and Safety Equipment; and Environmental Protection Equipment and Materials", "N43": "Pumps and Compressors", "N44": "Furnace, Steam Plant, and Drying Equipment; and Nuclear Reactors", "N45": "Plumbing, Heating, and Waste Disposal Equipment", "N46": "Water Purification and Sewage Treatment Equipment", "N47": "Pipe, Tubing, Hose, and Fittings", "N48": "Valves", "N49": "Maintenance and Repair Shop Equipment", "N51": "Hand Tools", "N52": "Measuring Tools", "N53": "Hardware and Abrasives", "N54": "Prefabricated Structures and Scaffolding", "N55": "Lumber, Millwork, Plywood, and Veneer", "N56": "Construction and Building Materials", "N58": "Communication, Detection, and Coherent Radiation Equipment", "N59": "Electrical and Electronic Equipment Components", "N60": "Fiber Optics Materials, Components, Assemblies, and Accessories", "N61": "Electric Wire, and Power and Distribution Equipment", "N62": "Lighting Fixtures and Lamps", "N63": "Alarm, Signal and Security Detection Systems", "N65": "Medical, Dental, and Veterinary Equipment and Supplies", "N66": "Instruments and Laboratory Equipment", "N67": "Photographic Equipment", "N68": "Chemicals and Chemical Products", "N69": "Training Aids and Devices", "N70": "Automatic Data Processing Equipment (Including Firmware), Software, Supplies and Support Equipment", "N71": "Furniture", "N72": "Household and Commercial Furnishings and Appliances", "N73": "Food Preparation and Serving Equipment", "N74": "Office Machines, Text Processing Systems and Visible Record Equipment", "N75": "Office Supplies and Devices", "N76": "Books, Maps, and Other Publications", "N77": "Musical Instruments, Phonographs, and Home-Type Radios", "N78": "Recreational and Athletic Equipment", "N79": "Cleaning Equipment and Supplies", "N80": "Brushes, Paints, Sealers, and Adhesives", "N81": "Containers, Packaging, and Packing Supplies", "N83": "Textiles, Leather, Furs, Apparel and Shoe Findings, Tents and Flags", "N84": "Clothing, Individual Equipment, and Insignia", "N85": "Toiletries", "N87": "Agricultural Supplies", "N88": "Live Animals", "N89": "Subsistence", "N91": "Fuels, Lubricants, Oils, and Waxes", "N93": "Nonmetallic Fabricated Materials", "N94": "Nonmetallic Crude Materials", "N95": "Metal Bars, Sheets, and Shapes", "N96": "Ores, Minerals, and Their Primary Products", "N99": "Miscellaneous ", "N1": "For the purposes of trade agreement coverage, NCLOG procurements are considered not covered. "}

// const searchQuery = document.querySelector('input[name=q]')
// const searchButton = document.getElementById('search')
const locationCheckboxes = document.querySelectorAll(
  'input[name=apply_locations]',
)
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
