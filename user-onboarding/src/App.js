import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import Form from './Form.js';


function App() {
  return (
    <div className="App">
     <Form/>
    </div>
  );
}

export default App;
