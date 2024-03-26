<?php

namespace App\Http\Controllers;

use App\Http\Requests\NdertesaRequest;
use App\Models\Ndertesa212257839;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NdertesaController extends Controller
{

     /**
     * Create a new Ndertesa.
     *
     * @param  \App\Http\Requests\NdertesaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(NdertesaRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\Ndertesa212257839 $ndertesa */
        $ndertesa = Ndertesa212257839::create([
            'Emri212257839' => $data['Emri212257839'],
            'DataPT' => $data['DataPT'],
            'user_id' => $data['user_id'],
        ]);

        return response([
            'status' => 'success',
            'message' => 'Ndertesa created successfully',
            'ndertesa' => $ndertesa,
        ]);
    }

    public function paginate(Request $request)
    {
        $perPage = $request->input('perPage', 5);
        $ndertesa = Ndertesa212257839::paginate($perPage);
        $currentPage = $ndertesa->currentPage();
        $formattedCategories = $ndertesa->map(function ($ndertes) {
            $userName = DB::table('users')->where('id', $ndertes->user_id)->value('name');
            return [
                'id' => $ndertes->id,
                'Emri212257839' => $ndertes->Emri212257839,
                'DataPT' => $ndertes->DataPT,
                'created_at' => $ndertes->created_at,
                'user' => $userName,
            ];
        });
        return response()->json([
            'ndertesat' => $formattedCategories,
            'current_page' => $currentPage,
            'total' => $ndertesa->total(),
            'per_page' => $ndertesa->perPage(),
            'last_page' => $ndertesa->lastPage(),
        ]);
    }


    /**
     * Update an existing ndertesa.
     *
     * @param  \App\Http\Requests\NdertesaRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NdertesaRequest $request, int $id)
    {
        $data = $request->validated();

        $ndertesa = Ndertesa212257839::find($id);

        if (!$ndertesa) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ndertesa found'
            ], 404);
        }

        $user = User::find($data['user_id']);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 404);
        }

        $ndertesa->update([
            'Emri212257839' => $data['Emri212257839'],
            'DataPT' => $data['DataPT'],
            'user_id' => $data['user_id'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Ndertesa updated successfully',
            'ndertesa' => $ndertesa
        ]);
    }

    /**
     * Retrieve a specific ndertesa for editing.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ndertesa = Ndertesa212257839::find($id);

        if (!$ndertesa) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ndertesa found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'ndertesa' => $ndertesa
        ]);
    }

    /**
     * Delete a specific ndertesa.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ndertesa = Ndertesa212257839::find($id);

        if (!$ndertesa) {
            return response()->json([
                'status' => 404,
                'message' => 'No ndertesa found'
            ], 404);
        }

        $ndertesa->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Ndertesa deleted successfully',
        ], 200);
    }

    public function ndertesaname()
    {
        $ndertesa = Ndertesa212257839::select('Emri212257839 as name')->get();
        return response()->json([
            'status' => 200,
            'ndertesat' => $ndertesa
        ], 200);
    }

}
