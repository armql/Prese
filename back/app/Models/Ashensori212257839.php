<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ashensori212257839 extends Model
{
    use HasFactory;
    protected $fillable = [
        'Emertimi212257839',
        'NdertesaID',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ndertesa()
    {
        return $this->belongsTo(Ndertesa212257839::class);
    }
}
