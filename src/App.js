import React, { useState } from 'react';
import './App.css';
import CustomTypeahead from './CustomTypeahead';




function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '30%', marginTop: "50px" }}>
          <CustomTypeahead />
        </div>
        <div>text below</div>
      </header>
    </div>
  );
}

export default App;
