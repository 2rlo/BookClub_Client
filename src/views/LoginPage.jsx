import React from "react";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLoginButton";
import GoogleSignUpButton from "../components/GoogleSignUp/GoogleSIgnUpButton";
import GoogleLoginErrorModal from "../components/GoogleLogin/GoogleLoginErrorModal";

function LoginPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-60">
                <GoogleLoginButton></GoogleLoginButton>
                <GoogleSignUpButton></GoogleSignUpButton>
            </div>
        </>

    )
}

export default LoginPage;