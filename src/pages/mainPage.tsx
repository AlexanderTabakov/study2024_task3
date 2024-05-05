import React, {useEffect} from 'react';
import useStore from "store";
import TaskCard from "ui/TaskCard";


const MainPage = () => {

    const{getData, data} = useStore()

    useEffect(() => {
        getData()
    }, []);

    return (
        <>

            <TaskCard/>
        {/*<div>*/}
        {/*    {data.map((d:any)=>*/}
        {/*        <div key={d.id} > {d.dishName}</div>*/}
        {/*    )}*/}
        {/*</div>*/}
        </>

    );
};

export default MainPage;