import React, {useEffect} from 'react';
import useStore from "store";
import TaskCard from "ui/TaskCard";
import Column from "ui/Column";
import Modal from "ui/Modal";


const MainPage = () => {

    const{getData, data} = useStore()

    useEffect(() => {
        getData()
    }, []);

    return (
        <>

            {/*<TaskCard description={'Description'} status={'Not started'} title={'Title'} tag={'tag3'} />*/}
            {/*<Column title={'Not Started'}/>*/}
            <Modal/>

        {/*<div>*/}
        {/*    {data.map((d:any)=>*/}
        {/*        <div key={d.id} > {d.dishName}</div>*/}
        {/*    )}*/}
        {/*</div>*/}
        </>

    );
};

export default MainPage;