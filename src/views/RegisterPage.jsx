import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleSignUpCallback from "../components/GoogleSignUp/CoocleSignUpCallBack";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage] = useState("");
    const [nickName, setNickName] = useState("");

    useEffect(() => {
        postUserToken();

        console.log(userImage);
    }, []);

    const postUserToken = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER}/v1/users/me`, {
        })
            .then((res) => {
                console.log(res);
                setName(res.data.response.name);
                setEmail(res.data.response.email);
                setUserImage(res.data.response.profileImg);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onChangeNickName = (e) => {
        setNickName(e.target.value);
    }

    return (
        <div class = "flex items-center justify-center flex-col mt-40">
            <div class="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mb-6">
                {userImage != "" ? <img class="absolute w-22 h-22" src={userImage}></img> : <svg class="absolute w-22 h-22 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>}
            </div>

            <form>
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={name} disabled readonly />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={email} disabled readonly />
                </div>
                <div class="mb-6">
                    <label for="nickname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Nickname</label>
                    <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={onChangeNickName} />
                </div>
                <div class="flex flex-row-reverse mr-1">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none rightfocus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;