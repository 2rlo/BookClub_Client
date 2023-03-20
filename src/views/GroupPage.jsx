import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/ReviewList/ReviewList";
import refresh from "../components/api/refresh";
import EditGroupModal from "../components/GroupPage/EditGroupModal";
import EditGroupImageModal from "../components/GroupPage/EditGroupImageModal";
import ViewMembersModal from "../components/GroupPage/ViewMembersModal";
import useDetectClose from "../hooks/useDetectClose";

function GroupPage() {
    const navigate = useNavigate();

    const access_token = localStorage.getItem("access_token");

    const [clubInfo, setClubInfo] = useState([]);
    const [reviews, setReviews] = useState([]);

    const { clubId, reviewPage } = useParams();

    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [imgModalOpen, setImgModalOpen] = useState(false);
    const [memberModalOpen, setMemberModalOpen] = useState(false);
    const [fullMemberToast, setFullMemberToast] = useState(false);
    const [duplicatedMemberToast, setDuplicatedMemberToast] = useState(false);
    const [page, setPage] = useState([1, 2, 3, 4, 5]);
    const [length, setLength] = useState("");

    const [isOpen, ref, handler] = useDetectClose(false);

    const [preview, setPreview] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const fileRef = useRef();

    const pageRef = useRef();

    const showInfoModal = () => {
        setInfoModalOpen(true);
    }

    const showImgModal = () => {
        setImgModalOpen(true);
    }

    const showMemberModal = () => {
        setMemberModalOpen(true);
    }

    const showFullMemberToast = () => {
        setFullMemberToast(true);
    }

    const showDuplicatedMemberToast = () => {
        setDuplicatedMemberToast(true);
        console.log("show d");
    }

    useEffect(() => {
        getClubInfo();
        getAllPosts();
    }, []);

    useEffect(() => {
        getAllPosts();
    }, [reviewPage]);

    const getClubInfo = async () => {
        await refresh.get(`/clubs/${clubId}`)
            .then((res) => {
                console.log(res);
                setClubInfo(res.data.response);
                console.log(clubInfo.imgUrl);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickJoin = async () => {
        await refresh.get(`/clubs/new/${clubId}`)
            .then((res) => {
                console.log(res);
                if (res.data.error.errorCode == "CLUB_DUPLICATED_MEMBER") {
                    showDuplicatedMemberToast();
                }
                else if (res.data.error.errorCode == "CLUB_FULL_MEMBER") {
                    showFullMemberToast();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getAllPosts = async () => {
        await refresh.get(`/reviews/club/${clubId}?size=10&page=${reviewPage}&sort=createdDate,desc`)
            .then((res) => {
                console.log(res);
                console.log(res.data.response);
                setReviews(res.data.response.reviews);
                setLength(res.data.response.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onClickPre = () => {
        if (page[0] === 1) {
        }
        else {
            setPage([page[0] - 5, page[1] - 5, page[2] - 5, page[3] - 5, page[4] - 5]);
        }
    }

    const onClickNext = () => {
        if ((length / 10) < 5) {
        }
        else {
            setPage([page[0] + 5, page[1] + 5, page[2] + 5, page[3] + 5, page[4] + 5]);
        }
    }

    const onClickPage = (page) => {
        navigate(`/group/${clubId}/${page - 1}`);
    }

    return (
        <>
            <div>
                <div className="px-9 py-6 max-w-7xl h-44 mx-auto bg-white rounded-xl shadow-lg grid gap-2 grid-cols-6 grid-rows-5 space-x-4 my-5 items-center">
                    <div class=" col-start-6 col-end-7 row-start-1 row-end-2 px-4 pt-4 justify-self-end self-end">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" onClick={handler} ref={ref}>
                            <span class="sr-only">Open dropdown</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        </button>
                        <div id="dropdown" class={isOpen ? "z-10 absolute top-32 visible text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 " : "z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 "}>
                            <ul class="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={
                                        () => {
                                            showInfoModal();
                                        }
                                    }>Edit Infomation</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={
                                        () => {
                                            showImgModal();
                                        }
                                    }>Edit Image</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-2 row-start-2 row-end-6 justify-self-center">
                        <img className="h-24 w-24" src={clubInfo.imgUrl + "?" + new Date().getTime()} alt={clubInfo.name} />
                    </div>

                    <div className="col-start-2 col-end-6 row-start-2 row-end-4 text-2xl font-bold text-black">{clubInfo.name}</div>
                    <p className="col-start-2 col-end-6 row-start-4 row-end-5 text-slate-500">{clubInfo.hostName}</p>
                    <p className="col-start-2 col-end-6 row-start-5 row-end-6 text-slate-500">{clubInfo.information}</p>


                    <div className="col-start-6 col-end-7 row-start-2 row-end-4 justify-self-center">
                        <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center w-32 text-blue-700 bg-gray-50 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={
                            () => {
                                showMemberModal();
                            }
                        }>View Members</a></div>
                    <div className="col-start-6 col-end-7 row-start-4 row-end-6 justify-self-center">
                        <a class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center w-32 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
                            () => {
                                onClickJoin();
                            }
                        }>Join Club</a></div>

                </div>
                <div className="flex mx-auto bg-white rounded-xl shadow-lg px-9 py-6 max-w-7xl mt-1 my-1 justify-start items-center flex-col">
                    <div className="flex w-full justify-end">
                        <a class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center w-32 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
                            () => {
                                navigate(`/post/${clubId}`);
                            }
                        }>Post Review</a></div>
                    {length === 0 ? <a className="inline-flex items-center justify-center font-medium text-lg py-6">첫번째 리뷰를 작성해주세요!</a> : <div className="flex items-center space-x-4 w-full">
                        {
                            reviews && <ReviewList reviews={reviews}
                                onClickItem={(item) => {
                                    navigate(`/review/${item.reviewId}`)
                                }}></ReviewList>
                        }
                    </div>}

                    <nav aria-label="Page navigation">
                        <ul class="inline-flex items-center -space-x-px">
                            <li>
                                <a class="z-0 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickPre();
                                }}>
                                    <span class="sr-only">Previous</span>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                {reviewPage == page[0] - 1 ? <a aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => {
                                    onClickPage(page[0])
                                }}>{page[0]}</a> : <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickPage(page[0])
                                }}>{page[0]}</a>
                                }
                            </li>
                            <li>
                                {reviewPage == page[1] - 1 ? <a aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => {
                                    onClickPage(page[1])
                                }}>{page[1]}</a> : length / 10 < 1 ? <a class="hidden"></a> :
                                    <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                        onClickPage(page[1])
                                    }}>{page[1]}</a>
                                }
                            </li>
                            <li>
                                {reviewPage == page[2] - 1 ? <a aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => {
                                    onClickPage(page[2])
                                }}>{page[2]}</a> : length / 10 < 2 ? <a className="hidden"></a> : <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickPage(page[2])
                                }}>{page[2]}</a>
                                }
                            </li>
                            <li>
                                {reviewPage == page[3] - 1 ? <a aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => {
                                    onClickPage(page[3])
                                }}>{page[3]}</a> : length / 10 < 2 ? <a className="hidden"></a> : <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickPage(page[3])
                                }}>{page[3]}</a>
                                }
                            </li>
                            <li>
                                {reviewPage == page[4] - 1 ? <a aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => {
                                    onClickPage(page[4])
                                }}>{page[4]}</a> : length / 10 < 3 ? <a className="hidden"></a> : <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickPage(page[4])
                                }}>{page[4]}</a>
                                }
                            </li>
                            <li>
                                <a class="z-0 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => {
                                    onClickNext()
                                }}>
                                    <span class="sr-only">Next</span>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="absolute top-28 left-1/2 -translate-x-1/2">
                {infoModalOpen && <EditGroupModal setInfoModalOpen={setInfoModalOpen} clubId={clubId}></EditGroupModal>}
            </div>
            <div class="absolute top-28 left-1/2 -translate-x-1/2">
                {imgModalOpen && <EditGroupImageModal setImgModalOpen={setImgModalOpen} clubId={clubId}></EditGroupImageModal>}
            </div>
            <div class="absolute top-28 left-1/2 -translate-x-1/2">
                {memberModalOpen && <ViewMembersModal setModalOpen={setMemberModalOpen} clubId={clubId}></ViewMembersModal>}
            </div>
            {duplicatedMemberToast &&
                <div id="toast-warning" class="flex items-center w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-5 left-5" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Warning icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal w-72">같은 클럽에 중복으로 가입할 수 없습니다.</div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close" onClick={
                        () => {
                            setDuplicatedMemberToast(false);
                        }
                    }>
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>}
            {fullMemberToast &&
                <div id="toast-warning" class="flex items-center w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-5 left-5" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Warning icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal w-72">클럽의 최대 인원을 초과하였습니다.</div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 " data-dismiss-target="#toast-warning" aria-label="Close" onClick={
                        () => {
                            setFullMemberToast(false);
                        }
                    }>
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>}
        </>
    )
}

export default GroupPage;