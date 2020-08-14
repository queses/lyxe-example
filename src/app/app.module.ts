import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { NestModuleMetaUtil } from 'lyxe/lib/web-nest-express/NestModuleMetaUtil'
import { JwtContextMiddleware } from 'lyxe/lib/web-nest-express/jwt-context.middleware'
import { ExampleModule } from '../example/web/example.module'

@Module(
  NestModuleMetaUtil.createModuleMeta({
    imports: [ ExampleModule ]
  })
)
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtContextMiddleware)
      .forRoutes('api/*')
  }
}
