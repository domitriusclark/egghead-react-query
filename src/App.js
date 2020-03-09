/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SearchCharacters from './components/SearchCharacters';

function App() {
  return (
    <div css={css`
      background: #757580;
      display: flex;
      justify-content: center;
      height: 100vh;
      width: 100%;
      overflow: auto;
    `}>
      <div css={css`
        width: 80%;
        height: auto;    
      `}>
        <SearchCharacters />
      </div>

    </div>
  )
}

export default App;
