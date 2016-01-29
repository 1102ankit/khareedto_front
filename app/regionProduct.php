<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class regionProduct extends Model
{
   public function products()
   {
   		return $this->belongsTo('App\Product');	
   }
}
