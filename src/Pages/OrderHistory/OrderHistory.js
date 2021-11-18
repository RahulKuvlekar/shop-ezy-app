import React, { useState, useEffect } from "react";
import PersonalInfo from "../../Components/PersonalInfo/PersonalInfo";
import "./OrderHistory.css";
import db from "../../Config/Firebase-Init";
import useCustomContext from "../../Hooks/UseCustomContext";
import Rating from "../../Components/Rating/Rating";
import ImageLoader from "../../Components/UI/ImageLoader/ImageLoader";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const { user } = useCustomContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setOrderList(
          snapshot.docs.map((doc) => ({ ...doc.data(), orderId: doc.id }))
        );
      });
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  console.log("Order Info ==> ", orderList);
  return (
    <div className="OrderHistory-section">
      <PersonalInfo disabledOrderBtn={false} />
      <h2>Order History</h2>
      {loading && <ImageLoader position="relative" />}
      {orderList.length <= 0 && <h3>No Item Ordered till Now . . . . </h3>}
      {orderList.map((order) => (
        <div key={order.orderId} className="orderList__section">
          <div className="orderList__header">
            <div className="orderList__left">
              <p>
                Order Placed -{" "}
                <b>{new Date(order.timestamp?.toDate()).toUTCString()}</b>
              </p>
            </div>
            <div className="orderList__right">
              <p>
                Delivery Address - <b>{order?.userAddress}</b>
              </p>
            </div>
          </div>
          <div className="orderList__body">
            {order.items.map((orderItem, idx) => (
              <div key={idx} className="orderItem">
                <img src={orderItem?.image} alt="smallitem" />
                <p style={{ width: "25%" }}>
                  <b>{orderItem.name}</b>
                </p>
                <p style={{ width: "20%" }}>
                  Rating - <Rating rating={orderItem.ratings} />
                </p>
                <p style={{ width: "15%" }}>
                  Price -<b> ₹{orderItem.price}</b>
                </p>
                <p style={{ width: "10%" }}>
                  Qty:-<b>{orderItem.quantity}</b>
                </p>
              </div>
            ))}
          </div>
          <div className="orderList__footer">
            <div style={{ padding: "1rem" }}>
              OrderId - <b>{order.orderId}</b>
            </div>
            <div style={{ padding: "1rem" }}>
              Payment Mode - <b>{order.paymentMode}</b>
            </div>
            <div className="btn-orange">
              Total Bill - <b> ₹{order?.totalAmount}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
