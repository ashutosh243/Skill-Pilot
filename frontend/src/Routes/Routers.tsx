import { Routes,Route } from "react-router-dom";
import React from 'react';
import Home from '../pages/Home';
import LoginPage from "../pages/Loginpage.js";
import RegisterPage from "../pages/RegisterPage";
import PathGenerate from '../pages/pathGenerate';
import InterviewQuestion from "../pages/interviewQuestion.js";
import Path from '../pages/Path.js';
import ViewPath from "../pages/ViewPath.js";

const Routers:React.FC=()=>{

    return <>
         <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/path-generate' element={<PathGenerate/>}></Route>
            <Route path='/interview-question' element={<InterviewQuestion/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/path' element={<Path></Path>}></Route>
            <Route path="/view/:id" element={<ViewPath/>}></Route>
         </Routes>
    </>

}
export default Routers;