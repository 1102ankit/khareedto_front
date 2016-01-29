<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');
            $table->integer('region_id');


            $table->string('customer_id')->nullable();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_number');
            $table->string('customer_type')->default('guest');
            $table->string('cutomer_request',400)->nullable();

            $table->float('total');
            $table->float('discount');
            $table->float('final');

            $table->smallInteger('status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('orders');
    }
}
