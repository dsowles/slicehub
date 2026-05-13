import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Dashboard() {

  const { currentUser } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        
        const ordersQuery = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(ordersQuery);
        
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });

        fetchedOrders.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not load your order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

return (
    <div className="max-w-5xl mx-auto mt-8">
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, <span className="font-semibold text-gray-700">{currentUser?.email}</span>! Manage your account and view past orders here.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/build" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md inline-block">
            New Order 🍕
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Loading your delicious history...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      ) : orders.length === 0 ? (

        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
          <p className="text-xl text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/build" className="text-red-600 font-semibold hover:underline text-lg">
            Start your first order now &rarr;
          </Link>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              
              
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</h3>
                  <p className="text-sm text-gray-500">{order.orderDate}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>
              
              <div className="flex-grow mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      1x {item.size} {item.crust} Pizza 
                      {item.toppings.length > 0 ? ` (${item.toppings.length} toppings)` : ''}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>

                <Link to="/build" className="text-sm font-medium text-red-600 hover:text-red-800 transition bg-red-50 px-3 py-1 rounded-md hover:bg-red-100">
                  Order Again
                </Link>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}