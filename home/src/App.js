import React from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress'
import logo from './logo.png'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} height="200" alt="20 Symptoms!"/>
      </header>

      <header className="App-body">
        <p1>Question 1:</p1>
        <p2>Do you have Coronavirus?</p2>
      </header>

      <header className="App-buttons">
        <Button variant="contained" color="secondary" size="large"> No </Button>
        <div class="divider" />
        <Button variant="contained" color="default" size="large"> I Don't Know </Button>
        <div class="divider" />
        <Button variant="contained" color="primary" size="large"> Yes </Button>
      </header>

      <header className="App-progress">
        <p>Progress: 1/20</p>
        <LinearProgress variant="determinate" value={5} color="secondary" />
      </header>
    </div>
  );
}

export default App;
