import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_action/user_action';
import {useNavigate} from "react-router-dom";
import './RegisterPage.css';

function RegisterPage(props){
    const dispatch = useDispatch("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSumitHandler = (event) => {
        event.preventDefault();
    
        if(Password !== ConfirmPassword){
          return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
    
        let body = {
          email: Email,
          password: Password,
          telephone: Telephone
        }
    
        dispatch(registerUser(body))
        .then(response => {
          if(response.payload.success){
            navigate("/login")
          }else
          {
            alert('Failed to sign up')
          }
        })
    
      }

      return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
          }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
              onSubmit={onSumitHandler}>
              <label>Adress e-mail</label>
              <input type="email" value={Email} onChange={onEmailHandler} class="activatedInput"/>
              
              <label>Telephone</label>
              <input type="tel" value={Telephone} onChange={onTelephoneHandler} class="Input"/>
        
              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHandler} class="Input"/>
              
              <label>Confirm Password</label>
              <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} class="Input"/>
        
              <br />
              <button class="Button">
                Sign in
              </button>
            </form>
          </div>
      )
}

export default RegisterPage