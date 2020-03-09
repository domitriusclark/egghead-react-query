/** @jsx jsx */
import React from 'react';
import { css, jsx } from "@emotion/core";
import { useQuery, useMutation, queryCache } from 'react-query';

import CharacterList from './CharacterList';

export default function SearchCharacters() {
  const [input, setInput] = React.useState('');
  const [name, setName] = React.useState(null);

  function addCharacterToFavorites({ character }) {
    console.log(character)
    queryCache.setQueryData('favoriteCharacters', prevData => {
      if (prevData !== undefined) {
        if (prevData.some(data => data.id === character.id)) {
          throw new Error("This character exists");
        } else {
          return [...prevData, character]
        }
      } else {
        return [character]
      }
    });
  }

  function removeCharacterFromFavorites({ character }) {
    queryCache.setQueryData('favoriteCharacters', prevData => {
      return prevData.filter(data => data.id !== character.id)
    });
  }

  function fetchCharacter(key, { characterName }) {
    return fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
      .then(res => res.json());
  }

  const { data, status } = useQuery(name && ["character", { characterName: name }], fetchCharacter);

  function fetchFavoriteCharacters(key) {
    return queryCache.getQueryData('favoriteCharacters');
  }

  const { data: favoriteCharacters, status: favoriteCharactersStatus } = useQuery("favoriteCharacters", fetchFavoriteCharacters);

  const [addToFavorites] = useMutation(addCharacterToFavorites)
  const [removeFromFavorites] = useMutation(removeCharacterFromFavorites)

  if (favoriteCharactersStatus === "loading" || status === "loading") return <p>Loading...</p>

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;    
      color: white;
      height: auto;
      width: 100%;
    `}>
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: auto;
      `}>
        <div>
          <input css={css`
            height: 20px;
            width: 100px;
            border-radius: 4px 0 0 4px;
            border: none;
          `} onChange={e => setInput(e.target.value)} />
          <button css={css`
            border-radius: 0 4px 4px 0;
            height: 22px;
          `} onClick={() => setName(input)}>Search</button>
        </div>
        <div>
          <h2>Favorite Characters</h2>
        </div>
      </div>
      <div css={css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: auto;
        height: auto;
        padding: 0 50px 0 50px;
      `}>
        <div css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: auto;
        `}>
          {data && <CharacterList action="add" data={data.results} mutate={addToFavorites} />}
        </div>
        <div css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: auto;
        `}>
          {favoriteCharacters && <CharacterList action="remove" data={favoriteCharacters} mutate={removeFromFavorites} />}
        </div>
      </div>

    </div>

  )
}
