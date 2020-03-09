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
      margin-bottom: 20px;
    `}>
      <div css={css`
        display: flex;
        align-items: center;
      `}>
        <img css={css`
          height: 70px;
          width: 70px;
          border-radius: 360px;
        `} src={props.character.image} alt="Rick and Morty Character" />
        <p>{props.character.name}</p>
        <button onClick={() => props.mutate({ character: props.character })}>{configureButtonSymbol()}</button>
      </div>
    </div>
  )

};
