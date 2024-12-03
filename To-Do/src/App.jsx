import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [toDo, setToDo] = useState([]);
  const [completed, setCompleted] = useState([]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setToDo([...toDo, search]);
    setSearch("");
  }

  function moveUp(i) {
    if (i > 0) {
      const newToDo = [...toDo];
      [newToDo[i - 1], newToDo[i]] = [newToDo[i], newToDo[i - 1]];
      setToDo(newToDo);
    } else {
      console.log("Already at top.");
    }
  }

  function moveDown(i) {
    if (i !== toDo.length - 1) {
      const newToDo = [...toDo];
      [newToDo[i], newToDo[i + 1]] = [newToDo[i + 1], newToDo[i]];
      setToDo(newToDo);
    } else {
      console.log("Already at bottom.");
    }
  }

  function removeToDo(i) {
    const newToDo = [...toDo];
    newToDo.splice(i, 1);
    setToDo(newToDo);
  }

  function removeCompleted(i) {
    const newCompleted = [...completed];
    newCompleted.splice(i, 1);
    setCompleted(newCompleted);
  }

  function done(i) {
    const completedTask = toDo[i];
    if (completed.includes(completedTask)) {
      console.log("Already completed");
    } else {
      setCompleted([...completed, completedTask]);
      removeToDo(i);
    }
  }

  function handleClear() {
    setToDo([]);
    setCompleted([]);
  }

  return (
    <div className='container'>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={handleChange}
          placeholder='What needs to get done?'
        />
        <button type='submit' id='submitButton'>Submit</button>
      </form>

      <h2>To Do</h2>
      <ul className='toDoContainer'>
        {toDo.map((element, index) => (
          <li key={index} className='toDoItems'>
            <div>
              {element}
              <button onClick={() => done(index)}>✓</button>
              <button onClick={() => removeToDo(index)}>x</button>
              <button onClick={() => moveUp(index)}>↑</button>
              <button onClick={() => moveDown(index)}>↓</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul className='completedContainer'>
        {completed.map((element, index) => (
          <li key={index} className='completedItems'>
            <div>
              {element}
              <button onClick={() => removeCompleted(index)}>x</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleClear}>Clear All</button>
    </div>
  );
}

export default App;
