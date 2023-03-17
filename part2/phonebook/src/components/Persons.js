import React from "react";

const Persons = ({ peopleToShow }) => {
    return (
    <div>
        {peopleToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
    )
};

export default Persons;