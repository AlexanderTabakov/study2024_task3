import React from 'react';
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    width: clamp(63px, 10vw, 126px);
    height: clamp(57px,8vw, 114px );
    border: blue 3px solid;
    box-shadow: 0px 1px 4px 0px #00000040;

`

const TaskCard = () => {
    return (
        <Container>
            <div className={'title'}></div>
            <div className={'description'}></div>
            <div className={'status'} ></div>
            <div className={'tag'}></div>
        </Container>
    );
};

export default TaskCard;