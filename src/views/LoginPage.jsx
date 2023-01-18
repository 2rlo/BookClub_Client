import React from "react";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLoginButton";
import GoogleSignUpButton from "../components/GoogleSignUp/GoogleSIgnUpButton";

function LoginPage() {
    return (
        <div className="justify-center flex pt-96 pb-80 flex-col items-center">
            <GoogleLoginButton></GoogleLoginButton>
            <GoogleSignUpButton></GoogleSignUpButton>
        </div>
        // google sign up button
    )
}

export default LoginPage;