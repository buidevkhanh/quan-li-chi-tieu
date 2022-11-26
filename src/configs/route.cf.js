const path = require('path');
const glob = require('glob');
const signale = require('signale');

async function configRoute(app) {
  const routePaths = glob.sync(
    path.join(process.cwd(), `src/modules/**/*.route.js`),
  );

  const routes = routePaths.map((routePath) => {
    const childRoute = require(routePath).router;
    const routeName = require(routePath).name;

    signale.success(
      `[App] Route for module /${routeName}/ has been registed`,
    );
    return childRoute;
  });

  app.use('/api/v1', routes)
}

module.exports = {configRoute: configRoute}