/** @format */

import "../style/login.css";
import { initResizeListener, resizeOnLoad } from "../js/resizeBackground";
import { useEffect, useState } from "react";
import { login } from "../redux/authenSlice";
import { useDispatch } from "react-redux"; // Import từ React-Redux
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { status as dataStatus } from "../utils/dataStatus";

import { Link } from "react-router-dom";

function Login() {
  const loading = useSelector((state) => state.auth.loading);
  const loginStatus = useSelector((state) => state.auth.loginStatus);

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
    // resizeOnLoad();

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

        {/* Old update UI form */}
        {/* <div
          className="form_title-2 row"
          style={{ display: "flex", alignItems: "center" }}
        >
          {loading === true ? (
            <div
              className="col-6 row"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <div
                className="col-3"
                style={{
                  height: "2px",
                  backgroundColor: "#ff4d4f",
                  paddingRight: "-50px",
                }}
              ></div>
              <div className="col-6" style={{ marginLeft: "-9px" }}>
                <div class="loading">
                  <svg width="64px" height="48px">
                    <polyline
                      points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                      id="back"
                    ></polyline>
                    <polyline
                      points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                      id="front"
                    ></polyline>
                  </svg>
                </div>
              </div>
              <div
                className="col-3"
                style={{
                  height: "2px",
                  backgroundColor: "#ff4d4f",
                }}
              ></div>
            </div>
          ) : (
            <div
              className="col-6"
              style={{
                height: "1px",
                backgroundColor: "red",
                marginLeft: "13px",
              }}
            ></div>
          )}

          <div className="col-5" style={{ padding: "0" }}>
            <h6 className="mb-0">
              <Link className="register-link" to="/fogotPassword">
                FORGOT PASSWORD?
              </Link>
            </h6>
          </div>
        </div> */}

        <div
          className="form_title-2 row"
          style={{
            display: "flex",
            alignItems: "center",
            animationDelay: "1.2s",
          }}
        >
          {loginStatus === dataStatus.LOADING && (
            <div
              className="col-6 row"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <div
                className="col-3"
                style={{
                  height: "2px",
                  backgroundColor: "#ff4d4f",
                  paddingRight: "-50px",
                }}
              ></div>
              <div className="col-6" style={{ marginLeft: "-9px" }}>
                <div class="loading">
                  <svg width="64px" height="48px">
                    <polyline
                      points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                      id="back"
                    ></polyline>
                    <polyline
                      points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                      id="front"
                    ></polyline>
                  </svg>
                </div>
              </div>
              <div
                className="col-3"
                style={{
                  height: "2px",
                  backgroundColor: "#ff4d4f",
                }}
              ></div>
            </div>
          )}
          {loginStatus === dataStatus.SUCCESS && (
            <div
              className="col-6"
              style={{
                height: "1px",
                backgroundColor: "red",
                marginLeft: "13px",
              }}
            ></div>
          )}
          {loginStatus === dataStatus.ERROR && (
            <div
              className="col-6 form_title-2 row"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
                textAlign: "left",
              }}
            >
              <div className="col-8" style={{ marginLeft: "-9px" }}>
                <h6 style={{ margin: "0" }} className="register-link">
                  LOGIN FAIL
                </h6>
              </div>
              <div
                className="col-4"
                style={{
                  height: "1px",
                  backgroundColor: "red",
                  // marginLeft: "-5px",
                }}
              ></div>
            </div>
          )}
          {loginStatus === "" && (
            <div
              className="col-6"
              style={{
                height: "1px",
                backgroundColor: "red",
                marginLeft: "13px",
              }}
            ></div>
          )}

          <div className="col-5" style={{ padding: "0" }}>
            <h6 className="mb-0">
              <Link className="register-link" to="/fogotPassword">
                FORGOT PASSWORD?
              </Link>
            </h6>
          </div>
        </div>

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
