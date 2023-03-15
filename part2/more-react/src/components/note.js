import React from "react";

const Note = ({ note }) => { 
    return (
        <li>{note.content}, {note.important ? 'important' : 'who cares'}</li>
    )
}

export default Note