<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderPlaced extends Event
{
    use SerializesModels;

    public $order;
    public $products;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($order,$products)
    {
        $this->order = $order;
        $this->products = $products;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
