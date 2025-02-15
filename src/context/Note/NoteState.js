import react, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props)=>{
    const notesInitial =[
        {
            "_id": "67aa6a82b9e84b1ec4f90ec1",
            "user": "67a3a029e199b43775f9ba67",
            "title": "My title",
            "description": "Jeo to asy",
            "tag": "good",
            "date": "2025-02-10T21:07:14.436Z",
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
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;