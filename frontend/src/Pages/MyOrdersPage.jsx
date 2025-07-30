import React, { useEffect, useState } from "react";
import axios from "axios";
import { PackageCheck, CreditCard, Truck, CalendarDays } from "lucide-react";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDownloadPDF = (orderId) => {
  window.open(`http://localhost:5000/api/v1/order/${orderId}/pdf`, "_blank");
};


  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/my-order", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🛍 My Orders</h2>

        {loading ? (
          <div className="text-gray-500 text-center">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600">No orders found. Start shopping!</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border rounded-lg shadow-sm p-6 space-y-4 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-indigo-500" />
                    <strong>Order ID:</strong> {order._id}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-green-600" />
                    <strong>Placed:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Status */}
                <div className="flex gap-6 text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Status: <span className="font-medium text-black">{order.orderStatus}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-rose-600" />
                    Payment: <span className="font-medium text-black">{order.paymentStatus}</span>
                  </span>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Items Purchased</h4>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="py-2 text-sm text-gray-700">
                        <span className="block font-medium">{item.title}</span>
                        Qty: {item.quantity} | Size(s): {Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Shipping Address</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {order.address.fullName && `${order.address.fullName}, `}
                    {order.address.street}, {order.address.city}, {order.address.state} -{" "}
                    {order.address.zip}, {order.address.country}
                    <br />
                    📞 {order.address.phone}
                  </p>
                </div>

                {/* Total */}
                <div className="text-lg font-semibold text-right text-indigo-700">
                  Total Paid: ₹{order.totalAmount.toFixed(2)}
                </div>
                {/* download pdf  */}
                <div className="text-right">
  <button
    onClick={() => handleDownloadPDF(order._id)}
    className="bg-indigo-500 text-black px-3 py-1 rounded hover:bg-indigo-600"
  >
    Download PDF
  </button>
</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;
