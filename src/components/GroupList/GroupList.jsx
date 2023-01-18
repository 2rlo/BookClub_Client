import React from "react";
import GroupItem from "./GroupItem";

function GroupList(props) {
    const { groups, onClickItem } = props;
    
    return (
        <div class = "flex-col items-start justify-center p-16 m-3">
            {groups.map((group, index) => {
                return (
                    <GroupItem
                        key = {group._id}
                        group = {group}
                        onClick = {() => {
                            onClickItem(group);
                        }}
                        />
                );
            })}
        </div>
    );
}

export default GroupList;