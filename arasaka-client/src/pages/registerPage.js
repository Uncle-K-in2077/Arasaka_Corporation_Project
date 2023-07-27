
import "../style/login.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAccount } from "../redux/accountSlice";
import { status as dataStatus } from "../utils/dataStatus";


function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { data : registeredAccount, status } = useSelector((state) => state.account);

  //Xử lý sự kiện onSubmit đăng ký
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi action registerAccount ở đây
    if(password !== rePassword){
      return setError("Password not match");
    }else{
      setError("");
    }

    const accountData = {
      email,
      password,
      username,
    };
    
    dispatch(registerAccount(accountData));
  };

  // const notificationByStatus = (status) =>{
  //     if (status === "loading") {
  //       setError("Please wait...");
  //     }

  //     if (status === "error") {
  //       setError("Email already registered");
  //     }

  //     if (status === "idle") {
  //       setError("Register success");
  //       console.log(registeredAccount.currentUser);
  //       console.log(registeredAccount.token);
  //     }
  // }

    useEffect(() => {
      // Xử lý thông báo dựa trên status khi có sự thay đổi
      if (status === dataStatus.LOADING) {
        setError("Please wait...");
      } else if (status === dataStatus.ERROR) {
        setError("Email already registered");
      } else if (status === dataStatus.SUCCESS && registeredAccount) {
        setError("Register success");
      } else if (status === "") {
        setError("");
      }
    }, [status, registeredAccount]);

  return (
    <main className="register-form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__image" />

        <img className="form__logo" src="/assets/images/Arasaka.png" alt="" />
        {/* <div className="glitch-container">
          <img className="form__logo" src="/assets/images/Arasaka.png" alt="/" />
        </div> */}
        
        <div className="input">
          <div className="form_title">
            <h6>
              {" "}
              Have account allredy?
              <Link className="register-link" to="/login">
                {" "}
                LOGIN NOW
              </Link>
            </h6>
          </div>
        </div>

        {/* Notification */}
        <p
          style={{
            color: "#FE5000",
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
        >
          {error}
        </p>

        {status === "loading" && <p>Loading...</p>}

        {/* {status === "error" && (
          <div className="alert">
            <p>Error: Email already registered</p>
            <button onClick={() => setError("")}>Close</button>
          </div>
        )}

        {status === "idle" && (
          <div className="form2">
            <h4 style={{color: "#FE5000"}}>Notification</h4>
            <p style={{ color: "#FE5000" }}>{error}</p>
          </div>
        )} */}

        <div
          className="toast align-items-center text-white bg-primary border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{error}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
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
            id="userName"
            type="text"
            className="input__element"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={rePassword}
            onChange={(e) => setrePassword(e.target.value)}
            required
          />
          <label className="input__label" htmlFor="re-password">
            Re-Password
          </label>
        </div>
        {/* (status === "loading" ? (
        <div className="loading">
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
        ) : ()) */}
        <button type="submit" className="cybr-btn">
          REGISTER<span aria-hidden>_</span>
          <span
            aria-hidden
            className="cybr-btn__glitch"
            style={{ fontWeight: "700" }}
          >
            ダンス
          </span>
          <span aria-hidden className="cybr-btn__tag">
            2077
          </span>
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;
