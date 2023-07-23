
import "../style/login.css";
import { initResizeListener, resizeOnLoad } from "../js/resizeBackground";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="register-form-container">
      <form className="form">
        <div className="form__image" />
        <img className="form__logo" src="/assets/images/Arasaka.png" alt="" />

        <div className="input">
          {/* <input
              id="name"
              type="text"
              className="input__element"
              placeholder=" "
              required
            /> */}
          <div className="form_title">
              <h6> Have account allredy? 
                <Link className="register-link" to="/login">
                {" "} LOGIN NOW
                </Link>
              </h6>
          </div>
        </div>
        <div className="input">
          <input
            id="email"
            type="email"
            className="input__element"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="email">
            Email
          </label>
        </div>
        <div className="input">
          <input
            id="email"
            type="userName"
            className="input__element"
            placeholder=" "
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="email">
            Username
          </label>
        </div>
        <div className="input">
          <input
            id="password"
            type="password"
            className="input__element"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="input">
          <input
            id="re-password"
            type="password"
            className="input__element"
            placeholder=" "
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="password">
            Re-Password
          </label>
        </div>

        <button type="submit" class="cybr-btn">
          REGISTER<span aria-hidden>_</span>
          <span aria-hidden class="cybr-btn__glitch">
            to 2077
          </span>
          <span aria-hidden class="cybr-btn__tag">
            2077
          </span>
        </button>

        {error && <p style={{ color: "#FE5000" }}>{error}</p>}
      </form>
    </main>
  );
}

export default RegisterPage;
