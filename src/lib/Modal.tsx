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
        zIndex: 100,
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="modal-content"
        bg="background"
        sx={{
          width: "85%",
          maxWidth: ["600px"],
          position: "relative",
          maxHeight: "80%",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Flex
          className="modal-header"
          sx={{
            justifyContent: "flex-end",
            position:'absolute',
            width: '100%',
            right: '1rem',
            top: '1rem',
          }}
        >
          <Close
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={props.modalAPI.toggleModal}
          />
        </Flex>
        <Flex
          className="modal-content-body"
          sx={{ overflowY: "scroll", padding: "3rem 1rem 1rem", maxHeight: "100%" }}
        >
          {props.children}
        </Flex>
      </Card>
    </Flex>
  );

  return ReactDOM.createPortal(
    props.modalAPI.open ? modalContainer : null,
    modalRoot
  );
};
