import React from 'react';
import './App.css';

import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>TODOs</h1>
      </div>
      <div className="Spacer"></div>
      <Table></Table>
    </div>
  );
}

export default App;
