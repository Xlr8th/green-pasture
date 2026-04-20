import './Header.css'
import { Link } from 'react-router-dom'
import logo from './logo.png'

const Header = ({ cartCount, onCartToggle }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className='gp'>
            <img src={logo} alt="brand logo" />

            <span className="logo">
              Green Pastures
            </span>
          </div>
          

          <nav className="nav">

              <Link to="/">Home</Link>
              <Link to="/create">Create Post</Link>
              <button className="cart-btn" onClick={onCartToggle}>
                  🛒 Cart (<span>{cartCount}</span>)
              </button>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
