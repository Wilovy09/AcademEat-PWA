import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')

router.get('/', async () => {
  return {
    healthCheck: 'ok!',
  }
})

/*
|--------------------------------------------------------------------------
| Auth routes
|--------------------------------------------------------------------------
*/
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout')
router.get('/me', [AuthController, 'me']).as('auth.me')
/*
|--------------------------------------------------------------------------
| User routes
|--------------------------------------------------------------------------
*/
router.post('/update-user', [UserController, 'update']).as('user.update')
