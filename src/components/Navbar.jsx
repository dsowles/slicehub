import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold tracking-wider hover:text-orange-200">
          🍕 SliceHub
        </Link>

        <div className="flex gap-6 items-center font-semibold">
          <Link to="/" className="hover:text-orange-200 transition">Home</Link>
          <Link to="/build" className="hover:text-orange-200 transition">Build Pizza</Link>
          
          <Link to="/cart" className="hover:text-orange-200 transition flex items-center gap-1">
            Cart 
            {cartItems.length > 0 && (
              <span className="bg-white text-red-600 text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </Link>

          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-orange-200 transition">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-orange-100 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}