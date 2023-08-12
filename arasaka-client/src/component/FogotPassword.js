/** @format */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendOTP } from "../redux/authenSlice";
import { useEffect, useState } from "react";
// import { status as dataStatus } from "./../utils/dataStatus";

function FogotPassword() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  // const otpStatus = useSelector((state) => state.auth.otpStatus);

  const [userEmail, setUserEmail] = useState("");

  const sendingOTP = async () => {
    try {
      const res = await dispatch(sendOTP({ accountEmail: userEmail }));
      return res;
    } catch (error) {
      console.log("Failed to send", error);
    }
  };

  useEffect(() => {}, [loading]);

  return (
    <main className="login-form-container">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          sendingOTP(userEmail);
        }}
      >
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
            Give us your <span className="register-link">Registered Email</span>
          </h6>
          {/* <h6>Or continue as a guess</h6> */}
        </div>

        <div className="input">
          <input
            id="email"
            type="email"
            className="input__element"
            placeholder=" "
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="email">
            Your current Email
          </label>
        </div>

        <div
          className="form_title-2 row"
          style={{ display: "flex", alignItems: "center" }}
        >
          {loading === true ? (
            <div className="col-8 row">
              <div className="col-4"></div>
              <div className="col-4">
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
              <div className="col-4"></div>
            </div>
          ) : (
            <div
              className="col-8"
              style={{
                height: "1px",
                backgroundColor: "red",
                marginLeft: "13px",
              }}
            ></div>
          )}

          <div className="col-3" style={{ padding: "0" }}>
            <h6 className="mb-0">
              Back to{" "}
              <Link className="register-link" to="/login">
                {" "}
                LOGIN
              </Link>
            </h6>
          </div>
        </div>

        {/* <div
          className="form_title-3 row"
          style={{ display: "flex", alignItems: "center" }}
        >
          {otpStatus === dataStatus.LOADING && <div>Loading...</div>}
          {otpStatus === dataStatus.SUCCESS && (
            <div>
              <h6 style={{ textAlign: "left" }}>
                Your <span className="register-link">New Password</span> had
                been sended to your Email!
              </h6>
            </div>
          )}
          {otpStatus === dataStatus.ERROR && <div>Error sending OTP.</div>}
        </div> */}

        <button type="submit" className="cybr-btn">
          GET NEW PASSWORD<span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">
            to 2077
          </span>
          <span aria-hidden className="cybr-btn__tag">
            2077
          </span>
        </button>

        {/* {error && <p style={{ color: "#FE5000" }}>{error}</p>} */}
      </form>
    </main>
  );
}

export default FogotPassword;
