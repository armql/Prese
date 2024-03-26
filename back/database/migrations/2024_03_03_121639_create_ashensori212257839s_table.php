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
        Schema::create('ashensori212257839s', function (Blueprint $table) {
            $table->id();
            $table->string('Emertimi212257839');
            $table->unsignedBigInteger('NdertesaID');
            $table->timestamps();
            $table->unsignedBigInteger('user_id');

            $table->foreign('NdertesaID')->references('id')->on('ndertesa212257839s')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ashensori212257839s');
    }
};
