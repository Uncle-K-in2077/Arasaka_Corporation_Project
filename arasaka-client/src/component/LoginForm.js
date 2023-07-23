import "../style/login.css"
import { initResizeListener, resizeOnLoad } from "../js/resizeBackground";
import { useEffect, useState } from "react";
// import AxiosService from "../service/AxiosService";
import LoginService from "../service/LoginService";
import { Link } from 'react-router-dom';

function Login() { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

     const handleSubmit = async (e) => {
       e.preventDefault();
        try {
          const token = await LoginService.login(email, password);
          if (token) {
            // Đăng nhập thành công, lưu token vào localStorage hoặc sử dụng AxiosService
            console.log("Token đây: " + token);
            //  AxiosService.setAuthorizationToken(token);
            localStorage.setItem("token", token);
            setError("Login success");
          } else {
            // Đăng nhập thất bại
            setError("Đăng nhập không thành công");
          }
        } catch (error) {
          setError("Đăng nhập không thành công");
        }
     };

    useEffect(()=>{
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
              </Link>
            </h6>
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

          <button type="submit" class="cybr-btn">
            Let's Go<span aria-hidden>_</span>
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

export default Login;