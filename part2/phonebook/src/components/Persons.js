import React from "react";

const Persons = ({ peopleToShow, delPerson }) => {
    return (
    <div>
        {peopleToShow.map(person => 
        <div key={person.name}>
            <p key={person.name}>{person.name} {person.number}</p>
            <button onClick={() => delPerson(person)}>delete</button>
        </div>
        )}
    </div>
    )
};

export default Persons;