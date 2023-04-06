import React from "react";

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.type}>
            <h2>{message.message}</h2>
        </div>
    );
};

export default Notification;