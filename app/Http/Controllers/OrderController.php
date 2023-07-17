<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function getOrdersEmployee(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $userId = $request->input('user_id');
        $status = $request->input('status', 'pending');
        $orderBy = $request->input('orderBy', 'latest');

        $query = Order::with('user', 'orderItems.product', 'orderItems');

        if ($userId) {
            $query->whereHas('user', function ($q) use ($userId) {
                $q->where('id', $userId);
            });
        }

        $query->where(function ($q) {
            $q->whereNull('driver_id');
        });

        $query->where(function ($q) {
            $q->where('status', '!=', 'cancelled')
                ->whereNull('driver_id');
        });

        switch ($status) {
            case 'pending':
                $query->orderBy('status', 'desc');
                break;
            case 'selected':
                $query->orderBy('status', 'asc');
                break;
            default:
                $query->orderBy('status', 'desc');
                break;
        }

        if ($orderBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $orders = $query->paginate($perPage);

        $currentPage = $request->input('page', 1);

        return response()->json([
            'orders' => $orders->items(),
            'current_page' => $currentPage,
            'total' => $orders->total(),
            'per_page' => $orders->perPage(),
            'last_page' => $orders->lastPage(),
        ]);
    }

    public function allOrders(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $userId = $request->input('user_id');
        $orderBy = $request->input('orderBy', 'latest');
        $status = $request->input('status', 'pending');

        $query = Order::with('user','orderItems.product', 'orderItems');

        if ($userId) {
            $query->whereHas('user', function ($q) use ($userId) {
                $q->where('id', $userId);
            });
        }


        if ($orderBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if ($status === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }


        $orders = $query->paginate($perPage);

        $currentPage = $request->input('page', 1);

        $orders->transform(function ($order) {
            if (!$order->driver_id) {
                $order->driver_name = 'No driver assigned';
            } else {
                $driver = DB::table('users')->select('name')->where('id', $order->driver_id)->first();
                $order->driver_name = $driver ? $driver->name : 'Unknown driver';
            }
        
            if (!$order->employee_id) {
                $order->employee_name = 'No employee assigned';
            } else {
                $employee = DB::table('users')->select('name')->where('id', $order->employee_id)->first();
                $order->employee_name = $employee ? $employee->name : 'Unknown employee';
            }
        
            unset($order->driver_id);
            unset($order->employee_id);
        
            return $order;
        });
        

        return response()->json([
            'orders' => $orders->items(),
            'current_page' => $currentPage,
            'total' => $orders->total(),
            'per_page' => $orders->perPage(),
            'last_page' => $orders->lastPage(),
        ]);
    }

    public function driverOrders(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $driverId = $request->input('driver_id');

        $query = Order::with('user', 'orderItems.product', 'orderItems')
            ->where('driver_id', $driverId)
            ->where('status', '!=', 'delivered')
            ->orderBy('created_at', 'desc');

        $orders = $query->paginate($perPage);

        $currentPage = $request->input('page', 1);

        return response()->json([
            'orders' => $orders->items(),
            'current_page' => $currentPage,
            'total' => $orders->total(),
            'per_page' => $orders->perPage(),
            'last_page' => $orders->lastPage(),
        ]);
    }

    public function getOrderItems($orderId)
    {
        $order = Order::with('user', 'orderItems.product')->find($orderId);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json(['order' => $order]);
    }

    public function getOrdersbyID(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $userId = $request->input('user_id');
        $query = Order::with('user', 'orderItems.product', 'orderItems');

        if ($userId) {
            $query->whereHas('user', function ($q) use ($userId) {
                $q->where('id', $userId);
            });
        }

        $orders = $query->paginate($perPage);

        $currentPage = $request->input('page', 1);

        return response()->json([
            'orders' => $orders->items(),
            'current_page' => $currentPage,
            'total' => $orders->total(),
            'per_page' => $orders->perPage(),
            'last_page' => $orders->lastPage(),
        ]);
    }

    public function editOrder(Request $request, $orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['error' => 'Unable to update order: Order not found.'], 404);
        }

        $order->status = $request->input('status');
        $order->employee_id = $request->input('employee_id');

        $status = $request->input('status');

        if (!$status) {
            return response()->json(['error' => 'Unable to update order, you did not change your order status.'], 404);
        }

        if ($status === 'cancelled') {
            $driverName = $request->input('driver_id');
            if (!$driverName) {
                $order->driver_id = null;
            } else {
                return response()->json(['error' => 'Unable to update order, you cannot assign a driver and cancel at the same time.'], 404);
            }
        } else {
            if ($status !== 'cancelled') {
                $driverName = $request->input('driver_id');
                $driver = User::where('name', $driverName)->first();
                if ($driver) {
                    if ($status === 'delivering') {
                        $order->driver_id = $driver->id;
                    } else {
                        return response()->json(['error' => 'Unable to update order, delivering is required to assign a driver.'], 404);
                    }
                } else {
                    return response()->json(['error' => 'Unable to update order, driver was not chosen for the delivery.'], 404);
                }
            }
        }

        $order->save();
        $orderItems = $request->input('order_items');

        if (!empty($orderItems)) {
            foreach ($orderItems as $item) {
                $orderItem = OrderItem::find($item['id']);
                if ($orderItem) {
                    $orderItem->quantity = $item['quantity'];
                    $orderItem->save();
                } else {
                    return response()->json(['error' => 'Unable to update order, order item not found.'], 404);
                }
            }
        }

        return response()->json(['message' => 'Order was updated successfully.']);
    }


    public function driverEditOrder(Request $request, $orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['error' => 'Unable to update order: Order not found.'], 404);
        }

        $order->status = $request->input('status');

        $order->save();
        $orderItems = $request->input('order_items');

        if (!empty($orderItems)) {
            foreach ($orderItems as $item) {
                $orderItem = OrderItem::find($item['id']);
                if ($orderItem) {
                    $orderItem->quantity = $item['quantity'];
                    $orderItem->save();
                } else {
                    return response()->json(['error' => 'Unable to update order: Order item not found.'], 404);
                }
            }
        }

        return response()->json(['message' => 'Order updated successfully.']);
    }

    public function ordertrack($id)
    {
        $order = Order::with('user', 'orderItems.product', 'orderItems')->find($id);
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'No order found'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'order' => $order
        ]);
    }

    public function getLatestOrder(Request $request)
    {
        $userId = $request->input('user_id');

        $query = Order::with('user', 'orderItems.product', 'orderItems')
            ->whereHas('user', function ($q) use ($userId) {
                $q->where('id', $userId);
            })
            ->latest()
            ->first();

        if (!$query) {
            return response()->json(['error' => 'No order found for the user'], 404);
        }

        return response()->json(['order' => $query]);
    }

    public function count()
    {
        $count = Order::where('status', 'delivered')->count();

        return response()->json(['count' => $count]);
    }

    // public function calculateOrderTotals()
    // {
    //     $orders = Order::with('orderItems')->get();

    //     foreach ($orders as $order) {
    //         $total = 0;

    //         foreach ($order->orderItems as $item) {
    //             $total += $item->product->retail_price * $item->quantity;
    //         }

    //         DB::table('orders')->where('id', $order->id)->update(['total' => $total]);

    //         // Alternatively, you can update the total using the Order model
    //         $order->total = $total;
    //         $order->save();
    //     }

    //     return response()->json(['message' => 'Order totals calculated and stored successfully.']);
    // }
}
