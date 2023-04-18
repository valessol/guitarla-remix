import React from "react";

const Message = ({ children, type }) => {
  const messageClass = `${type}-message`;
  return <div className={messageClass}>{children}</div>;
};

export default Message;
