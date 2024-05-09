import React from 'react';
import styled from "styled-components";

interface IColumn {
    title: string
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    // onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 95vh;
    width:clamp(170px, 10vw, 256px);
    .title{
        font-family: Inter sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        text-align: left;        

    }
    
    .taskColumn {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 24px;
        border-radius:8px;
        background: #EBEBFF;
        border: 1px solid #D6D8DB

    }
    
`

const Column: React.FC<IColumn> = ({ title, children, onDrop, onDragOver }) => {

    const handleColor = () => {
        if (title === "Not Started") {
            return "#F8FAFC";
        }

        if (title === "Ready") {
            return "#EBEBFF";
        }
        if (title === 'In progress') {
            return '#E3F3FC'
        }
        if (title === 'Blocked') {
            return '#FBE7E5'
        }
        if (title === 'Done') {
            return '#EEF8E8'
        }
        if (title === 'Cancelled') {
            return '#ECEDEF'
        }
    }



    return (
        <Container>
            <h2 className={'title'}>{title}</h2>
            <div className={'taskColumn'}>
                {children}
            </div>

        </Container>
    );
};

export default Column;