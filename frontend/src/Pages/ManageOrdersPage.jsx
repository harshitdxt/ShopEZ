import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Package,
  User,
  CalendarClock,
  MapPin,
  CreditCard,
  RefreshCcw,
} from "lucide-react";


function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track edited status values per order
  const [editedStatuses, setEditedStatuses] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/seller/orders", { withCredentials: true });
      setOrders(res.data.orders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders", err);
      setLoading(false);
    }
  };

  // Handle select changes but only update local editedStatuses state
  const handleStatusChange = (orderId, field, value) => {
    setEditedStatuses((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  // Send update request to backend
  const handleUpdateStatus = async (orderId) => {
    if (!editedStatuses[orderId]) {
      alert("No changes to update");
      return;
    }

    try {
      const updatedFields = editedStatuses[orderId];
      // Example API call for update - replace with your endpoint & method
     await axios.patch(`http://localhost:5000/api/v1/update-order/${orderId}`, updatedFields, { withCredentials: true });

      // Update local orders state to reflect changes
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ...updatedFields } : order
        )
      );

      // Clear edited status for this order
      setEditedStatuses((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });

      alert("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">
        Manage Orders
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const localStatus = editedStatuses[order._id] || {};
            return (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Order header */}
                <div className="flex justify-between items-center mb-3 text-gray-700 text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span>Order ID: <span className="font-semibold">{order._id}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarClock className="w-5 h-5 text-gray-400" />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* User */}
                <div className="flex items-center space-x-2 mb-3 text-gray-700">
                  <User className="w-5 h-5 text-green-600" />
                  <span>
                    <strong>User:</strong> {order.userId?.name || "Unknown"}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <strong className="text-gray-800 block mb-1">Items:</strong>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1 max-h-40 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.title} — Qty: {item.quantity} — Sizes:{" "}
                        {Array.isArray(item.sizes)
                          ? item.sizes.join(", ")
                          : item.sizes}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Controls */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`orderStatus-${order._id}`}
                      className="font-semibold text-gray-700"
                    >
                      Order Status:
                    </label>
                    <select
                      id={`orderStatus-${order._id}`}
                      value={localStatus.orderStatus ?? order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, "orderStatus", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`paymentStatus-${order._id}`}
                      className="font-semibold text-gray-700"
                    >
                      Payment Status:
                    </label>
                    <select
                      id={`paymentStatus-${order._id}`}
                      value={localStatus.paymentStatus ?? order.paymentStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, "paymentStatus", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleUpdateStatus(order._id)}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-black font-semibold px-4 py-2 rounded-md shadow transition-colors duration-200"
                    title="Update order status"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Update
                  </button>
                </div>

                {/* Shipping Address */}
                <div className="mt-4 flex items-center space-x-2 text-gray-600 text-sm">
                  <MapPin className="w-5 h-5" />
                  <span>
                    <strong>Shipping to:</strong>{" "}
                    {order.address?.street}, {order.address?.city},{" "}
                    {order.address?.state}, {order.address?.zip},{" "}
                    {order.address?.country}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ManageOrdersPage;
