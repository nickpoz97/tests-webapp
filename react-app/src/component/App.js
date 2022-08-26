import {BrowserRouter, Route, Routes} from "react-router-dom";
import Domanda from "./Domanda";
import React from 'react';
import CreateTest from "./CreateTest";
import InsertTest from "./InsertTest";
import CreaDomanda from "./CreaDomanda";
import Appbar from "./Appbar";
import Result from "./Result";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Appbar logoutCallback={props.logoutCallback}/>}></Route>
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
