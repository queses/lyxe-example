import { Request, Router } from 'express'
import { WebReqUtil } from 'lyxe/lib/web/WebReqUtil'
import { TAddExampleUserDto } from '../domain/example-dtos'
import { AddExampleUser } from '../domain/AddExampleUser'
import { ExampleUserReadService } from '../domain/ExampleUserReadService'
import { asyncRoute } from 'lyxe/lib/web-express/async-route'

export const exampleRoute = Router()

exampleRoute.get('/hello', asyncRoute(async () => {
  return { message: 'Hello from LyxeJS!' }
}))

exampleRoute.post('/', asyncRoute(async (req: Request) => {
  const dto: TAddExampleUserDto = req.body
  const user = await WebReqUtil.createService(AddExampleUser, req).runFromDto(dto)
  return { id: user.getId() }
}))

exampleRoute.get('/name/:name', asyncRoute(async (req: Request) => {
  const users = await WebReqUtil.createService(ExampleUserReadService, req).listByNameQuery(name)
  return users.map((user) => ({
    id: user.getId(),
    name: user.getName()
  }))
}))
