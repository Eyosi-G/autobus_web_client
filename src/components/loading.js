import React from "react";
import Modal from "./modal";
import Spinner from "./spinner";

const Loading = ({open}) => {
  return (
    <Modal open={open}>
      <div
        className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center"
        style={{ zIndex: 1000 }}
      >
        <Spinner color="white" />
      </div>
    </Modal>
  );
};

export default Loading;
