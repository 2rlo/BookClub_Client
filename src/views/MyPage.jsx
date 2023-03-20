import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import refresh from "../components/api/refresh";
import NicknameModal from "../components/myPage/NicknameModal";
import GroupList from "../components/GroupList/GroupList";
import ReviewList from "../components/ReviewList/ReviewList";
import CommentList from "../components/CommentList/CommentList";

function MyPage() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [clubs, setClubs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState([1, 2, 3, 4, 5]);
    const [length, setLength] = useState("");

    const { reviewPage } = useParams();


    useEffect(() => {
        getUserInfo();
        getClubList();
        getCommentList();
    }, []);

    useEffect(() => {
        getReviewList();
    }, [reviewPage]);

    const getUserInfo = async () => {
        await refresh.get(`${process.env.REACT_APP_SERVER}/members/me`)
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

    const getClubList = async () => {
        await refresh.get(`${process.env.REACT_APP_SERVER}/clubs/me`)
            .then((res) => {
                console.log(res);
                setClubs(res.data.response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getReviewList = async () => {
        await refresh.get(`/reviews/me?size=10&page=${reviewPage}&sort=createdDate,desc`)
            .then((res) => {
                console.log(res);
                setReviews(res.data.response.reviews);
                setLength(res.data.response.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getCommentList = async () => {
        await refresh.get(`/comments/me`)
            .then((res) => {
                console.log(res);
                setComments(res.data.response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickChangeNickname = () => {
        setModalOpen(true);
    }

    const onClickPre = () => {
        if (page[0] === 1) {
        }
        else {
            setPage([page[0] - 5, page[1] - 5, page[2] - 5, page[3] - 5, page[4] - 5]);
        }
    }

    const onClickNext = () => {
        if((length/10) < 5){
        }
        else {
        setPage([page[0] + 5, page[1] + 5, page[2] + 5, page[3] + 5, page[4] + 5]);
        }
    }

    const onClickPage = (page) => {
        navigate(`/mypage/${page - 1}`);
    }

    return (
        <>
            <div className="flex mx-auto bg-white rounded-xl h-32 shadow-lg px-9 py-6 max-w-4xl mt-36 my-5 justify-between items-center">
                <div className="flex items-center space-x-4 ">
                    <div className="shrink-0">
                        <img className="h-12 w-12" src={profileUrl + "?" + new Date().getTime()} alt={nickname} />
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
            <div className="flex mx-auto bg-white rounded-xl shadow-lg px-9 py-6 max-w-4xl mt-1 my-1 justify-start items-center flex-col">
                <div className="text-2xl font-bold text-black">My Clubs</div>
                <div className="flex items-center space-x-4 w-full">
                    <GroupList
                        groups={clubs}
                        onClickItem={(item) => {
                            navigate(`/group/${item.clubId}/0`);
                        }}
                    />
                </div>
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 translate-y-1/2">
                {modalOpen && <NicknameModal
                    old_nickname={nickname}
                />}
            </div>
            <div className="flex mx-auto bg-white rounded-xl shadow-lg px-9 py-6 max-w-4xl mt-3 my-4 justify-start items-center flex-col">
                <div className="flex items-center space-x-4 w-full">
                    {
                        reviews && <ReviewList reviews={reviews}
                            onClickItem={(item) => {
                                navigate(`/review/${item.reviewId}`)
                            }}></ReviewList>
                    }
                </div>
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
            <div className="flex mx-auto bg-white rounded-xl shadow-lg px-9 py-6 max-w-4xl mt-3 my-4 justify-start items-center flex-col">
                <div className="flex items-center space-x-4 w-full">
                    {
                        comments && <CommentList comments={comments}></CommentList>
                    }
                </div>
            </div>
        </>
    )
}

export default MyPage;