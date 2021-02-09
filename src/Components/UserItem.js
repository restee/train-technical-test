import React from 'react';
import '../App.css';



function UserItem(props) {
    return (
        <div>
            <div
                className="DropDownItem"
                onClick={() => { props.onItemClicked(props.value) }}>
                <img src={props.value.avatar_url} className="DropDownImage" />
                <p className="DropDownUsername">{props.value.login}</p>
            </div>
            <div className="DropDownDivider" />
        </div>
    );
}

export default UserItem;