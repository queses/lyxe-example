import 'lyxe/lib/core/register-lyxe'
import bootstrap from '../bootstrap'
import { LyxeFramework } from 'lyxe/lib/core/LyxeFramework'
import { AppContainer } from 'lyxe/lib/core/di/AppContainer'
import { ExpressRunner } from 'lyxe/lib/web-express/ExpressRunner'
import { ExpressRequestLogMiddleware } from 'lyxe/lib/web-express/ExpressRequestLogMiddleware'
import { WebExpressConfig } from 'lyxe/lib/web-express/WebExpressConfig'
import * as compression from 'compression'
import { AppEnv } from 'lyxe/lib/core/config/AppEnv'
import { exampleRoute } from '../example/web-express/example-route'

const main = async () => {
  LyxeFramework.requirePlugins('web-express')
  WebExpressConfig.basePath('/api')
  bootstrap()

  await AppContainer.get(ExpressRunner).run((app) => {
    app.use(ExpressRequestLogMiddleware.handler)
    if (AppEnv.inProduction) {
      app.use('/api', compression())
    }

    // Place your routes here:
    app.use('/api/example', exampleRoute)
  })
}

main().then()
