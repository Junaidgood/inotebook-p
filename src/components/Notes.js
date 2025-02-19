import React, {useContext} from 'react'

import Noteitem from './Noteitem';
import Addnote from './Addnote';
import noteContext from '../context/Note/NoteContext';

const Notes = () => {
    const context = useContext(noteContext)
  const {notes} = context;
  return (
    <>
    
    <div className="row my-3">
      <h1>Your Notes</h1>
      {
        notes.map((note)=>{
        return <Noteitem key={note._id} note={note}/>
      })}
      
      </div>
      </>
  )
}

export default Notes