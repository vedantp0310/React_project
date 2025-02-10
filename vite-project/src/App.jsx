import React, { useState } from 'react'
import Best from './Best'
import './app.css'

function App() {
  const [Counter, setCounter] = useState(0);

  const addCounter = () => {
    if (Counter < 20) {
      setCounter(Counter + 1);
    }
  };
  
  const removeCounter = () => {
    if (Counter > 0) {
      setCounter(Counter - 1);
    }
  };

  return (
    <>
       <h1>react project</h1>
       <p>counter no.: {Counter}</p>

       <button onClick={addCounter} className='s1'>add</button>
       <br />
       <button onClick={removeCounter} className='s2' style={{backgroundColor : 'black',color : 'white',padding : '10px'}}>remove</button>
    </>
  )
}

export default App
