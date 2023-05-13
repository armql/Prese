<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('product', [ProductController::class, 'index']);
Route::post('product', [ProductController::class, 'create']);
Route::put('product/{id}', [ProductController::class, 'update']);
Route::get('product/{id}/edit', [ProductController::class, 'edit']);
Route::get('product/{id}', [ProductController::class, 'display']);
Route::delete('product/{id}', [ProductController::class, 'destroy']);
Route::get('product/search', [ProductController::class, 'search']);
Route::get('/category/{id}/name', [ProductController::class, 'getCatName']);

Route::get('category', [CategoryController::class, 'index']);
Route::post('category', [CategoryController::class, 'create']);
Route::put('category/{id}/', [CategoryController::class, 'update']);
Route::get('category/{id}/edit', [CategoryController::class, 'edit']);
Route::get('category/{id}', [CategoryController::class, 'show']);
Route::delete('category/{id}/delete', [CategoryController::class, 'destroy']);
Route::get('category/search', [CategoryController::class, 'search']);
Route::get('/users/{id}/name', [CategoryController::class, 'getUserName']);
Route::get('namecat', [CategoryController::class, 'categoryname']);
