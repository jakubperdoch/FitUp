<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $table = 'meals';

    protected $fillable = [
        'food_id',
        'user_id',
        'name',
        'quantity',
        'serving_description',
        'image',
        'serving_id',
        'eaten_at',
        'date',
        'calories',
        'protein',
        'carbs',
        'fat',
        'fiber',
        'sugar',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
