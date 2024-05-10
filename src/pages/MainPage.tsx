import React, { useEffect, useState } from 'react';
import useStore, {IData, IItem} from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const { getData, data, loading, hasErrors } = useStore()


    if (data.length < 2 && !data) {
        return <Modal />
    }

    // const [boards, setBoards] = useState([
    //     { id: 1, title: "Not Started", items: [{ id: 1, title: "todo1" }, { id: 2, title: "todo2" }, { id: 3, title: "todo3" },] },
    //     { id: 2, title: "Ready", items: [{ id: 1, title: "ReadyTodo1" }, { id: 2, title: "Readytodo2" }, { id: 3, title: "Readytodo3" },] },
    //     { id: 3, title: "In progress", items: [{ id: 1, title: "Inprogresstodo1" }, { id: 2, title: "Inprogresstodo2" }, { id: 3, title: "Inprogresstodo3" },] },
    //     { id: 4, title: "Blocked", items: [{ id: 1, title: "Blockedtodo1" }, { id: 2, title: "Blockedtodo2" }, { id: 3, title: "Blockedtodo3" },] },
    //     { id: 5, title: "Done", items: [{ id: 1, title: "Donetodo1" }, { id: 2, title: "Donetodo2" }, { id: 3, title: "Donetodo3" },] },
    //     { id: 6, title: "Cancelled", items: [{ id: 1, title: "Cancelledtodo1" }, { id: 2, title: "Cancelledtodo2" }, { id: 3, title: "Cancelledtodo3" },] },
    // ])

    const [boards, setBoards] = useState(null)
    useEffect(() => {
        setBoards(data)
    }, [data]);
    console.log(data)


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
        setBoards(boards.map((b:IData) => {
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
        setBoards(boards?.map((b:IData) => {
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


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {data?.map((board:IData) =>
                    <Column
                        key={board?.id}
                        title={board?.title}
                        onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                        onDrop={(e: React.DragEvent) => dropCardHandler(e, board)}
                    >
                        {board?.items.map((item:IItem) =>
                            <TaskCard
                                key={item?.id}
                                title={item?.title}
                                description={item?.title}
                                status={board?.title}
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