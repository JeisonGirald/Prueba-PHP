<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;

// Ruta de la API para guardar hoteles
Route::post('/api/guardarHotel', [HotelController::class, 'guardarHotel']);

// Cualquier otra ruta debe redirigirse al frontend
Route::get('/{any}', function () {
    return view('welcome'); // Cambia 'welcome' al archivo Blade que cargue tu frontend
})->where('any', '.*');
