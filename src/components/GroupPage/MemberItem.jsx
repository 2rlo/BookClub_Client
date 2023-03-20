import React from "react";

function MemberItem(props) {
    const { member } = props;

    return (
        <div className="px-9 py-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-5">
            <div>
                <div className="text-xl font-medium text-black">{member}</div>
            </div>
        </div>

    )
}

export default MemberItem;