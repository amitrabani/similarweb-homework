import styled from "styled-components";

export const ListContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: #000000bd;
  color: white;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 0 2rem;
  @media only screen and (max-width: 1200px) {
    width: 303px;
  }

  #inputContainer {
    display: flex;
    width: 100%;
  }
`
export const List = styled.ul`
  overflow-y: auto;
  height: 500px;
  width: 100%;

`
export const ListItem = styled.li`
  background: ${props => props.isCurrent ? '#ffffff3b' : '#00000045'};
  border: 1px solid #f5f5f552;
  font-family: "Roboto", "Arial", sans-serif;
  font-size: .7rem;
  padding: 0.5rem;
  font-weight: 500;
  overflow: hidden;
  margin: 0.3em 1rem;
  border-radius: 5px;
  height: 40px;
  display: flex;

  #iconContainer {
    cursor: pointer;
    width: 10%;
  }

  #textContainer {
    width: 90%
  }

  .text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    margin: 0;
  }
`

export const Input = styled.input`
  width: 100%;
  margin: 0.3rem 1rem;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const Button = styled.button`
  background-color: #2f2f2f;
  border: 3px solid transparent;
  border-radius: 10px;
  color: white;
  padding: 0.3rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 6px;
  cursor: pointer;
`