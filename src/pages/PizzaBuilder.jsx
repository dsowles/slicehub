
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const PRICING = {
  sizes: {
    'Small 10 inches': 10.00,
    'Medium 12 inches': 12.50,
    'Large 14 inches': 15.00,
  },
  crusts: {
    'Thin': 0,
    'Hand Tossed': 0,
    'Pan': 1.50,
    'Stuffed': 2.50,
  },
  toppingPrice: 1.25
};

const ALL_TOPPINGS = ['Pepperoni', 'Sausage', 'Mushrooms', 'Onions', 'Black Olives', 'Green Peppers', 'Extra Cheese', 'Bacon'];

export default function PizzaBuilder() {

  const { addToCart } = useCart();
  const navigate = useNavigate();

  
  const [size, setSize] = useState('Small 10 inches');
  const [crust, setCrust] = useState('Hand Tossed');
  const [toppings, setToppings] = useState([]);

  
  const handleToppingToggle = (toppingName) => {
    setToppings((prevToppings) => {
      
      if (prevToppings.includes(toppingName)) {
        return prevToppings.filter(t => t !== toppingName);
      }
      
      return [...prevToppings, toppingName];
    });
  };

  
  const calculateTotal = () => {
    const sizePrice = PRICING.sizes[size];
    const crustPrice = PRICING.crusts[crust];
    const toppingsPrice = toppings.length * PRICING.toppingPrice;
    return sizePrice + crustPrice + toppingsPrice;
  };

  
  const handleAddToCart = () => {
    const newPizza = {
      id: Date.now(),
      name: 'Custom Pizza',
      size,
      crust,
      toppings,
      price: calculateTotal(),
      quantity: 1
    };

    addToCart(newPizza);
    navigate('/cart');
  };


return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Build Your Best Pizza
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-red-600 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Choose Size
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(PRICING.sizes).map(([sizeName, price]) => (
                <div 
                  key={sizeName}
                  onClick={() => setSize(sizeName)}
                  className={`border-2 rounded-lg p-4 text-center cursor-pointer transition ${
                    size === sizeName ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <p className="font-bold text-gray-800">{sizeName}</p>
                  <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-red-600 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Choose Crust
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(PRICING.crusts).map(([crustName, extraPrice]) => (
                <div 
                  key={crustName}
                  onClick={() => setCrust(crustName)}
                  className={`border-2 rounded-lg p-3 text-center cursor-pointer transition ${
                    crust === crustName ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <p className="font-semibold text-gray-800">{crustName}</p>
                  {extraPrice > 0 && <p className="text-xs text-gray-500">+${extraPrice.toFixed(2)}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center flex-wrap gap-2">
              <span className="bg-red-600 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center">3</span>
              <span>Choose Toppings</span>
              <span className="text-sm font-normal text-gray-500 ml-auto">+${PRICING.toppingPrice.toFixed(2)} each</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ALL_TOPPINGS.map((topping) => (
                <label 
                  key={topping} 
                  className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                    toppings.includes(topping) ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={toppings.includes(topping)}
                    onChange={() => handleToppingToggle(topping)}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                  />
                  <span className="text-gray-700 font-medium">{topping}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Live Preview</h3>
            
            <div className="bg-orange-100 w-full aspect-square rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-orange-200 relative overflow-hidden">
              <span className="text-8xl transform transition-transform duration-300 hover:scale-110">🍕</span>
              {toppings.length > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  {toppings.length}
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Size:</span>
                <span className="text-right">{size}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Crust:</span>
                <span className="text-right">{crust}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Toppings:</span>
                <span className="text-right text-sm">
                  {toppings.length > 0 ? toppings.join(', ') : 'None'}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md flex justify-center items-center gap-2"
            >
              Add to Order <span>🛒</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}