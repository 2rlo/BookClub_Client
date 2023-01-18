import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import DetailReviewPage from "./views/DetailReviewPage";
import GoogleLoginCallbackPage from './views/GoogleLoginCallbackPage';
import GroupPage from "./views/GroupPage";
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
import MakeGroupPage from "./views/MakeGroupPage";
import MyPage from "./views/MyPage";
import RegisterPage from "./views/RegisterPage";
import WriteUpPage from "./views/WriteUpPage";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className = "mt-28">
      <Routes>
        <Route path="/" element = {<MainPage/>}/>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/callback" element = {<GoogleLoginCallbackPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/group" element={<GroupPage/>}/>
        <Route path="/makeGroup" element={<MakeGroupPage/>}/>
        <Route path="/mypage/:userId" element={<MyPage/>}/>
        <Route path="/post" element={<WriteUpPage/>}/>
        <Route path="/post/:postId" element={<DetailReviewPage/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
