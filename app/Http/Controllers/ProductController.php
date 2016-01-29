<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\regionProduct;

class ProductController extends Controller
{
    public function show()
    {
    	$products = regionProduct::with('product')->get();
    	$data = [
    		'data' => $products,
    		// 'token' => csrf()
    	];
    	return response()->json($data);
    }

    public function delete($id)
    {
    	$product  = Product::where('id',$id)->delete();
    }

  
}
