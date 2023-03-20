import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DetailReviewPage from "./views/DetailReviewPage";
import EditReviewPage from "./views/EditReviewPage";
import GoogleLoginCallbackPage from "./views/GoogleLoginCallbackPage";
import GoogleSignUpCallbackPage from "./views/GoogleSignUpCallbackPage";
import GroupPage from "./views/GroupPage";
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
import MyPage from "./views/MyPage";
import RegisterPage from "./views/RegisterPage";
import WriteUpPage from "./views/WriteUpPage";

function App() {
  const access_token = localStorage.getItem("access_token");

  return (
    <Router>
      <Navbar></Navbar>
      {access_token === null ? (
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/registerCallback"
              element={<GoogleSignUpCallbackPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/callback" element={<GoogleLoginCallbackPage />} />
          </Routes>
        </div>
      ) : (
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/callback" element={<GoogleLoginCallbackPage />} />
            <Route
              path="/registerCallback"
              element={<GoogleSignUpCallbackPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/group/:clubId/:reviewPage" element={<GroupPage />} />
            <Route path="/mypage/:reviewPage" element={<MyPage />} />
            <Route path="/post/:clubId" element={<WriteUpPage />} />
            <Route path="/review/:reviewId" element={<DetailReviewPage />} />
            <Route path="/edit/:groupId/:postId" element={<EditReviewPage />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
