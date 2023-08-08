/** @format */

import "../style/login.css";
import { initResizeListener, resizeOnLoad } from "../js/resizeBackground";
import { useEffect, useState } from "react";
import { login } from "../redux/authenSlice";
import { useDispatch } from "react-redux"; // Import từ React-Redux
import { useNavigate } from "react-router-dom";
import { status as dataStatus } from "../utils/dataStatus";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch(); // Khởi tạo dispatch từ React-Redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi action login bằng dispatch
      const response = await dispatch(
        login({ email, password, dispatch, navigate })
      );
      if (response.status === dataStatus.SUCCESS) {
        setError("Login success");
      } else if (response.status === dataStatus.LOADING) {
        setError("Đang đăng nhập...");
      } else if (response.status === dataStatus.ERROR) {
        setError("Đăng nhập không thành công");
      }
    } catch (error) {
      setError("Đăng nhập không thành công");
    }
  };

  useEffect(() => {
    //for outLook
    initResizeListener();
    resizeOnLoad();

    //for login function
    // handleSubmit();
  }, []);

  return (
    <main className="login-form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__image" />
        <img className="form__logo" src="/assets/images/Arasaka.png" alt="" />

        {/* <input
              id="name"
              type="text"
              className="input__element"
              placeholder=" "
              required
            /> */}
        <div className="form_title">
          <h6>
            Have no account?
            <Link className="register-link" to="/register">
              {" "}
              REGISTER NOW
            </Link>{" "}
          </h6>
          {/* <h6>Or continue as a guess</h6> */}
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
        {/* <button type="submit" className="button">
            <div className="button__label">Continue</div>
            <div className="button__icon" />
          </button> */}
        {/* <div className="form_title">
          <h6>
            Or continue as a{" "}
            <Link className="register-link" to="/">
              {" "}
              GUESS
            </Link>
          </h6>
        </div> */}

        <button type="submit" className="cybr-btn">
          Let's Go<span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">
            to 2077
          </span>
          <span aria-hidden className="cybr-btn__tag">
            2077
          </span>
        </button>

        {error && <p style={{ color: "#FE5000" }}>{error}</p>}
      </form>
    </main>
  );
}

export default Login;
