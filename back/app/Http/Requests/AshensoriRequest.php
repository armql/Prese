<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AshensoriRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'Emertimi212257839' => 'required|string',
            'NdertesaID' => 'required',
            'user_id' => 'required',
        ];
    }
}
