import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import refresh from "../api/refresh";

function NicknameModal({ setModalOpen, old_nickname }) {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState(old_nickname);

    const closeModal = () => {
        setModalOpen(false);
    }

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    }

    const changeNickname = async () => {
        await refresh.put(`${process.env.REACT_APP_SERVER}/members/me`,{
            "nickname": nickname,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then((res) => {
                console.log(res);
                window.location.replace("/mypage");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div id="info-popup">
            <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                    <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                        <h3 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Nickname Change</h3>
                        <div class="mb-6">
                            <label for="nickname" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Your nickname</label>
                            <input type="text" id="text" value={nickname}class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={onChangeNickname} />
                        </div>
                    </div>
                    <div class="justify-end items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                        <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                            <button id="close-modal" type="button" class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            <button id="confirm-button" type="button" class="py-2 px-4 w-full text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg sm:w-auto focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"onClick = {changeNickname}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NicknameModal;