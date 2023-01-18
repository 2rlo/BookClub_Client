import React from "react";
import axios from "axios";

function WriteUpPage() {
    const reviewPost = async () => {
        await axios.post(`${process.env.REACT_APP_SERVER}/v1/posts`,
            {
                "title": "PostTitle",
                "content": "this is post content",
                "categoryName": "Computer",
            },
        )
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <button onClick = {reviewPost}>Post</button>
        // book search -> book information
        // review text write
        // upload image button
        // post button
    )
}

export default WriteUpPage;