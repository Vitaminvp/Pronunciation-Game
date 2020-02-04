import React, { useEffect } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

function Notification({
  onClick,
  timeOut,
  onRequestHide,
  type,
  message,
  title
}) {
  useEffect(() => {
    if (timeOut === 0) return;
    const timer = setTimeout(requestHide, timeOut);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  function handleClick() {
    if (onClick) onClick();
    requestHide();
  }

  function requestHide() {
    if (onRequestHide) onRequestHide();
  }

  const className = classNames(["notification", `notification-${type}`]);
  const caption = title ? <h4 className="title">{title}</h4> : null;
  return (
    <div className={className} onClick={handleClick}>
      <div className="notification-message" role="alert">
        {caption}
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
  title: PropTypes.node,
  message: PropTypes.node.isRequired,
  timeOut: PropTypes.number,
  onClick: PropTypes.func,
  onRequestHide: PropTypes.func
};

Notification.defaultProps = {
  type: "info",
  title: null,
  message: null,
  timeOut: 5000,
  onClick: () => {},
  onRequestHide: () => {}
};

export default Notification;
