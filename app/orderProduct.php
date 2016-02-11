<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class orderProduct extends Model
{
 	protected $table = 'order_products';

 	protected $fillable = ['product_code','order_id','quantity','product_id','price','discount','product_name'];
}
