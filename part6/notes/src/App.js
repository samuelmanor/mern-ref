import NewNote from "./components/newnote"
import Notes from "./components/notes"
import VisibilityFilter from "./components/visibilityfilter";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;