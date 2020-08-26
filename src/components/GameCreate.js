import React from 'react'

export default function GameCreate(props) {

    return (
        <form onSubmit={props.onSubmit}>
          <fieldset>
            <p>What type of game is it?*</p>
            <div>
              <input type="checkbox" name="gameType" value="warm-up"></input>
              <label for="Warm-up">Warm-up</label>
            </div>

            <div>
              <input type="checkbox" name="gameType" value="exercise"></input>
              <label for="exercise">Exercise</label>
            </div>

            <div>
              <input type="checkbox" name="gameType" value="scenes"></input>
              <label for="scenes">Scenes</label>
            </div>
          </fieldset>

          <div>
            <p>What is the name of the game?*</p>
            <input name="name" type="text" placeholder="Name of the game"></input>
          </div>

          <div>
            <p>Give a description of the game*</p>
            <input name="description" type="text" placeholder="Describe the game"></input>
          </div>

          <div>
            <p>What are the benefits of this game?</p>
            <input name="purpose" type="text" placeholder="Enter purpose"></input>
          </div>

          <div>
            <p>Do you wanna credit someone for this game?</p>
            <input name="credit" type="text" placeholder="Credit the mastermind"></input>
          </div>
          
          <div>
            <p>Feel free to add a link to a video that shows/explains this game</p>
            <input name="video" type="text" placeholder="Video URL"></input>
          </div>

            <button type="submit">Create</button>
        </form>
    )
}
