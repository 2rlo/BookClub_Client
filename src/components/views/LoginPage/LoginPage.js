import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDafault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate("/");
                } else {
                    alert("Error");
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label class="Email">Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} class="EmailBox"/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}
                class="PasswordBox"/>
                <br />
                <button class = "LoginBox">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage