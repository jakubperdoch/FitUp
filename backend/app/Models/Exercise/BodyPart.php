<?php

namespace App\Models\Exercise;

use Illuminate\Database\Eloquent\Model;

class BodyPart extends Model
{

    protected $table = 'body_parts';

    protected $fillable = [
        'name',
    ];


    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }

}
