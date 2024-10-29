import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')
const StoreController = () => import('#controllers/store_controller')

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
router
  .group(() => {
    router.get('/find-store', [UserController, 'findStore']).as('find.store')
    router.post('/update', [UserController, 'update']).as('update')
  })
  .prefix('/user')
  .as('user')
/*
|--------------------------------------------------------------------------
| Store routes
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.post('/create', [StoreController, 'create']).as('create')
    router.get('/:id', [StoreController, 'find']).as('find')
    router.get('/', [StoreController, 'get']).as('get')
  })
  .prefix('/store')
  .as('store')
