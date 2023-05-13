<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Create a new product.
     *
     * @param  \App\Http\Requests\ProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(ProductRequest $request)
    {
        $data = $request->validated();

        // Retrieve the category ID based on the name
        $category = Category::where('name', $data['category_id'])->first();

        /** @var \App\Models\Product $product */
        $product = Product::create([
            'preview' => $data['preview'],
            'name' => $data['name'],
            'description' => $data['description'],
            'retail_price' => $data['retail_price'],
            'market_price' => $data['market_price'],
            'category_id' => $category->id,
            'user_id' => $data['user_id'],
        ]);

        return response([
            'status' => 'success',
            'message' => 'Product created successfully',
            'product' => $product,
        ]);
    }
    /**
     * Update an existing product.
     *
     * @param  \App\Http\Requests\ProductRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, int $id)
    {
        $data = $request->validated();

        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'No product found'
            ], 404);
        }

        $product->update([
            'preview' => $data['preview'],
            'name' => $data['name'],
            'description' => $data['description'],
            'retail_price' => $data['retail_price'],
            'market_price' => $data['market_price'],
            'category_id' => $data['category_id'],
            'user_id' => $data['user_id'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'product' => $product
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
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'No product found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully',
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

        $products = Product::where('name', 'LIKE', '%' . $query . '%')
            ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->orWhere('retail_price', 'LIKE', '%' . $query . '%')
            ->orWhere('market_price', 'LIKE', '%' . $query . '%')
            ->get();

        return response()->json([
            'status' => 'success',
            'products' => $products
        ], 200);
    }



    public function index()
    {
        $product = Product::all();
        if ($product->count() > 0) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no records found'
            ], 404);
        }
    }

    /**
     * Get the name of a user based on their ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCatName(int $id)
    {
        $user = DB::table('categories')->select('name')->where('id', $id)->first();

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

}
