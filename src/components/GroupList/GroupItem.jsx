import React from "react";

function GroupItem(props) {
    const { onClick, group } = props;
    console.log(group);

    return (
        <div className="px-9 py-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-5" onClick = {onClick}>
            <div className="shrink-0">
                <img className="h-12 w-12" src={group.image} alt={group.name} />
            </div>
            <div>
                <div className="text-xl font-medium text-black">{group.name}</div>
                <p className="text-slate-500">{group.description}</p>
            </div>
        </div>

    )
}

export default GroupItem;