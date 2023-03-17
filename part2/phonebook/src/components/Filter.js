import React from 'react';

const Filter = ({ search, onChange }) => {
    return (
        <div>Name: <input value={search} name="search" onChange={onChange}/></div>
    );
};

export default Filter;