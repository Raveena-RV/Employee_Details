// src/App.js

import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management Application</h1>
        <EmployeeForm />
      </header>
    </div>
  );
}

export default App;
