import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import refresh from "../api/refresh";

function EditGroupModal({ setInfoModalOpen, clubId }: PropsType) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [info, setInfo] = useState("");
    const [max, setMax] = useState("");
    const [link, setLink] = useState("");

    const [authToast, setAuthToast] = useState(false);
    const [maxErrToast, setMaxErrToast] = useState(false);

    const closeModal = () => {
        setInfoModalOpen(false);
    }

    const showAuthToast = () => {
        setAuthToast(true);
    }

    const showMaxErrToast = () => {
        setMaxErrToast(true);
    }

    useEffect(() => {
        getClubInfo();
    }, [])

    const getClubInfo = async () => {
        await refresh.get(`/clubs/${clubId}`)
            .then((res) => {
                console.log(res);
                setName(res.data.response.name);
                setInfo(res.data.response.information);
                setMax(res.data.response.max);
                setLink("");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickSubmit = async () => {
        await refresh.put(`/clubs`, {
            "clubId": clubId,
            "name": name,
            "information": info,
            "max": max,
            "link": link,
        }
        )
            .then((res) => {
                console.log(res);
                navigate(`/group/${clubId}/0`);

                if (res.data.response.error.errorCode === "CLUB_NO_AUTH") {
                    showAuthToast();
                }
                else if (res.data.response.error.errorCode === "CLUB_MAX_TOO_SMALL") {
                    showMaxErrToast();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        setLink(`localhost:3000/${name}`);
    }

    const onChangeInfo = (e) => {
        e.preventDefault();
        setInfo(e.target.value);
    }

    const onChangeMax = (e) => {
        e.preventDefault();
        setMax(e.target.value);
    }

    return (
        <>
            <div id="makeGroupModal" class="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Group Info
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="makeGroupModal" onClick={() => {
                                closeModal()
                            }}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div class="grid gap-4 mb-4 sm:grid-cols-4 sm:grid-row-4 items-start justify-items-center">
                                <div class="col-start-1 col-end-5 row-start-1 row-end-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="공백 없이 작성" onChange={onChangeName} value={name}></input>
                                </div>
                                <div class="col-start-1 col-end-5 row-start-2 row-end-3">
                                    <label for="limit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of people</label>
                                    <input type="text" name="limit" id="limit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1 이상" onChange={onChangeMax} value={max}></input>
                                </div>
                                <div class="col-start-1 col-end-5 row-start-3 row-end-5">
                                    <label for="information" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" rows="5" class="block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500dark:focus:border-blue-500" onChange={onChangeInfo} value={info}></textarea>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onClickSubmit}>
                                    Edit Group Info
                                </button>
                                <button type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {authToast &&
                <div id="toast-warning" class="flex items-center w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-5 left-5" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Warning icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal w-72">해당 클럽에 접근할 수 있는 권한이 없습니다.</div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 " data-dismiss-target="#toast-warning" aria-label="Close" onClick={
                        () => {
                            setAuthToast(false);
                        }
                    }>
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>}
                {maxErrToast &&
                <div id="toast-warning" class="flex items-center w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-5 left-5" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Warning icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal w-72">최대 가입 인원이 현재 가입 인원보다 적습니다.</div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 " data-dismiss-target="#toast-warning" aria-label="Close" onClick={
                        () => {
                            setMaxErrToast(false);
                        }
                    }>
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>}
        </>
    )
}

export default EditGroupModal;

