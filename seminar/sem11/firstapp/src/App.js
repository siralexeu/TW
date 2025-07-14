import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import _ from "lodash"
import ListItem from './components/ListItem';
import Counter from './components/Counter';

function App() {

  const [state, setState] = 
  useState({
    chores: [
      {
        id: 1,
        name: "Take out trash",
        description: "Trash removal from both bins",
        completed: true
      },
      {
        id: 2,
        name: "Do the Dishes",
        description: "Wash and dry the dishes",
        completed: false
      },
      {
        id: 3,
        name: "Walk the Dog",
        description: "Take dog around the block 2 times",
        completed: true
      }
    ]
  })

  function handleOnClick(id){
    const chores = _.cloneDeep(state.chores);

    for (let chore of chores){
      if (chore.id === id){
        chore.completed = !chore.completed;
        break;
      }
    }
    
    setState({chores});
  }

  const [state2, setState2] = useState(true)

  function mountCounter(){
    setState2(true);
  }

  function unmountCounter(){
    setState2(false);
  }

  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(r => r.json())
    .then(data => setApi(data))
  }, [])

  return (
    <div className="App">

      {JSON.stringify(api)}
      
      <h1> Chores</h1>

      <ul>
        {state.chores.map(chore => (
          <ListItem
          key={chore.id}
          id={chore.id}
          name={chore.name}
          completed={chore.completed}
          description={chore.description}
          handleOnClick={handleOnClick}
          />
        )
        )}
      </ul>

      <div>
        <button onClick={mountCounter} disabled={state2}>Mount Counter</button>
        <button onClick={unmountCounter} disabled={!state2}>Mount Counter</button>
        {state2 ? <Counter/> : null}
      </div>

    </div>
  );
}

export default App;