import React from "react";
import ReactDOM from "react-dom";

interface UseModalHookAPI {
  open: boolean;
  toggleModal: () => void;
}

type UseModalHook = (openOnMount?: boolean) => UseModalHookAPI;

export const useModal: UseModalHook = (openOnMount) => {
  const [open, setOpen] = React.useState(!!openOnMount);

  const toggleModal = () => {
    setOpen(!open);
  };

  return {
    open,
    toggleModal,
  };
};

export interface ModalProps {
  rootSelector: string;
  modalAPI: UseModalHookAPI;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = (props) => {
  const modalRoot = document.querySelector(props.rootSelector);
  if (!modalRoot)
    throw Error(
      `Cannot mount modal to DOM. Element with selector '${props.rootSelector}' not found.`
    );

  const modalContainer = (
    <div>
      <button onClick={props.modalAPI.toggleModal}>X</button>
      <section>{props.children}</section>
    </div>
  );

  return ReactDOM.createPortal(
    props.modalAPI.open ? modalContainer : null,
    modalRoot
  );
};
