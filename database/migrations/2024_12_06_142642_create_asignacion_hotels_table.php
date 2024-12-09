<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asignacion_hotels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_hotel'); // Llave foránea a la tabla hoteles
            $table->string('tipo_habitacion');
            $table->string('acomodacion');
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignacion_hotels');
    }
};
