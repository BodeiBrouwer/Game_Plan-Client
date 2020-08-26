import React from 'react'

export default function TrainingCreate(props) {

    return (
        <form onSubmit={props.onSubmit}>
          <div>
            <p>What is the name of the training?*</p>
            <input name="name" type="text" placeholder="Training name"></input>
          </div>

          <div>
            <p>Give a description of the training*</p>
            <input name="description" type="text" placeholder="Description"></input>
          </div>

          <div>
            <p>What is the duration of the training in minutes?</p>
            <input name="duration" type="number" placeholder="Enter time"></input>
          </div>

          <div>
            <p>Notes on this training</p>
            <input name="notes" type="text" placeholder="What's on your mind?"></input>
          </div>

            <button type="submit">Create</button>
        </form>
    )
}