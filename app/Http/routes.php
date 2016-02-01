<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
   

	// Route::group(['prefix' => 'admin', 'middleware' => 'auth'])

	Route::group(['prefix' => 'api'],function() {

		Route::get('products', 'ProductController@show');

		Route::group(['prefix' => 'orders'],function(){

			//Place an order
			Route::post('place','OrderController@place');

			Route::group(['middleware' => 'admin'],function(){

				//Cancel Order
				Route::get('cancel','OrderController@cancel');

				//Verify Order
				Route::get('verify/{id}','OrdersController@verify');

				//View an Order
				Route::get('{number}','OrderController@show');
				
				//Update Order
				Route::put('update','OrderController@update');

				//setDelivery
				Route::post('addDelivery','OrderController@setDelivery');

			});

		});




	});
});
