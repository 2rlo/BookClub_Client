import React from "react";
import GroupItem from "./GroupItem";

function GroupList(props) {
    const { groups, onClickItem } = props;
    
    return (
        <div class = "flex-col items-start justify-center p-4 m-3 w-full">
            {groups.map((group, index) => {
                return (
                    <GroupItem
                        key = {group.clubId}
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