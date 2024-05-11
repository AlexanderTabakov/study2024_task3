import React from "react";
import styled from "styled-components";
import useStore from "store";

interface ITaskCard {
  title: string;
  description: string;
  id: number;
  status: string;
  tag?: string;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

//TODO типизировать функции дропа

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  padding: 3px;
  border-radius: 4px;
  width: clamp(223px, 10vw, 226px);
  height: clamp(57px, 8vw, 114px);
  box-shadow: 0 1px 4px 0 #00000040;
  background-color: white;
  //cursor: -webkit-grab;
  //cursor: -moz-grab;
  //cursor: -o-grab;
  //cursor: -ms-grab;
  cursor: grab;
  button {
    border: none;
    width: 4px;
    background-color: white;
    color: gray;
    position: absolute;
    top: 4px;
    right: 8px;
    &:hover {
      cursor: pointer;
      transform: scale(120%);
    }
  }

  .title {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    overflow-x: hidden;
    word-wrap: break-word;
  }

  .description {
    display: flex;
    font-family: "Inter", sans-serif;
    height: fit-content;
    width: 90%;
    overflow-x: hidden;
    word-wrap: break-word;

    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
  }

  .status {
    display: flex;
    align-items: center;
    padding: 3px;
    width: fit-content;
    background-color: gray;
    //background-color: gray;
    border-radius: 10px;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;

    .dot {
      border: black 1px solid;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 4px;
    }
  }

  .tagLayout {
    display: flex;
  }

  .tag {
    width: fit-content;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
    background-color: #fff6e1;
    border-radius: 10px;
    padding: 3px;
  }
`;

const TaskCard: React.FC<ITaskCard> = ({
  title,
  description,
  tag,
  status,
  onDrop,
  onDragStart,
  onDragOver,
  id,
}) => {
  const { removeTask } = useStore();

  const handleColor = () => {
    if (status === "Not Started") {
      return "#F8FAFC";
    }

    if (status === "Ready") {
      return "#EBEBFF";
    }
    if (status === "In progress") {
      return "#E3F3FC";
    }
    if (status === "Blocked") {
      return "#FBE7E5";
    }
    if (status === "Done") {
      return "#EEF8E8";
    }
    if (status === "Cancelled") {
      return "#BBBFC4";
    }
  };

  const handleDotColor = () => {
    if (status === "Not Started") {
      return "#BBBFC4";
    }

    if (status === "Ready") {
      return "##6253DA";
    }
    if (status === "In progress") {
      return "#6CBFEF";
    }
    if (status === "Blocked") {
      return "#F0766B";
    }
    if (status === "Done") {
      return "#A3D982";
    }
    if (status === "Cancelled") {
      return "#BBBFC4";
    }
  };

  return (
    <Container
      draggable={true}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      <div className={"title"}>
        {" "}
        <h3> {title} </h3>
        <button onClick={() => removeTask(id)}>x</button>{" "}
      </div>
      <div className={"description"}>
        {" "}
        <p> {description}</p>{" "}
      </div>
      <div className={"status"} style={{ background: handleColor() }}>
        <div className={"dot"} style={{ background: handleDotColor() }}></div>
        <p> {status}</p>
      </div>
      <div className={"tagLayout"}>
        <p className={"tag"}> {tag}</p>
      </div>
    </Container>
  );
};

export default TaskCard;
