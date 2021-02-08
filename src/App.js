import React, { useState } from 'react';
import './App.css';
import CustomTypeahead from './CustomTypeahead';




function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div className="col2" style={{ marginTop: "50px" }}>
          <CustomTypeahead />
        </div>
        <div>Input Username</div>
      </header>
    </div>
  );
}

export default App;
