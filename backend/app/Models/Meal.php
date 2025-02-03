<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;


    protected $fillable = [
        'api_id',
        'user_id',
        'name',
        'quantity',
        'serving',
        'eaten_at',
        'date',
        'calories',
        'protein',
        'carbs',
        'fat',
        'fiber',
        'sugar',
    ];

    protected $table = 'meals';
}
