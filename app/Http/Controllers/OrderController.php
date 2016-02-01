<?php
/*
	Order Status Codes

	0 => Some Unknown error in database

	1 => In Process

	2 => Verified, In Process  [After OTP]

	3 => Processed  [After Stock Verification]

	4 => Delivered

	5 => Cancelled
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Order;
class OrderController extends Controller
{
	
    public function show($id)
	{
		return Order::where('id',$id)->with('products')->first();
	}
    
    public function placeOrder(Request $request)
    {
    	$order = new Order;


    	foreach($request->products as $product)
    		orderProducts::create($product);

    	return response()->json(['status' => 1]);

    }

    public function cancel($id){
    	$order = Order::where('id' ,$id)->update(['status' => 5]);

    	if($order)
    		return response()->json(['status' => 'success']);
    }

    public function generateOTP($number){
    	$otp = 'ABCD';
    	
    	$number = Number::firstOrNew(['number' => $number]);

    	$number->otp = $otp;
    	$number->save();
    }

    public function verifyOTP($number,$otp)
    {
    	$number = Number::where($number)->first();
    	
    	if($number->otp == $otp)
    	{
    		$number->status = 1;
    		$number->save();
    	}
    	else
    		return response('Invalid either OTP or mobile', 400);
    }
}
