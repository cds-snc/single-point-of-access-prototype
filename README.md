# Single Point of Access Prototype

This prototype is based on the [Node starter app](https://github.com/cds-snc/node-starter-app/). The goal of that repository is to provide a starting point that can be used to quickly build web pages or forms with a Government of Canada look-and-feel. It's setup with some sensible defaults and tech choices, such as:

- Node.js 10.x
- NVM (Node Version Manager) for install Node.js versions
- [Express](https://expressjs.com/) web framework
- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) view templates
- Sass (Syntactically Awesome Style Sheets) for reusable styles


## Install + Dev Mode

```bash
npm install
npm run dev
```

## Adding Routes
Generate the route files
```
node ./bin/route.js create --route your_route_name
```

The created route directory by default contains the following files:
- your_route_name.controller.js
- your_route_name.pug
- schema.js (used for form views)


Register the route via [routes.config.js](https://github.com/cds-snc/node-starter-app/blob/master/config/routes.config.js)

```javascript
// config/routes.config.js
...
const routes = [
  { name: "your_route_name", path: "/your_route_name" },
];
...
```

Note: Delete unused route(s) directories as needed.


## Template Engine

[Nunjucks](https://mozilla.github.io/nunjucks/)

## Common View Helpers

See views/_includes

## Change configuration

Don't like the way it's setup -> it's an Express server so do your thing `app.js`

## CLI

- There is a basic CLI tool that allows you to perform some functions:

```
> node ./bin/cli.js routes
[ { name: 'sample', path: '/sample' },
  { name: 'start', path: '/start' },
  { name: 'personal', path: '/personal' },
  { name: 'confirmation', path: '/confirmation' } ]
```

## Deployment

- The current default build and deploy is through GCP CloudBuild and Cloud Run. The `cloudbuild.yaml` will not work out of the box, so it will need to be tweaked as well as the permissions set correctly in GCP. [This link](https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build#continuous) explains the required steps to set up Cloud Run properly.
