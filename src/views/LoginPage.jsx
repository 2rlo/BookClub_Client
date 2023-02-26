import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLoginButton";
import GoogleSignUpButton from "../components/GoogleSignUp/GoogleSIgnUpButton";
import GoogleLoginErrorModal from "../components/GoogleLogin/GoogleLoginErrorModal";

function LoginPage() {
    const navigate = useNavigate();

    const access_token = localStorage.getItem("access_token");

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-64 relative">
                <GoogleLoginButton></GoogleLoginButton>
                <GoogleSignUpButton></GoogleSignUpButton>
            </div>
        </>

    )
}

export default LoginPage;