import React from 'react'
import SelectSearch from 'react-select-search'

export default function SearchGames() {
  const options = [
    {name: 'Warm-ups', value: 'warm-up'},
    {name: 'Exercises', value: 'exercise'},
    {name: 'Scenes', value: 'scenes'}
  ];


  return (
    <div>
    <SelectSearch
      closeOnSelect={false}
      className="select-search select-search--multiple"
      options={options}
      value=''
      multiple
      printOptions="on-focus"
      placeholder="Game types"
    />    
    </div>
  )
}
