import NewNote from "./components/newnote"
import Notes from "./components/notes"
import VisibilityFilter from "./components/visibilityfilter";

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;