
function Header() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-content">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* logo */}
              <img
                className="header-logo orange-logo"
                src="/assets/images/Arasaka4.png"
                alt=""
              />

              {/* router */}
              <ul className="navbar-nav mb-2 mb-lg-0 justify-content-end ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-active"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Header;