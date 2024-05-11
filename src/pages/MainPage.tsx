import React, { useEffect, useState } from "react";
import useStore, { IData, IItem } from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";

const MainPage = () => {
  const { data, loading, hasErrors, postData } =
    useStore();

  if (data.length < 2 && !data) {
    return <Modal />;
  }

  const [boards, setBoards] = useState(null);
  useEffect(() => {
    setBoards(data);
  }, [data]);
  console.log(data[0].items);



  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStartHandler = (e: React.DragEvent, board: any, item: any) => {
    setCurrentBoard(board);
    setCurrentItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };


    const dropCardHandler = (e: React.DragEvent, board: IData) => {
        e.preventDefault();
        const newItems = [...board.items, currentItem];
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(
            boards?.map((b: IData) => {
                if (b.id === board.id) {
                    return { ...b, items: newItems };
                }
                if (b.id === currentBoard.id) {
                    return { ...currentBoard, items: currentBoard.items };
                }
                return b;
            }),
        );

        postData(newItems, board.id);
    };



  // const dropCardHandler = (e: React.DragEvent, board: IData) => {
  //   board.items.push(currentItem);
  //   const currentIndex = currentBoard.items.indexOf(currentItem);
  //   currentBoard.items.splice(currentIndex, 1);
  //   setBoards(
  //     boards?.map((b: IData) => {
  //       if (b.id === board.id) {
  //         return board;
  //       }
  //       if (b.id === currentBoard.id) {
  //         return currentBoard;
  //       }
  //       return b;
  //     }),
  //   );
  // };

  function dragEndHandler(e: React.DragEvent) {}
  function dragLeaveHandler(e: React.DragEvent) {}
  return (
    <>
      <Modal />

      {hasErrors && <div>Error...</div>}
      {loading && <div>Loading....</div>}


      <div style={{ display: "flex", flexDirection: "row" }}>
        {data?.map((board: IData) => (
          <Column
            key={board?.id}
            title={board?.title}
            onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
            onDrop={(e: React.DragEvent) => dropCardHandler(e, board)}
          >
            {board?.items.map((item: IItem) => (
              <TaskCard
                id={item?.id}
                key={item?.id}
                title={item?.taskName}
                description={item?.taskDescription}
                status={board?.title}
                tag={item?.tag}
                onDragStart={(e: React.DragEvent) =>
                  dragStartHandler(e, board, item)
                }
                onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                onDragLeave={(e: React.DragEvent) => dragLeaveHandler(e)}
                onDragEnd={(e: React.DragEvent) => dragEndHandler(e)}
              />
            ))}
          </Column>
        ))}
      </div>
    </>
  );
};

export default MainPage;
