/** @format */
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-content">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* logo */}
            <img
              className="header-logo orange-logo"
              src="/assets/images/Arasaka4.png"
              alt=""
            />

            {/* router */}
            <ul className="navbar-nav mb-2 mb-lg-0 justify-content-end ml-auto">
              <li className="nav-item">
                <Link to="/">
                  <li className="nav-link">HOME</li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop">
                  <li className="nav-link">SHOP</li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop">
                  <li className="nav-link">ABOUT US</li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop">
                  <li className="nav-link">CART</li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop">
                  <li className="nav-link">LOGIN</li>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
