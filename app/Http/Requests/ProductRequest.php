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
            'preview' => 'required', // optional image file
            'name' => 'required|string|max:255',
            'category_id' => 'required',
            'description' => 'required|string',
            'retail_price' => 'required|numeric|min:0',
            'market_price' => 'required|numeric|min:0',
            'user_id' => 'required|integer',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            // 'preview.image' => 'Product image must be an image file.',
            // 'preview.mimes' => 'Product image must be a file of type: jpeg, png, jpg, gif.',
            // 'preview.max' => 'Product image may not be greater than 2mb.',
            'name.required' => 'Product name is required.',
            'name.string' => 'Product name must be a string.',
            'name.max' => 'Product name may not be greater than 255 characters.',
            'category_id.required' => 'Category ID is required.',
            // 'category_id.exists' => 'Invalid category ID.',
            'description.required' => 'Product description is required.',
            'description.string' => 'Product description must be a string.',
            'retail_price.required' => 'Product retail price is required.',
            'retail_price.numeric' => 'Product retail price must be a number.',
            'retail_price.min' => 'Product retail price must be greater than or equal to 0.',
            'market_price.required' => 'Product market price is required.',
            'market_price.numeric' => 'Product market price must be a number.',
            'market_price.min' => 'Product market price must be greater than or equal to 0.',
        ];
    }
}
