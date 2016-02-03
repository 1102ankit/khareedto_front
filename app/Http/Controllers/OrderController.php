<?php
/*
	Order Status Codes

	0 => Some Unknown error in database

	1 => In Process

	2 => Verified, In Process  [After OTP]

	3 => Processed  [After Stock Verification]

    4 => Out for delivery
    
    5 => Delivered
        
	6 => Cancelled
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Order;
use App\orderProduct;
use App\Product;
use App\regionproduct;
class OrderController extends Controller
{
	
    public function show($id)
	{
		return Order::where('id',$id)->with('products')->first();
	}
    
    public function place(Request $request)
    {
        // print_r($request->product[0]);
        // dd('sd');

        $this->validate($request, [
            'name' => 'required|max:50',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'product.quantity' => 'required|numeric|min:1'
        ]);

    	$order = new Order;

        $order->customer_name = $request->name;
        $order->customer_email = $request->email;
        $order->customer_number = $request->phone;

        $order->region_id = 1;

        $product = regionproduct::where('product_id',$request->product['id'])->where('region_id',1)->with('product')->first();

        $order->total = $request->product['quantity'] * $product->price;
        $order->discount =  $request->product['quantity'] * $product->discount;

        $order->save();

        orderProduct::create([
                        'code'          => $product->product->code,
                        'order_id'      => $order->id,
                        'quantity'      => $request->product['quantity'],
                        'product_id'    => $product->id,
                        'price'         => $product->price *  $request->product['quantity'],
                        'discount'      => $product->discount * $request->product['quantity'],
                        'product_name'  => $product->product->name
                        ]);

        return response()->json($order->status);

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
