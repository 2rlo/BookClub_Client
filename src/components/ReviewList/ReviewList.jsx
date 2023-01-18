import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewList(props) {
    const { reviews, onClickItem } = props;
    console.log(reviews);

    return (
        <div class = "flex-col items-start justify-center p-16 m-3">
            {reviews.map((review, index) => {
                return (
                    <ReviewItem
                        key = {review.id}
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