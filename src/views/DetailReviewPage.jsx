import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import refresh from "../components/api/refresh";
import CommentList from "../components/CommentList/CommentList";

function DetailReviewPage() {
    const navigate = useNavigate();

    const [review, setReview] = useState({});
    const [profileImg, setProfileImg] = useState("");
    const [nickname, setNickname] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const { reviewId } = useParams();

    const clickEditButton = () => {
        navigate(`/edit/${review.id}`);
    }

    // const clickDeleteButton = async () => {
    //     await refresh.delete(`${process.env.REACT_APP_SERVER}/v1/posts/${postId}`, {
    //         headers: {
    //             "Authorization": `Bearer ${access_token}`
    //         }
    //     });
    // }

    const onClickCommentPost = async () => {
        await refresh.post(`/comments`, {
            "content": comment,
            "reviewId": reviewId,
        })
            .then((res) => {
                console.log(res);
                setComment("");
                window.location.replace(`/review/${reviewId}`);
            })
            .catch((err) => {
                console.log(err);
                // error code별 toast message
            })
    }

    // const onClickCommentChange = async() => {
    //     awaite refresh.put(`/comments`, {
    //         "commentId": commentId,
    //         "content": content,
    //     })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         // error code별 toast message
    //     })
    // }

    useEffect(() => {
        const getDetailReview = async () => {
            const res = await refresh.get(`/reviews/${reviewId}`);
            if (res != 'undefined' && res != null) {
                setReview(res.data.response);
                setProfileImg(res.data.response.writer.profileImg);
                setNickname(res.data.response.writer.nickname);
                setFileUrl(res.data.response.imgUrl);
            }
        }

        const getComment = async () => {
            await refresh.get(`/comments/${reviewId}`)
                .then((res) => {
                    console.log(res);
                    setComments(res.data.response);
                })
                .catch((err) => {
                    console.log(err);
                    // error code별 toast message
                })
        }
        getDetailReview();
        getComment();
    }, []);

    return (
        <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
            <div class="flex justify-between flex-col px-4 mx-auto max-w-screen-xl ">
                <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header class="mb-4 lg:mb-6 not-format">
                        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{review.title}</h1>
                        <address class="flex items-center mt-6 mb-6 not-italic">
                            <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img class="mr-4 w-16 h-16 rounded-full" src={profileImg} alt="profile Image" />
                                <div>
                                    <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{nickname}</a>
                                    <p class="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{review.createdDate}</time></p>
                                </div>
                            </div>
                        </address>
                    </header>
                    <figure><img src={fileUrl} alt="" className="w-full h-60 mt-6 object-contain"></img>
                    </figure>
                    <p class="lead mt-6">{review.content}</p>
                </article>
                <div className="mt-10 mx-auto">
                    <div className="flex flex-row justify-end max-w-2x1 w-full">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 mr-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 content-center justify-around" onClick={clickEditButton}>
                            Edit Review
                            <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto rounded-xl px-2 py-1 max-w-2xl mt-1 my-1 justify-evenly items-center flex-row">
                <textarea id="comment" rows="2" className="block p-2.5 mt-2 h-10 w-5/6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden" placeholder="댓글을 작성해주세요"  onChange={(event) => {
                    setComment(event.target.value);
                }}></textarea>
                <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
                    () => {
                        onClickCommentPost();
                    }
                }>Post</button>
            </div>
            <div className="flex mx-auto bg-white rounded-xl shadow-lg px-1 py-1 max-w-4xl mt-1 my-1 justify-start items-center flex-col">
                <div className="flex items-center space-x-4 w-full">
                    {
                        comments && <CommentList comments={comments}></CommentList>
                    }
                </div>
            </div>
        </main>
    )
}

export default DetailReviewPage;