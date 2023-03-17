import React from "react";

const Filter = ({ searchQ, setSearchQ }) => {
    return (
    <div>
        filter shown with <input value={searchQ} onChange={(event) => setSearchQ(event.target.value)} />
    </div>
    )
}

export default Filter;