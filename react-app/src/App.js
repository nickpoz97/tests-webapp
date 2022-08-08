import AppBar from "./component/Appbar";
import Test from "./component/Test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestDetail from "./component/TestDetail"
import React from 'react';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Test />}></Route>
          <Route path="/test/:id" element={<TestDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
////

  /*
      <AppBar></AppBar>
      <Test></Test>
      */