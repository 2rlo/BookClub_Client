import React, { useEffect, useState } from "react";
import axios from "axios";
import refresh from "../components/api/refresh";
import NicknameModal from "../components/myPage/NicknameModal";

function MyPage() {

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [profileUrl, setProfileUrl] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        await refresh.get(`${process.env.REACT_APP_SERVER}/members/me`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then((res) => {
                console.log(res);
                setNickname(res.data.response.nickname);
                setEmail(res.data.response.email);
                setProfileUrl(res.data.response.profileUrl);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onClickChangeNickname = () => {
        setModalOpen(true);
        console.log("modal open");
    }

    return (
        // my information
        // information edit button
        // my review list
        <>
            <div className="flex mx-auto bg-white rounded-xl h-32 shadow-lg px-9 py-6 max-w-4xl mt-36 my-5 justify-between items-center">
                <div className="flex items-center space-x-4 ">
                    <div className="shrink-0">
                        <img className="h-12 w-12" src={profileUrl} alt={nickname} />
                    </div>
                    <div>
                        <div className="text-xl font-medium text-black">{nickname}</div>
                        <p className="text-slate-500">{email}</p>
                    </div>
                </div>
                <div>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-around" onClick={onClickChangeNickname}>
                        Change Nickname </button>
                </div>
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 translate-y-1/2">
                {modalOpen && <NicknameModal
                    old_nickname={nickname}
                />}
            </div>
        </>
    )
}

export default MyPage;