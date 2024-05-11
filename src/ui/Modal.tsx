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



    .input {
        position: relative;
        //width: clamp(250px, 30vw, 800px);
        width: 95%;
        height: clamp(30px, 2vw, 56px);
        font-family: Inter sans-serif;
        font-size: 12px;
        font-weight: 400;
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
            font-family: Inter sans-serif;
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
const Tag = styled.span`
    padding: 5px;
    margin: 2px;
    background-color: #FFF6E1;
    color:#52565C;
    border-radius: 10px;
    display: inline-block;
`;
const Modal = () => {

    const { getData, postData, addTask, removeTask } = useStore();
    const [formValues, setFormValues] = useState(null)
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState('');

    const changeTaskName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTaskName((e.target as HTMLInputElement).value.trim());
    };

    // console.log('taskName', taskName)

    const changeTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTaskDescription((e.target as HTMLInputElement).value.trim());

    };

    // console.log('taskDescription', taskDescription)

    // const changeTag = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //     setTags((e.target as HTMLInputElement).value.trim());
    // };

    const handleAddTag = () => {
        if (inputTag && !tags.includes(inputTag)) {
            setTags([...tags, inputTag]);
            setInputTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: any) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    const onSubmit = () => {
        // e.preventDefault()
        let id = Date.now()
        const newFormValue = {
            id: id,
            taskName: taskName,
            taskDescription: taskDescription,
            tags: tags
        }

        // setFormValues(newFormValue)


        addTask(newFormValue)
        // Очистить поля ввода после отправки
        setTaskName('');
        setTaskDescription('');
        setTags([]);
        console.log('newFormValue', newFormValue)
        console.log('formValues', formValues)
    }





    const onReset = () => {
        setFormValues(null)
        setTaskName('')
        setTaskDescription('')
        setTags([]);
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
                    value={taskName}
                />
            </div>

            <h2>Description</h2>
            <form className={'taskDescription'}>
                <label style={{ opacity: 1, position: "absolute" }} htmlFor='taskDescription'>
                </label>
                <span className={"placeHolderSpan"}></span>
                <textarea
                    name={'textInput'}
                    className={'inputText'}
                    id='taskDescription'
                    onChange={changeTaskDescription}
                    value={taskDescription}

                />
            </form>

            <h3>Tags + </h3>
            <div>
                <label style={{ opacity: 1, position: "absolute" }} htmlFor='taskName'>
                </label>
                <span className={"placeHolderSpan"}></span>
                <input
                    type='text'
                    placeholder='Add a tag'
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <button onClick={handleAddTag}>+</button>

                <div>
                    {tags.map((tag, index) => (
                        <Tag key={index} onClick={() => handleRemoveTag(tag)}>
                            {tag} X
                        </Tag>
                    ))}
                </div>
            </div>


            <div className={'btns'}>
                <Button type={'submit'} children={'Save'} onClick={onSubmit} />
                <Button type={'button'} children={'Cancel'} onClick={(onReset)} />

            </div>

        </Container>
    );
};

export default Modal;