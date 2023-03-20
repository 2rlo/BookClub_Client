import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewList(props) {
    const { reviews, onClickItem } = props;
    
    return (
        <div class = "flex-col items-start justify-center p-4 m-3 w-full">
            {reviews.map((review, index) => {
                return (
                    <ReviewItem
                        key = {review.reviewId}
                        review = {review}
                        onClick = {() => {
                            onClickItem(review);
                        }}
                        />
                );
            })}
        </div>
    );
}

export default ReviewList;