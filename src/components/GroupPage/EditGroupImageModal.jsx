import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import refresh from "../api/refresh";

function EditGroupImageModal({ setImgModalOpen, clubId }: PropsType) {
    const navigate = useNavigate();

    const [img, setImg] = useState("");
    const [preview, setPreview] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const fileRef = useRef();

    const formData = new FormData();

    const [authToast, setAuthToast] = useState(false);

    const closeModal = () => {
        setImgModalOpen(false);
    }

    const showAuthToast = () => {
        setAuthToast(true);
    }

    useEffect(() => {
        if (img !== '')
            setPreview(<img src={previewURL}></img>);
        return () => {

        }
    }, [previewURL]);

    useEffect(() => {
        getClubInfo();
    }, []);


    const getClubInfo = async () => {
        await refresh.get(`/clubs/${clubId}`)
            .then((res) => {
                console.log(res);
                setImg(res.data.response.imgUrl);
                setPreviewURL(res.data.response.imgUrl);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickSubmit = async () => {
        formData.append("img", new Blob([img]));

        await refresh.put(`/clubs/${clubId}`, formData
        )
            .then((res) => {
                console.log(res);
                if (res.data.success === "true") {
                    closeModal();
                    window.location.replace(`/group/${clubId}/0`);
                }
                else if (res.data.response.error.errorCode === "CLUB_NO_AUTH") {
                    showAuthToast();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFileOnChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = (e) => {
            setImg(file);
            setPreviewURL(reader.result);
        }
        if (file)
            reader.readAsDataURL(file);
    }

    const handleFileButtonClick = (e) => {
        e.preventDefault();
        fileRef.current.click();
    }

    return (
        <>
            <div id="makeGroupModal" class="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Group Image
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="makeGroupModal" onClick={() => {
                                closeModal()
                            }}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div class="flex flex-col items-center">
                                <aside>
                                    <input ref={fileRef} hidden={true} id="file" type="file" onChange={handleFileOnChange}></input>
                                    <div>
                                        <img src={previewURL} class="w-36 h-36 rounded-full border-gray-200 border-2"></img>
                                        <button class="absolute z-1 w-8 h-8 top-44 left-40 rounded-full" onClick={handleFileButtonClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="23px" height="23px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet" class="flex items-center justify-center">
                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                    <path d="M4208 4898 c-21 -5 -58 -28 -82 -50 -68 -59 -76 -96 -76 -360 l0 -218 -216 0 c-125 0 -234 -5 -259 -11 -27 -7 -63 -28 -90 -51 -112 -98 -88 -275 46 -342 53 -26 54 -26 285 -26 l232 0 4 -242 3 -243 28 -47 c71 -121 234 -142 332 -44 59 60 65 90 65 350 l0 226 226 0 c260 0 290 6 350 65 98 98 77 261 -44 332 l-47 28 -242 3 -243 4 0 233 0 233 -28 53 c-46 89 -149 134 -244 107z" />
                                                    <path d="M1905 4260 c-170 -26 -263 -79 -441 -252 -79 -77 -157 -144 -177 -153 -29 -12 -84 -15 -267 -15 -261 0 -329 -10 -445 -65 -125 -60 -228 -162 -291 -288 -73 -145 -69 -60 -69 -1362 l0 -1170 28 -82 c54 -161 169 -295 317 -373 144 -74 25 -70 1785 -70 1754 0 1639 -4 1785 68 110 54 223 168 279 282 72 148 71 128 71 1023 0 699 -2 802 -16 835 -33 79 -110 132 -194 132 -88 0 -152 -38 -193 -115 -22 -40 -22 -45 -27 -852 l-5 -811 -30 -44 c-17 -23 -51 -54 -75 -68 l-45 -25 -1551 0 -1551 0 -48 30 c-36 22 -57 45 -77 84 l-28 53 0 1109 c0 1215 -3 1148 58 1212 58 61 73 64 357 70 284 5 325 12 439 69 83 41 121 72 261 209 67 66 136 125 157 133 32 14 102 16 471 16 l433 0 53 26 c90 45 134 140 110 238 -16 67 -85 138 -151 154 -53 13 -837 15 -923 2z" />
                                                    <path d="M2165 3184 c-388 -69 -703 -341 -831 -716 -55 -164 -68 -388 -30 -559 92 -418 436 -751 853 -824 656 -114 1253 383 1253 1045 0 177 -36 332 -113 485 -101 202 -298 393 -500 485 -200 90 -427 121 -632 84z m334 -429 c85 -20 204 -84 274 -146 71 -63 149 -179 176 -261 58 -179 49 -328 -31 -497 -57 -120 -169 -232 -289 -289 -169 -80 -318 -89 -497 -31 -82 27 -198 105 -261 176 -62 70 -126 189 -146 274 -19 82 -19 228 0 304 57 224 242 411 465 469 72 19 229 19 309 1z" />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </aside>
                                <div class="flex items-center space-x-4 mt-5">
                                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onClickSubmit}>
                                        Edit Image
                                    </button>
                                </div>
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
        </>
    )
}

export default EditGroupImageModal;

