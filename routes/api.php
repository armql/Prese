<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('product', [ProductController::class, 'index']);
Route::post('product', [ProductController::class, 'create']);
Route::put('product/{id}/', [ProductController::class, 'update']);
Route::get('product/{id}/edit', [ProductController::class, 'edit']);
Route::delete('product/{id}/delete', [ProductController::class, 'destroy']);
Route::get('product/search', [ProductController::class, 'search']);
Route::get('/products', [ProductController::class, 'paginateProducts'])->name('products')->middleware('web');
Route::get('/products/count', [ProductController::class, 'count']);
Route::get('/category/{id}/name', [ProductController::class, 'getCatName']);

Route::get('category', [CategoryController::class, 'index']);
Route::post('category', [CategoryController::class, 'create']);
Route::put('category/{id}/', [CategoryController::class, 'update']);
Route::get('category/{id}/edit', [CategoryController::class, 'edit']);
Route::get('category/{id}', [CategoryController::class, 'show']);
Route::delete('category/{id}/delete', [CategoryController::class, 'destroy']);
Route::get('/search', [CategoryController::class, 'search']);
Route::get('/users/{id}/name', [CategoryController::class, 'getUserName']);
Route::get('namecat', [CategoryController::class, 'categoryname']);
Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories')->middleware('web');

Route::get('driverls', [UserController::class, 'drivername']);

Route::get('/orders', [OrderController::class, 'getOrdersEmployee'])->name('orders')->middleware('web');
Route::get('/allorders', [OrderController::class, 'allOrders'])->name('orders')->middleware('web');
Route::get('/driverorders', [OrderController::class, 'driverOrders'])->name('driverorders')->middleware('web');
Route::get('/orders/{orderId}/items', [OrderController::class, 'getOrderItems']);
Route::put('/orders/{orderId}', [OrderController::class, 'editOrder']);
Route::put('/driverorders/{orderId}', [OrderController::class, 'driverEditOrder']);
Route::get('ordertrack/{id}', [OrderController::class, 'ordertrack']);
Route::get('/orders/latest', [OrderController::class, 'getLatestOrder']);
Route::get('/orders/deliveredcount', [OrderController::class, 'count']);
Route::get('orders/calculate-totals', [OrderController::class, 'calculateOrderTotals']);


Route::get('user', [UserController::class, 'index']);
Route::post('user', [UserController::class, 'create']);
Route::put('user/{id}/', [UserController::class, 'update']);
Route::get('user/{id}/edit', [UserController::class, 'edit']);
Route::delete('user/{id}/delete', [UserController::class, 'destroy']);
Route::get('/users/count', [UserController::class, 'count']);
