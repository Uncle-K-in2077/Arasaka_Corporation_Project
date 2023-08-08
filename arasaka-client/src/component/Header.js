/** @format */
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../redux/authenSlice";
import { useDispatch } from "react-redux";

function Header() {
  const cartData = useSelector((state) => state.cart.data);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    dispatch(logOut({ dispatch, navigate }));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-content">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* logo */}
            <img
              className="header-logo orange-logo"
              src="/assets/images/Arasaka.png"
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
                <Link to="/cart">
                  <li className="nav-link">CART({cartData.length})</li>
                </Link>
              </li>
              {currentUser ? (
                <li className="nav-item">
                  <Link to="/shop">
                    <li className="nav-link">Hi {currentUser.username}</li>
                  </Link>
                </li>
              ) : (
                ""
              )}
              {currentUser?.role === 0 ? (
                <li className="nav-item">
                  <Link to="/admin">
                    <li className="nav-link">To Admin Page</li>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {currentUser ? (
                <li className="nav-item">
                  <li className="nav-link" onClick={handleLogout}>
                    LogOUT
                  </li>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login">
                    <li className="nav-link">LogIn</li>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
