import {BrowserRouter, Route, Routes} from "react-router-dom";
import Domanda from "./component/Domanda";
import React from 'react';
import CreateTest from "./component/CreateTest";
import InsertTest from "./component/InsertTest";
import CreaDomanda from "./component/CreaDomanda";
import Result from "./component/Result";
import LoginPage from "./component/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/test/:id" element={<Domanda/>}></Route>
          <Route path="/createtest" element={<CreateTest/>}></Route>
          <Route path="/createtest/inserttest" element={<InsertTest/>}></Route>
          <Route path="/createquestion" element={<CreaDomanda/>}></Route>
          <Route path="/result/:nomeTest/:dataTest/:orarioTest" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
