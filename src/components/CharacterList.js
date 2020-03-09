import React from 'react';
import CharacterCard from './CharacterCard';

export default function CharacterList(props) {
  return (
    <React.Fragment>
      {
        props.data && props.data.map(data => <CharacterCard action={props.action} character={data} mutate={props.mutate} />)
      }
    </React.Fragment>
  )
}