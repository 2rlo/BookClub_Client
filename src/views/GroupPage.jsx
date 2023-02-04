import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/ReviewList/ReviewList";

function GroupPage() {
    const navigate = useNavigate();

    const user_token = localStorage.getItem("user_token");

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllPosts();
    },[]);

    const getAllPosts = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER}/v1/posts?size=10&page=0&sort=createdDate,desc`, {
            headers: {
                "Authorization": "Bearer " + user_token
            }
        })
            .then((res) => {
                console.log(res);
                console.log(res.data.response.content);
                setReviews(res.data.response.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <ReviewList reviews={reviews}
                onClickItem={(item) => {
                    navigate(`/post/${item.id}`)
                }}></ReviewList>
        </div>
    )
}

export default GroupPage;