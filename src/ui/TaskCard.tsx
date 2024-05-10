import React from 'react';
import styled from "styled-components";
import handleColor from './Column'

interface ITaskCard {
    title: string,
    description: string,
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
    padding: 3px;    
    border-radius: 4px;
    width: clamp(63px, 10vw, 126px);
    height: clamp(57px,8vw, 114px );
    box-shadow: 0 1px 4px 0 #00000040;
    background-color:white;
    //cursor: -webkit-grab;
    //cursor: -moz-grab;
    //cursor: -o-grab;
    //cursor: -ms-grab;
    cursor: grab;
    
    
    .title{
        font-family: Inter,sans-serif;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        
    }
    
    .description {
        display: flex;    
        font-family: Inter, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
        
    }
    
    .status{
        display: flex;
        align-items: center;
        padding: 3px;
        width: fit-content;
        background-color:gray;
        //background-color: gray;
        border-radius: 10px;
        font-family: Inter, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;

        .dot{
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
        font-family: Inter, sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
        background-color: #FFF6E1;
        border-radius: 10px;
        padding: 3px;

    }
    
    

`

const TaskCard: React.FC<ITaskCard> = ({ title, description, tag, status, onDrop, onDragStart, onDragOver }) => {

    const handleColor = () => {
        if (status === "Not Started") {
            return "#F8FAFC";
        }

        if (status === "Trending") {
            return "red";
        }
        return "green";
    };

    return (
        <Container draggable={true}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
        >
            <div className={'title'}> <h3> {title} </h3> </div>
            <div className={'description'}>  <p> {description}</p>  </div>
            <div className={'status'}>
                <div className={'dot'}></div>
                <p> {status}</p></div>
            <div className={'tagLayout'}>
                <p className={'tag'}> {tag}</p>
            </div>
        </Container >
    );
};

export default TaskCard;