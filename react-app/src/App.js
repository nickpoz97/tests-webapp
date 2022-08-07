import AppBar from "./component/Appbar";
import Test from "./component/Test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestDetail from "./component/TestDetail"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />}>
            <Route path="/test/1" element={<TestDetail></TestDetail>}></Route>
          </Route>
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