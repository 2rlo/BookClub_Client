import React from "react";
import GroupList from "../components/GroupList/GroupList";
import groups from "../data/group.json";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    return (
        // user's group list
        <GroupList
            groups={groups}
            onClickItem={(item) => {
                navigate(`/group/${item._id}`);
            }}
        />
        // or group creat button
    )
}

export default MainPage;