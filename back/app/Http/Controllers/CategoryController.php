<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Create a new category.
     *
     * @param  \App\Http\Requests\CategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(CategoryRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\Category $category */
        $category = Category::create([
            'name' => $data['name'],
            'user_id' => $data['user_id'],
        ]);

        return response([
            'status' => 'success',
            'message' => 'Category created successfully',
            'category' => $category,
        ]);
    }

    /**
     * Update an existing category.
     *
     * @param  \App\Http\Requests\CategoryRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, int $id)
    {
        $data = $request->validated();

        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'No category found'
            ], 404);
        }

        // Check if the user with the updated user_id exists
        $user = User::find($data['user_id']);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 404);
        }

        $category->update([
            'name' => $data['name'],
            'user_id' => $data['user_id'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    /**
     * Retrieve a specific category for editing.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'No category found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'category' => $category
        ]);
    }

    /**
     * Retrieve a specific category for display.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'No category found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'category' => $category
        ]);
    }

    /**
     * Delete a specific category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'No category found'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully',
        ], 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide a search query'
            ], 400);
        }

        $category = Category::where('name', 'LIKE', '%' . $query . '%')
            ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->orWhere('retail_price', 'LIKE', '%' . $query . '%')
            ->orWhere('market_price', 'LIKE', '%' . $query . '%')
            ->get();

        return response()->json([
            'status' => 'success',
            'category' => $category
        ], 200);
    }

    public function index()
    {
        $categories = Category::with('products')->get();

        if ($categories->count() > 0) {
            return response()->json([
                'status' => 200,
                'categories' => $categories
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No category records found'
            ], 404);
        }
    }

    /**
     * Get the name of a user based on their ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUserName(int $id)
    {
        $user = DB::table('users')->select('name')->where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'name' => $user->name
        ]);
    }


    public function categoryname()
    {
        $categories = Category::all('name');
        return response()->json([
            'status' => 200,
            'categories' => $categories
        ], 200);
    }

    public function getCategories(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $categories = Category::paginate($perPage);

        $currentPage = $request->input('page', 1);

        return response()->json([
            'categories' => $categories->items(),
            'current_page' => $currentPage,
            'total' => $categories->total(),
            'per_page' => $categories->perPage(),
            'last_page' => $categories->lastPage(),
        ]);
    }
}