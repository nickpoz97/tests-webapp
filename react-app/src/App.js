import {BrowserRouter, Route, Routes} from "react-router-dom";
import AnswerQuestion from "./component/AnswerQuestion";
import React from 'react';
import CreateTest from "./component/CreateTest";
import displayInfo from "./utils/DisplayInfo";
import CreateQuestion from "./component/CreateQuestion";
import Result from "./component/result/Result";
import LoginPage from "./component/LoginPage";
import {ThemeProvider} from "@mui/material";
import {ResponsiveTheme} from "./Style/GlobalStyle";

function App() {
    return (
        <ThemeProvider theme={ResponsiveTheme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<LoginPage/>}></Route>
                        <Route path="/test/:id" element={<AnswerQuestion/>}></Route>
                        <Route path="/createtest" element={<CreateTest/>}></Route>
                        <Route path="/createtest/inserttest" element={<displayInfo/>}></Route>
                        <Route path="/createquestion" element={<CreateQuestion/>}></Route>
                        <Route path="/result/:nomeTest/:dataTest/:orarioTest" element={<Result/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
