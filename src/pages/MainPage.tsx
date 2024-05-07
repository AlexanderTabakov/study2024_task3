import React, {useEffect} from 'react';
import useStore from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const{getData, data, loading,hasErrors} = useStore()

    useEffect(() => {

        getData()
        // setTimeout(getData, 500)
    }, []);
    console.log(data)

    // if(loading) {
    //     return <div>Loading...</div>
    // }

    if(hasErrors){
        return <div>An error has occurred (((</div>
    }

    if(data.length < 2 && !data) {
        return <Modal/>
    }

    return (
        <>

            {/*<TaskCard description={'Description'} status={'Not started'} title={'Title'} tag={'tag3'} />*/}
            {/*<Column title={'Not Started'}/>*/}
            <Modal/>

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