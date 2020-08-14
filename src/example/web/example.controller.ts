import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { WebReqUtil } from 'lyxe/lib/web/WebReqUtil'
import { TAddExampleUserDto } from '../domain/example-dtos'
import { AddExampleUser } from '../domain/AddExampleUser'
import { ExampleUserReadService } from '../domain/ExampleUserReadService'

@Controller('/api/example')
export class ExampleController {
  @Get('/hello')
  async hello() {
    return {
      message: 'Hello from LyxeJS!'
    }
  }

  @Post('/')
  async createUser(@Body() dto: TAddExampleUserDto, @Req() req: Request) {
    const user = await WebReqUtil.createUseCase(AddExampleUser, req).runFromDto(dto)
    return {
      id: user.getId()
    }
  }

  @Get('/name/:name')
  async listByNameQuery(@Param('name') name: string, @Req() req: Request) {
    const users = await WebReqUtil.createReadService(ExampleUserReadService, req).listByNameQuery(name)
    return users.map((user) => ({
      id: user.getId(),
      name: user.getName()
    }))
  }
}
