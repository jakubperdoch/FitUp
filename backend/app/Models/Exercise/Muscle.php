<?php

namespace App\Models\Exercise;

use Illuminate\Database\Eloquent\Model;

class Muscle extends Model
{

    protected $table = 'muscles';

    protected $fillable = [
        'name',
    ];


    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }

}
