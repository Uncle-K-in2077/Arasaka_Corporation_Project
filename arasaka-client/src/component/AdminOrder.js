/** @format */

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getAllOrder } from "./../redux/orderSlice";
import { useEffect, useState } from "react";
import "../css/AdminOrder.css";

function AdminOrder() {
  const orderData = useSelector((state) => state.order?.data);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();

  const getAllOrderForAdmin = async () => {
    try {
      const res = await dispatch(getAllOrder());
      dispatch(getAllOrder(res.data));
    } catch (error) {
      throw error;
    }
  };

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
                  <table className="table table-dark table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Almount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.map((order) => {
                        return (
                          <tr
                            key={order.id}
                            onClick={() => {
                              setSelectedOrder(order.orderDetails);
                              console.log(selectedOrder);
                            }}
                          >
                            <th>{order.id}</th>
                            <td>{order.accountName}</td>
                            <td>{order.amount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-5" style={{ paddingLeft: 0 }}>
              {/* Order detail List */}
              <div className="single-detail-order">
                <div className="detail-block">
                  <h5 className="amount-number">Detail of Order</h5>
                  <hr />
                  {selectedOrder && selectedOrder.length > 0 ? (
                    selectedOrder.map((detail) => (
                      <div key={detail.id} className="detail">
                        <p>{detail.productName}</p>
                      </div>
                    ))
                  ) : (
                    <div className="">Null</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>No order yet</>
        )}
      </div>
    </>
  );
}

export default AdminOrder;
