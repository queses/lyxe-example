import 'lyxe/lib/core/register-lyxe'
import bootstrap from '../bootstrap'
import { AppModule } from './app.module'
import { LyxeFramework } from 'lyxe/lib/core/LyxeFramework'
import { AppContainer } from 'lyxe/lib/core/di/AppContainer'
import { NestExpressRunner } from 'lyxe/lib/web-nest-express/NestExpressRunner'

const main = async () => {
  LyxeFramework.requirePlugins('web-nest-express', 'web-auth-jwt')
  bootstrap()

  await AppContainer.get(NestExpressRunner).run(AppModule)
}

main()

