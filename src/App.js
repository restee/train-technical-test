import React from 'react';
import './App.css';
import CustomTypeahead from './Components/CustomTypeahead';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="col-sm4 col-md3 col-l2" style={{ marginTop: "50px" }}>
          <CustomTypeahead dropdownHeight="40vh" style={{fontSize:'20px'}}/>
        </div>
        <div>Input Username</div>
      </header>
    </div>
  );
}

export default App;
