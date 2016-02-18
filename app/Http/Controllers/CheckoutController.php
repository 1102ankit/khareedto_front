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
class CheckoutController extends Controller
{


    public function checkout(Request $request)
    {

        $this->validateInput();

    	$order = new Order;

        $order->customer_name = $request->form['name'];
        $order->customer_email = $request->form['email'];
        $order->customer_number = $request->form['phone'];

        $order->region_id = 1;
        $products = [];

        foreach($request->products as $p)
        {
            $product = Product::where('code',$p['code'])
                            ->join('region_products as rp','rp.product_id','=','products.id')
                            ->where('rp.region_id',1)
                            ->first();

            $product->quantity = intval($p['qty']);
            $product->price = $product->price * intval($p['qty']);
            $product->discount = $product->discount * intval($p['qty']);

            // Attributes to do mass storage in Order_products
            $product->product_name = $product->name;
            $product->product_code = $product->code;


            $products[] = $product;

        }

        $products = collect($products);

        $order->total = $products->sum('price');
        $order->discount =  $products->sum('discount');

        $order->save();

        //Raw products list to send on Slack
        $raw_products = "";

        $products = $products->toArray();

        foreach ($products as $product) {
            $product['order_id'] = $order->id;
            orderProduct::create($product);

            $raw_products .= "\n" .$product['name']  ."|  qty: ".$product['quantity'] ."| price: Rs.". ($product['price'] - $product['discount']);
        }





        return response()->json([$order->price, $order->status]);




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

    public function sendSlackMessage($message, $channel='#orders'){
        \Slack::to($channel)->send(
                "=========\n Hey team !! \n We have new Order \n=======\n $order->customer_name\n $order->customer_number*\n $order->customer_email\n Final Price: Rs. ". ($order->total-$order->discount)." ```$raw_products```"
            );
    }

    private function validateInput(Request $request)
    {

    }
}
