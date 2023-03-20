import React from "react";
import CommentItem from "./CommentItem";

function CommentList(props) {
    const { comments, onClickItem } = props;

    return (
        <div class = "flex-col items-start justify-center p-4 m-3 w-full">
            {comments.map((comment, index) => {
                return (
                    <CommentItem
                        key = {comment.commentId}
                        comment = {comment}
                        onClick = {() => {
                            onClickItem(comment);
                        }}
                        />
                );
            })}
        </div>
    );
}

export default CommentList;