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
            'name' => 'required|string|max:255',
            'category_id' => ['required', 'exists:categories,id'],
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048', // optional image file
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
            'name.required' => 'Product name is required.',
            'name.string' => 'Product name must be a string.',
            'name.max' => 'Product name may not be greater than 255 characters.',
            'category_id.required' => 'Category ID is required.',
            'category_id.exists' => 'Invalid category ID.',
            'description.required' => 'Product description is required.',
            'description.string' => 'Product description must be a string.',
            'price.required' => 'Product price is required.',
            'price.numeric' => 'Product price must be a number.',
            'price.min' => 'Product price must be greater than or equal to 0.',
            'quantity.required' => 'Product quantity is required.',
            'quantity.integer' => 'Product quantity must be an integer.',
            'quantity.min' => 'Product quantity must be greater than or equal to 0.',
            'image.image' => 'Product image must be an image file.',
            'image.mimes' => 'Product image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'Product image may not be greater than 2mb.',
        ];
    }
}
