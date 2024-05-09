import React, { useEffect, useState } from 'react';
import useStore from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const { getData, data, loading, hasErrors } = useStore()

    useEffect(() => {
        getData()
    }, []);
    console.log(data)



    if (data.length < 2 && !data) {
        return <Modal />
    }

    const [boards, setBoards] = useState([
        { id: 1, title: "Not Started", items: [{ id: 1, title: "todo1" }, { id: 2, title: "todo2" }, { id: 3, title: "todo3" },] },
        { id: 2, title: "Ready", items: [{ id: 1, title: "ReadyTodo1" }, { id: 2, title: "Readytodo2" }, { id: 3, title: "Readytodo3" },] },
        { id: 3, title: "In progress", items: [{ id: 1, title: "Inprogresstodo1" }, { id: 2, title: "Inprogresstodo2" }, { id: 3, title: "Inprogresstodo3" },] },
        { id: 4, title: "Blocked", items: [{ id: 1, title: "Blockedtodo1" }, { id: 2, title: "Blockedtodo2" }, { id: 3, title: "Blockedtodo3" },] },
        { id: 5, title: "Done", items: [{ id: 1, title: "Donetodo1" }, { id: 2, title: "Donetodo2" }, { id: 3, title: "Donetodo3" },] },
        { id: 6, title: "Cancelled", items: [{ id: 1, title: "Cancelledtodo1" }, { id: 2, title: "Cancelledtodo2" }, { id: 3, title: "Cancelledtodo3" },] },
    ])

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
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

    }

    return (
        <>
            {/*<TaskCard description={'Description'} status={'Not started'} title={'Title'} tag={'tag3'} />*/}
            {/*<Column title={'Not Started'}/>*/}
            <Modal />

            {hasErrors && <div>Error...((</div>}
            {loading && <div>Loading....</div>}


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {boards.map((board) =>
                    <Column
                        key={board.id}
                        title={board.title}
                        onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                    >

                        {board.items.map((item) =>
                            <TaskCard
                                key={item.id}
                                title={item.title}
                                description={item.title}
                                status={item.title}
                                onDragStart={(e: React.DragEvent) => dragStartHandler(e, board, item)}
                                onDragOver={(e: React.DragEvent) => dragOverHandler(e)}
                                onDrop={(e: React.DragEvent) => dropHandler(e, board, item)}
                            />)}

                    </Column>)}
            </div>



            {/*<TaskCard title={data}*/}
            {/*          description={data}*/}
            {/*          status={data}*/}
            {/*          key={data}*/}
            {/*/>*/}



            {/*{data.map((t:any)=>*/}
            {/*    <TaskCard*/}
            {/*        title={t.data.taskName}*/}
            {/*        description={t.data.taskDescription}*/}
            {/*        status={t.data.tag}*/}
            {/*        key={t.data.id}*/}
            {/*    />)}*/}

            {/*<Column title={'test'}>*/}
            {/*    {data.map((t:any)=>*/}
            {/*        <TaskCard title={t.data.taskName}*/}
            {/*                  description={t.data.taskDescription}*/}
            {/*                  status={t.data.tag}*/}
            {/*                  key={t.data.id}*/}
            {/*        />)}*/}
            {/*</Column>*/}

        </>

    );
};

export default MainPage;