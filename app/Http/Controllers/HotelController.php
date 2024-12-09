<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Models\AsignacionHotel;

class HotelController extends Controller
{
    public function guardarHotel(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'hotel.nombre' => 'required|string',
            'hotel.direccion' => 'required|string',
            'hotel.ciudad' => 'required|string',
            'hotel.nit' => 'required|string|unique:hoteles,nit',
            'hotel.numHabitaciones' => 'required|integer|min:1',
            'asignaciones' => 'required|array|min:1',
            'asignaciones.*.tipoHabitacion' => 'required|string',
            'asignaciones.*.acomodacion' => 'required|string',
            'asignaciones.*.cantidad' => 'required|integer|min:1',
        ]);

        // Crear el hotel
        $hotel = Hotel::create([
            'nombre' => $request->input('hotel.nombre'),
            'direccion' => $request->input('hotel.direccion'),
            'ciudad' => $request->input('hotel.ciudad'),
            'nit' => $request->input('hotel.nit'),
            'num_habitaciones' => $request->input('hotel.numHabitaciones'),
        ]);

        // Crear las asignaciones de habitaciones
        foreach ($request->input('asignaciones') as $asignacion) {
            AsignacionHotel::create([
                'id_hotel' => $hotel->id,
                'tipo_habitacion' => $asignacion['tipoHabitacion'],
                'acomodacion' => $asignacion['acomodacion'],
                'cantidad' => $asignacion['cantidad'],
            ]);
        }

        // Retornar una respuesta de éxito
        return response()->json([
            'message' => 'Hotel y asignaciones guardados con éxito',
            'hotel' => $hotel,
        ], 201);
    }
}

