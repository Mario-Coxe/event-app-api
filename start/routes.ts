import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  //caregories
  Route.post('/categories', 'CategoriesController.create')
  Route.put('/categories/:id', 'CategoriesController.update')
  Route.delete('/categories/:id', 'CategoriesController.delete')
  Route.get('/categories/:id', 'CategoriesController.findOne')
  Route.get('/categories', 'CategoriesController.findAll')

  //category_guests
  Route.post('/category-guests', 'CategoryGuestsController.create')
  Route.put('/category-guests/:id', 'CategoryGuestsController.update')
  Route.delete('/category-guests/:id', 'CategoryGuestsController.delete')
  Route.get('/category-guests/:id', 'CategoryGuestsController.findOne')
  Route.get('/category-guests', 'CategoryGuestsController.findAll')

  //events
  Route.post('/events', 'EventsController.create')
  Route.get('/events', 'EventsController.findAll')
  Route.get('/events/:id', 'EventsController.findOne')
  Route.put('/events/:id', 'EventsController.update')
  Route.delete('/events/:id', 'EventsController.delete')

  //guests
  Route.get('/guests', 'GuestsController.findAll')
  Route.get('/guests/:id', 'GuestsController.findOne')
  Route.post('/guests', 'GuestsController.create')
  Route.put('/guests/:id', 'GuestsController.update')
  Route.delete('/guests/:id', 'GuestsController.delete')

  //table
  Route.get('/tables', 'TablesController.findAll')
  Route.get('/tables/:id', 'TablesController.findOne')
  Route.post('/tables', 'TablesController.create')
  Route.put('/tables/:id', 'TablesController.update')
  Route.delete('/tables/:id', 'TablesController.delete')

  //invitation
  Route.post('/invitations', 'InvitationsController.create')
  Route.get('/invitations', 'InvitationsController.findAll')
  Route.get('/invitations/:id', 'InvitationsController.findOne')
  Route.put('/invitations/:id', 'InvitationsController.update')
  Route.delete('/invitations/:id', 'InvitationsController.delete')

}).prefix('v1/api').middleware('auth')

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix('auth')

Route.get('/', async () => {
  return { hello: 'API DA CONFESTA' }
})
