/** @format */

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getOrderByAccountId,
  updateOrderStatusById,
} from "../redux/orderSlice";
import { useEffect, useState } from "react";
import format from "date-fns/format";

function UserOrders() {
  const dispatch = useDispatch();

  const ordersData = useSelector((state) => state.order.byAccountData);
  console.log(ordersData);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const idAccount = currentUser.id;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderInfor, setSelectedOrderInfor] = useState(null);

  const getAllOrderByAccountId = async (idAccount) => {
    try {
      await dispatch(getOrderByAccountId(idAccount));
    } catch (error) {
      throw error;
    }
  };

  const updateOrderStatus = async (orderIdToUpdate, orderNewStatus) => {
    const userConfirmed = window.confirm("Are you sure?");

    if (userConfirmed) {
      try {
        await dispatch(
          updateOrderStatusById({
            orderId: orderIdToUpdate,
            orderStatus: orderNewStatus,
          })
        );
        getAllOrderByAccountId(idAccount);
      } catch (error) {
        console.log("Error updating order status", error);
      }
    } else {
      console.log("Order cancellation was not confirmed");
    }
  };

  const formatDate = (date) => {
    const formatedDate = format(new Date(date), "dd-MM-yyyy");
    return formatedDate;
  };
  useEffect(() => {
    getAllOrderByAccountId(idAccount);
  }, [idAccount]);

  return (
    <div className="row">
      <div className="col-6">
        <div className="profile-main">
          <div className="all-order">
            {ordersData && ordersData.length > 0 ? (
              ordersData.map((od) => {
                return (
                  <div
                    key={od.id}
                    className="single-order row mb-1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setSelectedOrder(od.orderDetails);
                      setSelectedOrderInfor(od);
                    }}
                  >
                    {/* Start detailing */}
                    <div className="col-2" style={{ paddingLeft: "0" }}>
                      <img
                        src="https://cyberpunk2077.wiki.fextralife.com/file/Cyberpunk-2077/arasaka-corpo-logo-cyberpunk-2077-wiki-guide.png"
                        alt="/"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                    <div
                      className="col-3 account"
                      style={{ marginLeft: "-45px" }}
                    >
                      <span style={{ fontWeight: "550" }}>
                        {od.accountName}
                      </span>{" "}
                      <br />
                      <span>0{Number(od.phone).toLocaleString()}</span>
                    </div>
                    <div className="col-3">{formatDate(od.createdAt)}</div>
                    <div className="col-2 single-order-price">
                      ${od.amount.toLocaleString()} <br />
                    </div>
                    <div className="col-2">
                      {od.status === 1 ? (
                        <span className="order-status">Processing</span>
                      ) : od.status === 2 ? (
                        <span className="order-status">Delivered</span>
                      ) : od.status === 3 ? (
                        <span className="order-status">Received</span>
                      ) : (
                        <span className="order-status">Canceled</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You have no order to show</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-6" style={{ paddingLeft: 0 }}>
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
                      {(detail.quantity * detail.salePrice).toLocaleString()}
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
                <div className="col-12 mb-2" style={{ textAlign: "justify" }}>
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
                <div
                  className="mt-2 mb-2"
                  style={{
                    height: "1px",
                    backgroundColor: "#a0a0a0db",
                    textTransform: "uppercase",
                  }}
                ></div>
                <div className="col-12">
                  {selectedOrderInfor.status === 1 ? (
                    <div
                      className="row"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="col-7">
                        <span className="processing" style={{ width: "100%" }}>
                          Your order is on Admin's process!
                        </span>
                      </div>
                      <div
                        className="col-5"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <div
                          className="collapse collapse-horizontal"
                          id="collapseWidthExample"
                          style={{ maxHeight: "43px", width: "100" }}
                        >
                          <button
                            className="customButtonCancel"
                            style={{ maxHeight: "43px", width: "100" }}
                            onClick={() => {
                              updateOrderStatus(selectedOrderInfor.id, 4);
                            }}
                          >
                            Cancel this order?
                          </button>
                        </div>

                        <button
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseWidthExample"
                          aria-expanded="false"
                          aria-controls="collapseWidthExample"
                          className="customButton5"
                        >
                          <img src={"/assets/images/dots.png"} alt="Icon" />
                        </button>
                      </div>
                    </div>
                  ) : selectedOrderInfor.status === 2 ? (
                    <div
                      className="row"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="col-7">
                        <span className="delivering" style={{ width: "100%" }}>
                          Your order's now on delivering..!
                        </span>
                      </div>
                      <div className="col-5">
                        <button
                          style={{ float: "right" }}
                          className="customButton4"
                          onClick={() => {
                            updateOrderStatus(selectedOrderInfor.id, 3);
                          }}
                        >
                          Received?
                        </button>
                      </div>
                    </div>
                  ) : selectedOrderInfor.status === 3 ? (
                    <span className="order-status">
                      <button
                        className="customButton4"
                        style={{ width: "100%" }}
                      >
                        Thank you for your order ❤
                      </button>
                    </span>
                  ) : (
                    <span className="order-status">
                      <button
                        type="submit"
                        className="glitchButton"
                        style={{ width: "100%" }}
                      >
                        This order had been CANCELED {":<"}
                        <span aria-hidden>_</span>
                        <span aria-hidden className="glitchButton__glitch">
                          CANCEL CANCEL
                        </span>
                        <span aria-hidden className="glitchButton__tag">
                          CANCEL CANCEL
                        </span>
                      </button>
                    </span>
                  )}
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
  );
}

export default UserOrders;
