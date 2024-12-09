<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'ciudad',
        'nit',
        'num_habitaciones',
    ];

    public function asignaciones()
    {
        return $this->hasMany(AsignacionHotel::class, 'id_hotel');
    }
}
