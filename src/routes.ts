import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListComplimentsUserReceivedController } from './controllers/ListComplimentsUserReceivedController'
import { ListComplimentsUserSentController } from './controllers/ListComplimentsUserSentController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

router.post('/users', new CreateUserController().handle)
router.post('/tags', new CreateTagController().handle)
router.post('/authenticate', new AuthenticateUserController().handle)
router.post(
    '/compliments',
    ensureAuthenticated,
    ensureAdmin,
    new CreateComplimentController().handle
)
router.get('users/compliments/received',ensureAuthenticated, new ListComplimentsUserReceivedController().handle)
router.get('users/compliments/sent',ensureAuthenticated, new ListComplimentsUserSentController().handle)

export { router }
