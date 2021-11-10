import { Router } from 'express'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

router.post('/users', new CreateUserController().handle)
router.post('/tags', ensureAdmin, new CreateTagController().handle)

export { router }
