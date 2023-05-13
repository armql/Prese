<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'preview',
        'name',
        'description',
        'retail_price',
        'market_price',
        'category_id',
        'user_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getRetailPriceFormattedAttribute()
    {
        return '€' . number_format($this->retail_price, 2);
    }

    public function getMarketPriceFormattedAttribute()
    {
        return '€' . number_format($this->market_price, 2);
    }
}
