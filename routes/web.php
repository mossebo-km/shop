<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/ru', 301);

Route::prefix('ru')->group(function () {

    Route::get('/', 'Shop\HomeController@index')
        ->name('home');
    Route::get('/goods/{id}', 'Shop\ProductController@index')
        ->name('good');
    Route::get('/catalog/{category_slug}', 'Shop\CatalogController@index')
        ->name('catalog');

    Route::get('/delivery', 'Shop\PageController@delivery');
    Route::get('/pay', 'Shop\PageController@pay');
    Route::get('/garant', 'Shop\PageController@garant');

});


//Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
