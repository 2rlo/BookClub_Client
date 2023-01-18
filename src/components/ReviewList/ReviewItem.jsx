import React from "react";

function ReviewItem(props) {
    const { onClick, review } = props;
    console.log(review);

    return (
        <div className="px-9 py-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-5" onClick = {onClick}>
            <div>
                <div className="text-xl font-medium text-black">{review.title}</div>
                <p className="text-slate-500">{review.writerName}</p>
                <p className="text-slate-500">{review.createdDate}</p>
            </div>
        </div>

    )
}

export default ReviewItem;