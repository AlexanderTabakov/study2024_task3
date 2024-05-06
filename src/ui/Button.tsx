import React from "react";
import styled from "styled-components";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    type?: "button" | "reset" | "submit" | undefined;
    isDisabled?: boolean;
    onClick?: () => void;
}

const ButtonPrimary = styled.button`
  bottom: 40px;
  width: fit-content;
  min-width: 7vw;
  height: 42px;
  background-color: #6e41e2;
  color: white;
  border: none;
  border-radius: 3px;
  font-style: normal;
  font-weight: 400;
  font-size: clamp(5px, 1vw, 15px);
  line-height: 17px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #5835b0;
  }
  &:active {
    background-color: #472c8a;
  }
  &:focus {
    background-color: #6e41e2;
  }
  &:disabled {
    background-color: #e3daf9;
  }
`;

const ButtonSecondary = styled.button`
  bottom: 40px;
  //width: clamp(30px, 5vw, 96px);
  width: fit-content;
  min-width: 7vw;
  height: 42px;
  background-color: white;
  color: #6e41e2;
  border: #6e41e2 solid 2px;
  border-radius: 3px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: clamp(5px, 1vw, 15px);
  line-height: 17px;
  cursor: pointer;

  &:hover {
    background-color: #6e41e20a;
  }

  &:active {
    background-color: #e7e4ec;
    opacity: 14%;
  }

  &:focus {
    background-color: rgba(183, 172, 172, 0.48);
  }

  &:disabled {
    background-color: #764ae8;
  }
`;

const Button: React.FC<IButtonProps> = ({
                                            name,
                                            type,
                                            isDisabled,
                                            onClick,
                                            children,
                                        }) => {
    return (
        <>
            {type == "submit" ? (
                <ButtonPrimary
                    onClick={onClick}
                    type={type}
                    name={name}
                    disabled={isDisabled}
                >
                    {" "}
                    {children} {name}{" "}
                </ButtonPrimary>
            ) : (
                <ButtonSecondary
                    onClick={onClick}
                    type={type}
                    name={name}
                    disabled={isDisabled}
                >
                    {" "}
                    {children} {name}{" "}
                </ButtonSecondary>
            )}
        </>
    );
};

export default Button;