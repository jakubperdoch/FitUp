<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{

    protected $table = 'user_preferences';

    protected $fillable = [
        'user_id',
        'calories',
        'protein',
        'carbs',
        'fat',
        'fiber',
        'sugar',
        'selected_language',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
