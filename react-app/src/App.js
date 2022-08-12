import Test from "./component/Test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Domanda from "./component/Domanda";
import React from 'react';
import CreateTest from "./component/CreateTest";
import InsertTest from "./component/InsertTest";
import CreaDomanda from "./component/CreaDomanda";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Test />}></Route>
          <Route path="/test/:id" element={<Domanda/>}></Route>
          <Route path="/createtest" element={<CreateTest/>}></Route>
          <Route path="/createtest/inserttest" element={<InsertTest/>}></Route>
          <Route path="/createquestion" element={<CreaDomanda/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
