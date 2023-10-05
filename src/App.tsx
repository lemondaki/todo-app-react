import React from 'react';
import { Todo } from './features/Todo/Todo';
import './App.css';
function App(): JSX.Element {
  return (
    <div className='app custom-shadow '>
      <Todo></Todo>
    </div>
  );
}

export default App;
