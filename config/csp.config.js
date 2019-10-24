// docs: https://helmetjs.github.io/docs/csp/

const scriptSrc = ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', "*.herokuapp.com", "http://single-point-of-access-pr-12.herokuapp.com"]

if (process.env.NODE_ENV === 'development') {
  scriptSrc.push("'unsafe-eval'")
}

module.exports = {
  defaultSrc: ["'self'"],
  scriptSrc: scriptSrc,
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:'],
  styleSrc: ["'self'", 'https://fonts.googleapis.com'],
}
