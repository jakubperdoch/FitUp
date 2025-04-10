<?php

namespace App\Models\Exercise;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Exercise extends Model
{
    use Searchable;
    protected $table = 'exercises';

    protected $fillable = [
        'exercise_id',
        'name',
        'gifUrl',
        'target_muscles',
        'body_parts',
        'equipments',
        'secondary_muscles',
        'instruction_1',
        'instruction_2',
        'instruction_3',
        'instruction_4',
        'instruction_5',
        'instruction_6',
        'instruction_7',
        'instruction_8',
        'instruction_9',
        'instruction_10',
        'instruction_11',
    ];

    public function muscles()
    {
        return $this->belongsTo(BodyPart::class);
    }


    public function toArray()
    {
        $attributes = parent::toArray();

        return array_filter($attributes, function ($value) {
            return $value !== "";
        });
    }


    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'exercise_id' => $this->exercise_id,
            'name' => $this->name,
            'target_muscles' => $this->target_muscles,
        ];
    }
}
