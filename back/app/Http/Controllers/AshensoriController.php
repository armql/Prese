<?php

namespace App\Http\Controllers;

use App\Http\Requests\AshensoriRequest;
use App\Models\Ashensori212257839;
use App\Models\Ndertesa212257839;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AshensoriController extends Controller
{

    public function paginateAshensori(Request $request)
    {
        $perPage = $request->input('perPage', 5);
        $ashensorit = Ashensori212257839::paginate($perPage);
        $currentPage = $ashensorit->currentPage();
        $formattedProducts = $ashensorit->map(function ($ashensor) {
            $ndertesa_type = DB::table('ndertesa212257839s')->where('id', $ashensor->NdertesaID)->value('Emri212257839');
            $user_type = DB::table('users')->where('id', $ashensor->user_id)->value('name');
            return [
                'id' => $ashensor->id,
                'Emertimi212257839' => $ashensor->Emertimi212257839,
                'created_at' => $ashensor->created_at,
                'ndertesa' => $ndertesa_type,
                'user' => $user_type,
            ];
        });
        return response()->json([
            'ashensori' => $formattedProducts,
            'current_page' => $currentPage,
            'total' => $ashensorit->total(),
            'per_page' => $ashensorit->perPage(),
            'last_page' => $ashensorit->lastPage(),
        ]);
    }
    
    /**
     * Create a new product.
     *
     * @param  \App\Http\Requests\AshensoriRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(AshensoriRequest $request)
    {
        $data = $request->validated();


        $ndertesa = Ndertesa212257839::where('Emri212257839', $data['NdertesaID'])->first();

        /** @var \App\Models\Product $ashensori */
        $ashensori = Ashensori212257839::create([
            'Emertimi212257839' => $data['Emertimi212257839'],
            'NdertesaID' => $ndertesa->id,
            'user_id' => $data['user_id'],
        ]);

        return response([
            'status' => 'success',
            'message' => 'Product created successfully',
            'ashensori' => $ashensori,
        ]);
    }

    /**
     * Update an existing product.
     *
     * @param  \App\Http\Requests\AshensoriRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AshensoriRequest $request, int $id)
    {
        $data = $request->validated();

        $ashensori = Ashensori212257839::find($id);

        if (!$ashensori) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ashensori found'
            ], 404);
        }

        $user = User::find($data['user_id']);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 404);
        }

        $ndertesa = Ndertesa212257839::where('Emri212257839', $data['NdertesaID'])->first();

        if (!$ndertesa) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ndertesa found'
            ], 404);
        }

        $ashensori->update([
            'Emertimi212257839' => $data['Emertimi212257839'],
            'NdertesaID' => $ndertesa->id,
            'user_id' => $data['user_id'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Ashensori updated successfully',
            'ashensori' => $ashensori
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
        $ashensori = Ashensori212257839::find($id);

        if (!$ashensori) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ashensori found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'ashensori' => $ashensori
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
        $ashensori = Ashensori212257839::find($id);

        if (!$ashensori) {
            return response()->json([
                'status' => 404,
                'message' => 'No ashensori found'
            ], 404);
        }

        $ashensori->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Ashensori deleted successfully',
        ], 200);
    }

}
