import React, { useState } from 'react';
import styled from "styled-components";
import Button from './Button';
import useStore from "store";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    background-color: #FFFFFF;
    padding: 8px 13px;
    border-radius: 4px;
    
    width: clamp(230px, 20vw, 464px );
    height: clamp(220px, 29vw, 440px );
    box-shadow: 0 1px 4px 0 #00000040;
    
    h3{
    font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        color:#6C6C6C ;
    }
    
    h2{
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 16px;
    }



    .input {
        position: relative;
        //width: clamp(250px, 30vw, 800px);
        width: 95%;
        height: clamp(30px, 2vw, 56px);
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;        
        line-height: 14px;
        text-align: left;
        border: none;
        box-shadow: 0 4px 4px 0 #3333330a;
    }

    .placeHolderSpan {
        position: absolute;
        opacity: 1;
    }
    :focus {
        box-shadow: 0 4px 24px 0 #3333333d;
        border: none;
    }
    
    &:focus-within {
        .placeHolderSpan {
            position: absolute;
            opacity: 1;
            font-size: 10px;
            bottom: 2px;
        }
    }

    .taskDescription {
        width: 95%;
        height: 173px ;
        .inputText{
            width: 95%;
            height: 95%;
            resize: none;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 14px;
            text-align: left;
            border: none;
            box-shadow: 0 4px 4px 0 #3333330a;
            &:focus {
                box-shadow: 0 4px 24px 0 #3333333d;
                border: none;
            }
        }
    }
    
    .btns{
        display: flex;
        align-items: center;
        gap: 5px;
    } 
    
`

const Modal = () => {

    const { getData, postData,addTask, removeTask } = useStore();
    const [formValues, setFormValues] = useState(null)
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [tag, setTag] = useState('')

    const changeTaskName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTaskName((e.target as HTMLInputElement).value.trim());
    };

    // console.log('taskName', taskName)

    const changeTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTaskDescription((e.target as HTMLInputElement).value.trim());

    };

    // console.log('taskDescription', taskDescription)

    const changeTag = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTag((e.target as HTMLInputElement).value.trim());
    };


    const onSubmit = (e: Event) => {
        e.preventDefault()
        let id = Date.now()
        const newFormValue = {
            id: id,
            taskName: taskName,
            taskDescription: taskDescription,
            tag: tag
        }

        // setFormValues(newFormValue)


        addTask(newFormValue)
        // Очистить поля ввода после отправки
        setTaskName('');
        setTaskDescription('');
        setTag('');
        console.log('newFormValue', newFormValue)
        console.log('formValues', formValues)
    }





    const onReset = () => {
        setFormValues(null)
        setTaskName('')
        setTaskDescription('')
        setTag('')
    }




    return (
        <Container>
            <h2>Create task</h2>
            <div>
                <label style={{ opacity: 1, position: "absolute" }} htmlFor='taskName'>
                </label>
                <span className={"placeHolderSpan"}></span>
                <input
                    name={'taskName'}
                    className={'input'}
                    type='text'
                    id='taskName'
                    onChange={changeTaskName}
                />
            </div>

            <h3>Description</h3>
            <form className={'taskDescription'}>
                <label style={{ opacity: 1, position: "absolute" }} htmlFor='taskDescription'>
                </label>
                <span className={"placeHolderSpan"}></span>
                <textarea
                    name={'textInput'}
                    className={'inputText'}
                    id='taskDescription'
                    onChange={changeTaskDescription}
                />
            </form>

            <h3>Tags + </h3>
            <div>
                <label style={{ opacity: 1, position: "absolute" }} htmlFor='taskName'>
                </label>
                <span className={"placeHolderSpan"}></span>
                <input
                    name={'titleTag'}
                    className={'input'}
                    type='text'
                    id='titleTag'
                    value={tag}
                    onChange={changeTag}
                />
                <span><button>+</button></span>
            </div>

            <div className={'btns'}>
                <Button type={'submit'} children={'Save'} onClick={() => onSubmit(event)} />
                <Button type={'button'} children={'Cancel'} onClick={() => onReset()} />

            </div>

        </Container>
    );
};

export default Modal;