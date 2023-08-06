/** @format */

import { useDispatch, useSelector } from "react-redux";
import { clear, remove, update } from "../redux/TempCartSlice";
import { useEffect, useState } from "react";

import "../css/Cart.css";

function ShoppingCart() {
  const cartData = useSelector((state) => state.cart.data);
  console.log("Carrt", cartData);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [amount, setAmount] = useState(0);
  const [totalElement, setTotalElement] = useState(0);

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

  useEffect(() => {
    let am = 0;
    let el = 0;
    if (cartData) {
      cartData.forEach((item) => {
        am = am + item.count * item.price;
        el = el + item.count;
      });
    }
    setAmount(am);
    setTotalElement(el);
  }, [cartData]);

  return (
    <div className="noCss">
      <h1>Your Shopping Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      <hr />
      <div className="row">
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
                      <p className="product-name-2 mb-2">{item.name}</p>
                      <p className="product-price-2">${item.price}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <ul className="pagination" style={{ margin: "0" }}>
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() =>
                              updateCart(item.productId, item.count - 1)
                            }
                          >
                            -
                          </button>
                        </li>
                        <li className="page-item">
                          <p className="page-link">{item.count}</p>
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
                              updateCart(item.productId, item.count + 1)
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
                        ${item.count * item.price}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sint
          alias maiores dolore accusamus facere? In eligendi deleniti voluptatem
          doloribus omnis iste atque nam ipsam quae earum cum perspiciatis
          dolores, vitae rerum nobis debitis dicta nisi! Nobis, quas dolorem
          possimus laudantium aliquid rerum eius, excepturi vel aspernatur, odio
          perspiciatis reiciendis!
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
