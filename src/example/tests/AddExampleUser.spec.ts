import { assert } from 'chai'
import { itInTransaction } from 'lyxe/lib/testing/mocha/it-in-transaction'
import { AddExampleUser } from '../domain/AddExampleUser'
import { TestUtil } from 'lyxe/lib/testing/TestUtil'
import { ExampleUserRepoTkn } from '../domain/example-tokens'
import { ExampleUser } from '../domain/model/ExampleUser'

describe('AddExampleUser', function () {
  itInTransaction('should add user', async function (sf) {
    const user = await sf.createContextService(AddExampleUser).run('Jake')
    assert.instanceOf(user, ExampleUser)

    const repo = TestUtil.createRepo(ExampleUserRepoTkn, sf)
    const users = await repo.findByNameQuery('Jak')
    assert.lengthOf(users, 1)
    assert.equal(user.getId(), users[0].getId())
  })

  itInTransaction('should not user with empty name', async function (sf) {
    await assert.isRejected(sf.createContextService(AddExampleUser).run(''))
  })
})
