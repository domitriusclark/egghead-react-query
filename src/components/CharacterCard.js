/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function CharacterCard(props) {

  function configureButtonSymbol() {
    if (props.action === 'add') {
      return "+"
    } else if (props.action === 'remove') {
      return "-"
    }
  }
  return (
    <div css={css`
    background: white;
    display: flex;
    justify-content: flex-start;
    width: 300px;
    height: 70px; 
    border: 1px solid gray;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    border-radius: 4px;
    
    img {
      height: 50px;
      width: 50px;
      border-radius: 360px;
      border: 1px solid black;
      margin-left: 5px;
    }
    
    p {
      font-size: 24px;
      padding-left: 10px;
      color: black;
    }
  
    button {
      border-radius: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 20px;
      align-self: flex-end;
      justify-self: right;
      margin: 0 5px 5px 0;
      color: ${props.action === 'add' ? 'green' : 'red'};
      border: 1px solid ${props.action === 'add' ? 'green' : 'red'};
      cursor: pointer;
      &:focus {
        border-radius: 360px;
      }
    }
  `}>
      <div css={css`
        display: flex;
        align-items: center;   
        flex-grow: 1;    
      `}>
        <img src={props.character.image} alt="Rick and Morty Character" />
        <p>{props.character.name}</p>

      </div>
      <button onClick={() => props.mutate({ character: props.character })}>{configureButtonSymbol()}</button>
    </div>
  )

};
