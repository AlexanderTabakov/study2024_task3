import React, {useEffect, useState} from 'react';
import useStore from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const{getData, data, loading,hasErrors} = useStore()

    useEffect(() => {
        getData()
    }, []);
    console.log(data)



    if(data.length < 2 && !data) {
        return <Modal/>
    }

    const [boards, setBoards] = useState([
        {id:1,title:"Not Started", items:[{id:1,title:"todo1"},{id:2,title:"todo2"}, {id:3,title:"todo3"},]},
        {id:2,title:"Ready", items:[{id:1,title:"ReadyTodo1"},{id:2,title:"Readytodo2"}, {id:3,title:"Readytodo3"},]},
        {id:3,title:"In progress", items:[{id:1,title:"Inprogresstodo1"},{id:2,title:"Inprogresstodo2"}, {id:3,title:"Inprogresstodo3"},]},
        {id:4,title:"Blocked", items:[{id:1,title:"Blockedtodo1"},{id:2,title:"Blockedtodo2"}, {id:3,title:"Blockedtodo3"},]},
        {id:5,title:"Done", items:[{id:1,title:"Donetodo1"},{id:2,title:"Donetodo2"}, {id:3,title:"Donetodo3"},]},
        {id:6,title:"Cancelled", items:[{id:1,title:"Cancelledtodo1"},{id:2,title:"Cancelledtodo2"}, {id:3,title:"Cancelledtodo3"},]},
    ])

    return (
        <>
            {/*<TaskCard description={'Description'} status={'Not started'} title={'Title'} tag={'tag3'} />*/}
            {/*<Column title={'Not Started'}/>*/}
            <Modal/>

            {hasErrors&&<div>Error...((</div>}
            {loading&&<div>Loading....</div>}


            <div style={{display:'flex', flexDirection:'row'}}>
                {boards.map((b)=><Column key={b.id} title={b.title}>
                    {b.items.map((i)=><TaskCard key={i.id} title={i.title} description={i.title} status={i.title}/>)}
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