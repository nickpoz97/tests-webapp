import AppBar from "./component/Appbar";
import Test from "./component/Test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestDetail from "./component/TestDetail"
import Domanda from "./component/Domanda";
import React from 'react';
import CreateTest from "./component/CreateTest";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Test />}></Route>
          <Route path="/test/:id" element={<Domanda/>}></Route>
          <Route path="/createtest" element={<CreateTest/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
