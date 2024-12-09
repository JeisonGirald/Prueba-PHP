<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

Route::middleware([VerifyCsrfToken::class])->post('/guardarHotel', [HotelController::class, 'guardarHotel']);

//Route::post('/guardarHotel', [HotelController::class, 'guardarHotel']);




