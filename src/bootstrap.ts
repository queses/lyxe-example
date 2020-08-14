import { LyxeFramework } from 'lyxe/lib/core/LyxeFramework'
import * as fs from 'fs'
import { AppPathUtil } from 'lyxe/lib/core/config/AppPathUtil'
import { AppConfigurator } from 'lyxe/lib/core/config/AppConfigurator'
import { PersistenceTypeormConfig } from 'lyxe/lib/persistence-typeorm/PersistenceTypeormConfig'
import { AppEnv } from 'lyxe/lib/core/config/AppEnv'

export default () => {
  const config = fs.readFileSync(AppPathUtil.appData + '/.appconfig').toString()
  AppConfigurator.importConfig(config)

  if (!AppEnv.inProduction && AppConfigurator.get('app.useLocalDevDb')) {
    PersistenceTypeormConfig.defaultConnectionParams({
      type: 'sqlite',
      database: `${AppPathUtil.appData}/temp/dev.sqlite`
    })
  }

  LyxeFramework.requirePlugins(
    'logging',
    'persistence-typeorm',
    'cache'
  )

  LyxeFramework.requireModules(
    'example'
  )
}
