import React from "react";

function CommentItem(props) {
    const { onClick, comment } = props;

    const onClickCommentEdit = async () => {

    }

    return (
        <div className="px-9 py-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-5 flex-col justify-between" onClick = {onClick}>
            <div className = "flex flex-row w-full justify-between">
                <div className="text-slate-500">{comment.writerName}</div>
                <p className="text-slate-500">{comment.createdDate}</p>
                </div>
                <div className = "w-full items-center m-0 flex flex-row justify-between">
                <p className="text-lg font-medium text-black m-0">{comment.content}</p>
                <button type="submit" className="text-blue-700 bg-gray-50 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mt-2 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
                    () => {
                        onClickCommentEdit();
                    }
                }>Edit</button>
            </div>
        </div>

    )
}

export default CommentItem;