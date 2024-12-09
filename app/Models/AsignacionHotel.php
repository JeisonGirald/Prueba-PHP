<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionHotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_hotel',
        'tipo_habitacion',
        'acomodacion',
        'cantidad',
    ];
}
