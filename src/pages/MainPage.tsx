import React, { useEffect, useState } from 'react';
import useStore, { IData, IItem } from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const { getData, data, loading, hasErrors, removeTask, postData } = useStore()


    if (data.length < 2 && !data) {
        return <Modal />
    }

    const [boards, setBoards] = useState(null)
    useEffect(() => {
        setBoards(data)
    }, [data]);
    console.log(data[0].items)


    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    const dragStartHandler = (e: React.DragEvent, board: any, item: any) => {
        setCurrentBoard(board);
        setCurrentItem(item);
        e.dataTransfer.effectAllowed = "move";
    };



    const dragOverHandler = (e: React.DragEvent) => {
        e.preventDefault();
    };
    //TODO Типизировать функцию

    const dropHandler = (e: React.DragEvent, board: any, item: any) => {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map((b: IData) => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    // function dropCardHandler(e: React.DragEvent, board: any) {
    //     e.preventDefault()

    //     board.items.push(currentItem)
    //     const currentIndex = currentBoard.items.indexOf(currentItem)
    //     currentBoard.items.splice(currentIndex, 1)
    //     setBoards(boards.map(b => {
    //         if (b.id === board.id) {
    //             return board
    //         }
    //         if (b.id === currentBoard.id) {
    //             return currentBoard
    //         }
    //         return b
    //     }));
    //     // (e.target as HTMLDivElement).style.boxShadow = 'none';
    // }
    const dropCardHandler = (e: React.DragEvent, board: IData) => {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards?.map((b: IData) => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

    }

    function dragEndHandler(e: React.DragEvent) {
    };
    function dragLeaveHandler(e: React.DragEvent) {

    };
    return (
        <>
            <Modal />

            {hasErrors && <div>Error...</div>}
            {loading && <div>Loading....</div>}


            <button onClick={()=>postData(currentBoard)}>TESTPOST</button>


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {data?.map((board: IData) =>
                    <Column
                        key={board?.id}
                        title={board?.title}
                        onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                        onDrop={(e: React.DragEvent) => dropCardHandler(e, board)}
                    >
                        {board?.items.map((item: IItem) =>
                            <TaskCard
                                id={item?.id}
                                key={item?.id}
                                title={item?.taskName}
                                description={item?.taskDescription}
                                status={board?.title}
                                tag={item?.tag}
                                onDragStart={(e: React.DragEvent) => dragStartHandler(e, board, item)}
                                onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                                // onDrop={(e: React.DragEvent) => dropHandler(e, board, item)}
                                onDragLeave={(e: React.DragEvent) => dragLeaveHandler(e)}
                                onDragEnd={(e: React.DragEvent) => dragEndHandler(e)}
                            />)}

                    </Column>)}
            </div>

        </>

    );
};

export default MainPage;