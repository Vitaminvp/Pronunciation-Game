import React from "react";
import * as PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classNames from "classnames";
import Notification from "./Notification";
import "./notifications.scss";

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

  const className = classNames("notification-container", {
    "notification-container-empty": notifications.length === 0
  });
  return (
    <div className={className}>
      <TransitionGroup>
        {notifications.map(notification => {
          const key = notification.id || new Date().getTime();
          return (
            <CSSTransition
              classNames="notification"
              timeout={{ enter: enterTimeout, exit: leaveTimeout }}
              key={key}
            >
              <Notification
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timeOut={notification.timeOut}
                onClick={notification.onClick}
                onRequestHide={handleRequestHide(notification)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
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
  enterTimeout: 4000,
  leaveTimeout: 4000
};

export default Notifications;
