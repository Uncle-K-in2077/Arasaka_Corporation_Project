/** @format */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { add, clear, remove, update } from "../redux/TempCartSlice";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { createNewOrder, getAllOrder } from "../redux/orderSlice";
import { status as dataStatus } from "../utils/dataStatus";

import "../css/Cart.css";

function ShoppingCart() {
  const myCollapseRef = useRef(null);

  const cartData = useSelector((state) => state.cart.data);

  const getAllOrderForAdmin = async () => {
    try {
      await dispatch(getAllOrder());
    } catch (error) {
      throw error;
    }
  };

  const orderStatus = useSelector((state) => state.order.status);
  console.log("orderStatus: ", orderStatus);

  console.log("Carrt", cartData);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [amount, setAmount] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const userName = currentUser ? currentUser.username : "";
  const userEmail = currentUser ? currentUser.email : "";
  console.log(userName, userEmail);

  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(clear());
  };

  const removeCart = (cartItemId) => {
    dispatch(remove(cartItemId));
  };

  const updateCart = (cartItemId, newCount) => {
    dispatch(update({ productId: cartItemId, newCount: newCount }));
  };

  // For scrolling purposes
  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Scroll with smooth animation
    });
  }

  // check out
  const checkOut = async (e) => {
    e.preventDefault();
    if (!cartData || cartData.length === 0) {
      alert("Your card is empty!");
      return;
    }

    try {
      const orderDTO = {
        accountId: currentUser.id,
        accountName: currentUser.username,
        phone: phone,
        address: address,
        email: currentUser.email,
        note: note,
        createdAt: new Date(),
        amount: amount,
        status: 1,
        orderDetails: cartData,
      };
      dispatch(createNewOrder(orderDTO));
      dispatch(clear());
      const btn = document.getElementById("resetBtn");
      btn.click();
      getAllOrderForAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let am = 0;
    let el = 0;
    if (cartData) {
      cartData.forEach((item) => {
        am = am + item.quantity * item.salePrice;
        el = el + item.quantity;
      });
    }
    setAmount(am);
    setTotalElement(el);
  }, [cartData]);

  return (
    <div className="noCss">
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className="col-7">
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="col-5" style={{ textAlign: "right" }}>
          <button className="customButton3" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col-8">
          {/* single cart item start */}
          {cartData && cartData.length > 0 ? (
            cartData.map((item) => {
              return (
                <div className="cart-item">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={"http://localhost:8080/" + item.image}
                        className="img-fluid cart-img"
                        alt="Cotton T-shirt"
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="product-name-2 mb-2">{item.productName}</p>
                      <p className="product-price-2">${item.salePrice}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <ul className="pagination" style={{ margin: "0" }}>
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() =>
                              updateCart(item.productId, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                        </li>
                        <li className="page-item">
                          <p className="page-link">{item.quantity}</p>
                        </li>
                        {/* <li className="page-item">
                          <input
                            type="number"
                            className="page-link"
                            value={item.count}
                            onChange={(e) => {
                              updateCart(
                                item.productId,
                                Number(e.target.value)
                              );
                            }}
                            style={{ width: "150%", textAlign: "center" }}
                          />
                        </li> */}
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() =>
                              updateCart(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5
                        className="mb-0 product-price-2"
                        style={{
                          fontSize: "28px",
                          fontWeight: "700",
                          color: "#fe5000",
                        }}
                      >
                        ${(item.quantity * item.salePrice).toLocaleString()}
                      </h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <p
                        className="remove-cart"
                        onClick={() => {
                          removeCart(item.productId);
                        }}
                        style={{ fontSize: "30px" }}
                      >
                        ×
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cart">
              <h1>Your cart is empty</h1>
            </div>
          )}

          {/* single cart item end */}
        </div>
        <div className="col-4">
          <div className="filterBlock" style={{ border: "1px solid #272727" }}>
            <p
              className="cart-right-item"
              style={{ borderBlockEnd: "1px solid #FE5000" }}
            >
              CART TOTALS
            </p>
            <div className="total-block">
              <div className="total-block-item mt-3">
                <h5 className="product-name-2">ITEMS :</h5>
                <span className="amount-number">{totalElement}</span>
              </div>
              <div className="total-block-item mt-3">
                <h5 className="product-name-2">TOTAL - $ :</h5>
                <span className="amount-number">{amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="total-block">
              <button
                style={{ width: "100%", fontWeight: "600" }}
                className="customButton"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={scrollToBottom}
              >
                Process to check out
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="collapse  mb5 row" id="collapseExample">
        <div className="col-8">
          <form
            onSubmit={checkOut}
            className="checkOut-right row"
            style={{ marginRight: "8px" }}
            id="checkOutForm"
          >
            <div className="col-6 mt-2">
              <input className="checkOut-input" type="text" value={userName} />
            </div>
            <div className="col-6 mt-2">
              <input className="checkOut-input" type="text" value={userEmail} />
            </div>
            <div className="col-6 mt-2">
              <input
                className="checkOut-input"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div className="col-6 mt-2">
              <input
                className="checkOut-input"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Your Address"
                required
              />
            </div>
            <div className="col-12 mt-2">
              <textarea
                className="checkOut-input"
                name="note"
                id="note"
                style={{ width: "100%" }}
                rows={3}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-12 row" style={{ paddingRight: "0" }}>
              <div className="col-2">
                <button
                  style={{ width: "100%", fontWeight: "600" }}
                  className="customButton2"
                  id="resetBtn"
                  type="reset"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => {
                    // Clear input fields on Cancel click
                    setPhone("");
                    setAddress("");
                    setNote("");
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="col-10" style={{ paddingRight: "0" }}>
                <button
                  style={{ width: "100%" }}
                  className="customButton4"
                  type="submit"
                >
                  Check Out
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3">
          <div className="checkOutForm">Damn</div>
        </div>
      </div>
      <br />
      <hr />
      <hr />
      <hr />
    </div>
  );
}

export default ShoppingCart;
