<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function subscribe(SubscriberRequest $request)
    {

        Subscriber::create([
            'email' => $request->input('email'),
        ]);

        return response()->json(['message' => 'Subscription successful'], 201);
    }
}
