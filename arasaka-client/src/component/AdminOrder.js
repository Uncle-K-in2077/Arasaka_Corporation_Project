/** @format */

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getAllOrder } from "./../redux/orderSlice";
import { useEffect, useState } from "react";
import "../css/AdminOrder.css";

import format from "date-fns/format";

function AdminOrder() {
  const orderData = useSelector((state) => state.order?.data);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderInfor, setSelectedOrderInfor] = useState(null);

  const dispatch = useDispatch();

  const getAllOrderForAdmin = async () => {
    try {
      const res = await dispatch(getAllOrder());
      dispatch(getAllOrder(res.data));
    } catch (error) {
      throw error;
    }
  };

  const formatDate = (date) => {
    const formatedDate = format(new Date(date), "dd-MM-yyyy");
    return formatedDate;
  };

  // const singItAgain = (orderID) => {
  //   const theSong = document.getElementById(`theSong${orderID}`);
  //   theSong.click();
  //   theSong.click();
  // };

  useEffect(() => {
    getAllOrderForAdmin();
  }, []);
  return (
    <>
      <h1>ORDER PAGE</h1>
      <hr />
      <div className="adminOrders">
        {orderData && orderData.length > 0 ? (
          <div className="row">
            <div className="col-7">
              {/* Order List, map list order ở đây rồi click cái nào mới xổ detail cái đó qua phải */}
              <div className="order-main">
                <div className="all-order">
                  {/* UI - 2 */}
                  {orderData.map((order) => {
                    return (
                      <div
                        key={order.id}
                        className="single-order row mb-1"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setSelectedOrder(order.orderDetails);
                          setSelectedOrderInfor(order);
                          // singItAgain(order.id);
                        }}
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="true"
                        aria-controls="collapseExample"
                      >
                        <div className="col-2" style={{ paddingLeft: "0" }}>
                          <img
                            src="https://cyberpunk2077.wiki.fextralife.com/file/Cyberpunk-2077/arasaka-corpo-logo-cyberpunk-2077-wiki-guide.png"
                            alt="/"
                            style={{ width: "80px", height: "80px" }}
                          />
                        </div>
                        <div
                          className="col-3 account"
                          style={{ marginLeft: "-45px" }}
                        >
                          <span style={{ fontWeight: "550" }}>
                            {order.accountName}
                          </span>{" "}
                          <br />
                          <span>0{Number(order.phone).toLocaleString()}</span>
                        </div>
                        <div className="col-3">
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="col-2 single-order-price">
                          ${order.amount.toLocaleString()} <br />
                        </div>
                        <div className="col-2">
                          {order.status === 1 ? (
                            <span className="order-status">Processing</span>
                          ) : order.status === 2 ? (
                            <span className="order-status">Delivered</span>
                          ) : order.status === 3 ? (
                            <span className="order-status">Received</span>
                          ) : (
                            <span className="order-status">Canceled</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-5" style={{ paddingLeft: 0 }}>
              {/* Order detail List */}
              <div className="single-detail-order">
                <div className="detail-block">
                  <h1>ORDER DETAIL </h1>
                  <hr />
                  <div className="row detail">
                    <div className="col-5">Cyberware</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Count</div>
                    <div className="col-3">Amount</div>
                  </div>
                  <div
                    className="mt-2 mb-3"
                    style={{
                      height: "1px",
                      backgroundColor: "#a0a0a0db",
                      textTransform: "uppercase",
                    }}
                  ></div>
                  {selectedOrder && selectedOrder.length > 0 ? (
                    <div className=" collapse show" id="collapseExample">
                      {selectedOrder.map((detail) => (
                        <div className="row detail mb-2">
                          <div className="col-5">{detail.productName}</div>
                          <div className="col-2">{detail.salePrice}</div>
                          <div className="col-2">x {detail.quantity}</div>
                          <div className="col-3">
                            {(
                              detail.quantity * detail.salePrice
                            ).toLocaleString()}
                          </div>
                        </div>
                      ))}
                      <div
                        className="mt-2 mb-2"
                        style={{
                          height: "1px",
                          backgroundColor: "#a0a0a0db",
                          textTransform: "uppercase",
                        }}
                      ></div>
                      <div className="row mb-2">
                        <div className="col-2">Total</div>
                        <div className="col-7"></div>
                        <div
                          className="col-3 product-price"
                          style={{ textAlign: "left" }}
                        >
                          ${selectedOrderInfor.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-2">Customer</div>
                        <div className="col-10" style={{ textAlign: "right" }}>
                          <span className="detail-name">
                            {selectedOrderInfor.accountName}
                          </span>
                        </div>
                      </div>
                      <div
                        className="col-12 mb-2"
                        style={{ textAlign: "justify" }}
                      >
                        NOTE : {selectedOrderInfor.note}
                      </div>

                      <div className="row mb-2">
                        <div className="col-3">Cel-Phone</div>
                        <div className="col-9" style={{ textAlign: "right" }}>
                          <span className="detail-name">
                            0{Number(selectedOrderInfor.phone).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-2">Address </div>
                        <div className="col-10" style={{ textAlign: "right" }}>
                          <span className="detail-name">
                            {selectedOrderInfor.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="" style={{ textAlign: "center" }}>
                      Click on one order to view details
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="amount-number">There's no order yet!</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminOrder;
