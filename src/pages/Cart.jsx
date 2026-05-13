import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Cart() {

  const { cartItems, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = cartItems.length > 0 ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleEdit = (item, index) => {
    removeFromCart(index);
    navigate('/build');
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);
    setError('');

    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        total,
        status: 'Preparing',
        orderDate: new Date().toLocaleDateString(),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'orders'), orderData);

      clearCart();
      navigate('/dashboard');

    } catch (err) {
      console.error("Error during checkout: ", err);
      setError("There was a problem placing your order. Please try again.");
      setIsCheckingOut(false);
    }
  };
  

return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Cart</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 max-w-3xl mx-auto">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* If the cart is empty */}
      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl text-gray-500 mb-4">Your cart is feeling a little empty.</p>
          <Link to="/build" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">
            Start Building a Pizza
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item, index) => (
              <div key={item.id || index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                
                <div className="bg-orange-100 w-24 h-24 rounded-lg flex items-center justify-center text-4xl shrink-0">
                  🍕
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size} • {item.crust} Crust</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold text-gray-700">Toppings:</span> {item.toppings.length > 0 ? item.toppings.join(', ') : 'None'}
                  </p>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  
                  <div className="flex gap-3 mt-2">
                    <button 
                      onClick={() => handleEdit(item, index)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>
              
              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md ${
                  isCheckingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              {!currentUser && (
                <p className="text-xs text-center text-gray-500 mt-3">
                  You will be asked to log in before checking out.
                </p>
              )}

              <Link to="/build" className="block text-center w-full mt-4 text-red-600 hover:underline font-medium">
                Add Another Pizza
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}