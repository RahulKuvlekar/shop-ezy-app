import React from "react";
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose,
} from "react-icons/fa";
import "./Toast.css";
import useCustomContext from "../../../Hooks/UseCustomContext";

const Toast = ({ position, autoDeleteInterval }) => {
  const { toast, dispatchToast } = useCustomContext();

  //   console.log("TOAST ", toast);
  const generateIcon = (type) => {
    switch (type) {
      case "INFO":
        return <FaInfoCircle />;
      case "WARNING":
        return <FaExclamationTriangle />;
      case "DANGER":
        return <FaExclamationCircle />;
      case "SUCCESS":
        return <FaCheck />;
      default:
        return;
    }
  };

  const generateBackgroundColor = (type) => {
    switch (type) {
      case "INFO":
        return "#5bc0de";
      case "WARNING":
        return "#f0ad4e";
      case "DANGER":
        return "#d9534f";
      case "SUCCESS":
        return "#5cb85c";
      default:
        return;
    }
  };

  return (
    <div className={`notification-container ${position}`}>
      {toast.map((notification, i) => {
        if (autoDeleteInterval) {
          setTimeout(() => {
            dispatchToast({
              type: "DELETE_NOTIFICATION",
              payload: notification.id,
            });
          }, autoDeleteInterval);
        }
        return (
          <div
            style={{
              backgroundColor: generateBackgroundColor(notification.type),
            }}
            key={notification.id}
            className={`notification toastCustom ${position}`}
          >
            <FaRegWindowClose
              onClick={() =>
                dispatchToast({
                  type: "DELETE_NOTIFICATION",
                  payload: notification.id,
                })
              }
              className="close-button"
            />
            <div className="notification-image">
              {generateIcon(notification.type)}
            </div>
            <div>
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
