'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PostController.index').as('home');
Route.post('/create', 'PostController.create').as('create_post');
Route.get('/edit/:id', 'PostController.edit');
Route.post('/update/:id', 'PostController.update').as('update_post');
Route.get('/delete/:id', 'PostController.delete').as('delete_post');
