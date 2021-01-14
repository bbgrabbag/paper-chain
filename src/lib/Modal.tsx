import React from "react";
import ReactDOM from "react-dom";
import { Card, Close, Flex } from "theme-ui";

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

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // e.preventDefault();
    // e.stopPropagation();
    const { target } = e;
    if (!(target as HTMLDivElement).classList.contains("modal-backdrop"))
      return;
    props.modalAPI.toggleModal();
  };

  const modalContainer = (
    <Flex
      className="modal-backdrop"
      onClick={handleBackgroundClick}
      bg="primary"
      sx={{
        position: "fixed",
        zIndex:100,
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card bg="background">
        <Flex sx={{ justifyContent: "flex-end" }}>
          <Close onClick={props.modalAPI.toggleModal} />
        </Flex>
        <Flex sx={{ padding: "1rem" }}>{props.children}</Flex>
      </Card>
    </Flex>
  );

  return ReactDOM.createPortal(
    props.modalAPI.open ? modalContainer : null,
    modalRoot
  );
};
