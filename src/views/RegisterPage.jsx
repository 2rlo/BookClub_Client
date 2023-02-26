import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleSignUpCallback from "../components/GoogleSignUp/GoogleSignUpCallBack";

function RegisterPage() {
    const navigate = useNavigate();

    const [nickname, setNickName] = useState("");

    const onClickRegister = async () => {
        await axios.post(`${process.env.REACT_APP_SERVER}/members/join`, {
            "nickname": nickname,
            "token": localStorage.getItem("google_token"),
        })
            .then((res) => {
                console.log(res);
                localStorage.setItem("accessToken");
                localStorage.setItem("refreshToken");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onChangeNickName = (e) => {
        setNickName(e.target.value);
    }

    return (
        <div class="flex items-center justify-center flex-col mt-80">
            <form>
                <div class="mb-6">
                    <label for="nickname" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Your nickname</label>
                    <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={onChangeNickName} />
                </div>
                <div class="flex flex-row-reverse mr-1">
                    <button type="button" onClick={onClickRegister} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none rightfocus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;