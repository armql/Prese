<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Change this to true if you want to authorize the request
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'preview' => 'required',
            'name' => 'required|string|max:255',
            'category_id' => 'required',
            'description' => 'required|string',
            'retail_price' => 'required|numeric|min:0',
            'market_price' => 'required|numeric|min:0',
            'user_id' => 'required|integer',
        ];
    }

}
