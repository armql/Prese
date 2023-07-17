<?php

namespace App\Http\Controllers\api;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Create a new product.
     *
     * @param  \App\Http\Requests(UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(UserRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'address' => $data['address'],
            'city' => $data['city'],
            'role' => $data['role'],
            'password' => bcrypt($data['password']),
        ]);

        return response([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
        ]);
    }

    /**
     * Update an existing product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, int $id)
    {
        $data = $request->validated();

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 404);
        }

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'address' => $data['address'],
            'city' => $data['city'],
            'role' => $data['role'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Retrieve a specific product for editing.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }

    /**
     * Retrieve a specific product for display.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'No product found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    /**
     * Delete a specific product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'No user found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User deleted successfully',
        ], 200);
    }

    public function index()
    {
        $user = User::all();
        if ($user->count() > 0) {
            return response()->json([
                'status' => 200,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no records found'
            ], 404);
        }
    }

    public function drivername()
    {
        $drivers = User::where('role', 'driver')->get('name');
        return response()->json([
            'status' => 200,
            'drivers' => $drivers
        ], 200);
    }

    public function count()
    {
        $count = User::all()->count();
        return response()->json(['count' => $count]);
    }
}