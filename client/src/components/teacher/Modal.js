import React, {forwardRef, useImperativeHandle} from "react";
import ReactDOM from "react-dom";

export const Modal = forwardRef((props,ref) => {
  const [display, setDisplay] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close()
    }
  });

  const open = async () => {
    setDisplay(true)
  };

  const close = async () => {
    setDisplay(false);
  };
  
  if (display === true) {
    return ReactDOM.createPortal(
      <div className={"modal-wrapper"}>
        <div onClick={close} className={"modal-backdrop"} />
        <div className={"modal-box"}>
          {props.children}
        </div>
      </div>, document.getElementById("modal-root"))
  }

  return null;

});

