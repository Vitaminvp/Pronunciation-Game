import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import Notification from "./Notification";
import './react-notifications.css';

function Notifications({
  onRequestHide,
  notifications,
  enterTimeout,
  leaveTimeout
}) {

  const handleRequestHide = notification => () => {
    if (onRequestHide) {
      onRequestHide(notification);
    }
  };

  const handleClick = notification => {
    return notification.onClick;
  };

  const className = classNames("notification-container", {
    "notification-container-empty": notifications.length === 0
  });
  return (
    <div className={className}>
      <CSSTransition
        classNames="notification"
        timeout={{ leaveTimeout, enterTimeout }}
      >
        <div>
          {notifications.map(notification => {
            const key = notification.id || new Date().getTime();
            return (
              <Notification
                key={key}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timeOut={notification.timeOut}
                onClick={() => handleClick(notification)}
                onRequestHide={handleRequestHide(notification)}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  onRequestHide: PropTypes.func,
  enterTimeout: PropTypes.number,
  leaveTimeout: PropTypes.number
};

Notifications.defaultProps = {
  notifications: [],
  onRequestHide: () => {},
  enterTimeout: 400,
  leaveTimeout: 400
};

export default Notifications;
