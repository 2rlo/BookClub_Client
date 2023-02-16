import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// book information
// book image, title, description, author, genre
// review text
// recommend book (top 3)

// reply write          
// reply write button
// reply list

function DetailReviewPage() {
    const navigate = useNavigate();

    const access_token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("userId");

    const [review, setReview] = useState({});
    const [writer, setWriter] = useState([]);
    const [fileUrl, setFileUrl] = useState("");

    const { postId } = useParams();

    const clickEditButton = () => {
        navigate(`/edit/${review.id}`);
    }

    const clickDeleteButton = async () => {
        await axios.delete(`${process.env.REACT_APP_SERVER}/v1/posts/${postId}`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
    }

    useEffect(() => {
        const getDetailReview = async () => {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/v1/posts/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
            if (res != 'undefined' && res != null) {
                setReview(res.data.response);
                setWriter(res.data.response.writerInfo);
                setFileUrl(res.data.response.files[0].fileUrl);
            }
        }
        getDetailReview();
    }, []);

    console.log(review);

    return (
        <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
            <div class="flex justify-between flex-col px-4 mx-auto max-w-screen-xl ">
                <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header class="mb-4 lg:mb-6 not-format">
                        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{review.title}</h1>
                        <address class="flex items-center mt-6 mb-6 not-italic">
                            <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img class="mr-4 w-16 h-16 rounded-full" src={writer.profileImg} alt="profile Image" />
                                <div>
                                    <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{writer.name}</a>
                                    <p class="text-base font-light text-gray-500 dark:text-gray-400">{review.categoryName}</p>
                                    <p class="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{review.createdDate}</time></p>
                                </div>
                            </div>
                        </address>
                    </header>
                    <p class="lead mt-6">{review.content}</p>
                    <figure><img src={fileUrl} alt="" className="w-full h-60 mt-6 object-contain"></img>
                    </figure>
                </article>
                <div className="flex flex-row justify-end mt-10 mr-10">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 mr-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 content-center justify-around" onClick={clickEditButton}>
                        Edit Review
                        <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-around" onClick={clickDeleteButton}>
                        Delete Review
                        <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default DetailReviewPage;