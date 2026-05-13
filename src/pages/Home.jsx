
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


  const popularPizzas = [
  {
    id: 1,
    name: 'Pepperoni, The Classic',
    description: 'Double pepperoni, extra mozzarella, and our signature classic tomato sauce.',
    price: 14.99,
    toppings: ['Pepperoni', 'Extra Cheese'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Italian',
    description: 'Fresh mozzarella, sliced tomatoes, fresh basil, and a drizzle of olive oil.',
    price: 13.99,
    toppings: ['Fresh Mozzarella', 'Tomatoes', 'Fresh Basil'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'The Meat Monster',
    description: 'Pepperoni, sausage, bacon, and ham piled high on our thick crust.',
    price: 17.99,
    toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop'
  }
];


export default function Home() {

  const { addToCart } = useCart();
  const navigate = useNavigate();


  const handleQuickAdd = (pizza) => {

    const cartItem = {
      id: crypto.randomUUID(),
      name: pizza.name,
      size: 'Large (14")', 
      crust: 'Hand Tossed', 
      toppings: pizza.toppings,
      price: pizza.price,
      quantity: 1
    };

    addToCart(cartItem);
    navigate('/cart');
  };

  return (
    <div className="space-y-16">
      

      <section className="relative bg-red-600 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">

          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop" 
            alt="Pizza background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 px-8 py-20 md:py-32 text-center text-white flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Your Perfect Slice, <br /> Made For You.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl font-medium drop-shadow-md">
            Build your dream pizza from scratch or choose from our in-house specials. Fresh ingredients, unlimited possibilities.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/build" 
              className="bg-white text-red-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-orange-50 hover:scale-105 transition-all duration-200"
            >
              Order Now! 🍕
            </Link>
            <Link 
              to="/login" 
              className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-5xl mb-4">🍅</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fresh Ingredients</h3>
          <p className="text-gray-600">Locally sourced veggies and premium meats, chopped fresh daily.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-5xl mb-4">🔥</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Wood-Fired Taste</h3>
          <p className="text-gray-600">Baked to perfection in our specialized high-heat ovens.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Delivery</h3>
          <p className="text-gray-600">Hot and ready at your door in 30 minutes or less.</p>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8 px-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Popular Choices</h2>
            <p className="text-gray-500 mt-2">Everybody loves these!</p>
          </div>
          <Link to="/build" className="text-red-600 font-semibold hover:underline hidden sm:block">
            View All Menu &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularPizzas.map((pizza) => (
            <div key={pizza.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
              <img 
                src={pizza.image} 
                alt={pizza.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pizza.name}</h3>
                  <span className="text-lg font-bold text-red-600">{pizza.price}</span>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{pizza.description}</p>
                <button 
                  onClick={() => handleQuickAdd(pizza)}
                  className="w-full bg-orange-100 text-red-700 font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200">
                  Quick Add
                </button>

                
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}