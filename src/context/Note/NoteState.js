import react, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props)=>{
    const notesInitial =[
        {
            "_id": "67aa6a82b9e84b1ec4f90ec6",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:14.436Z",
            "__v": 0
        },
        {
            "_id": "67aa6a85b9e84b1ec4f90ec5",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
        },
        {
            "_id": "67aa6a85b9e84b1ec4f90ec4",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
        },
        {
            "_id": "67aa6a85b9e84b1ec4f90ec3",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
        },
        {
            "_id": "67aa6a85b9e84b1ec4f90ec2",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
        },
        {
            "_id": "67aa6a85b9e84b1ec4f90ec1",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote = (title,description,tag) =>{
    //TODO API call
    console.log("Adding a new note")
    const note = {
        "_id": "67aa6a85b9e84b1ec4f90ec1",
            "user": "67a3a029e199b43775f9ba67",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-02-10T21:07:17.198Z",
            "__v": 0
    };
     setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = (id) =>{
        console.log("deleting the note with id" + id) 
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a note
    const editNote = (id,title,description,tag) =>{
        
    }
    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;