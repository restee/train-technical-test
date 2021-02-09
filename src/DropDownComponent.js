import React from 'react';
import useSWR from "swr";
import './App.css';

const fetcher = url => fetch(url).then(res => res.json());
const defaultHeight = '30vh';

function DropdownResults({ height, user, width, show, onItemSelected}) {

    const { data, error } = useSWR(
        user ? `https://api.github.com/search/users?q=${user}` : null,
        fetcher
    );

    const onItemClicked = value => {
        onItemSelected(value);
    };


    if (!height)
        height = defaultHeight;

    if (!user || error || !show) {
        return null;
    }

    const itemViews = [];

    if (data && !error) {
        var entries = data.items != undefined ? data.items.entries() : [];
        for (const [index, value] of entries) {
            itemViews.push(
                <div key={index + index - 1}>
                    <div
                        className="DropDownItem"
                        onClick={() => { onItemClicked(value) }}
                        style={index == 0 ? { paddingTop: '10px' } : index == data.items.length - 1 ? { paddingBottom: '10px' } : {}}>
                        <img src={value.avatar_url} className="DropDownImage" />
                        <p className="DropDownUsername">{value.login}</p>
                    </div>
                    {index < data.items.length - 1 && <div className="DropDownDivider" />}
                </div>)
        }
    }

    return (
        <div>
            {data && data.message && <div className="UsernameError">{data.message}</div>}
            <div className="DropDownContainer" style={{ maxHeight: height, width }}>
                {data && data.items != undefined && itemViews}
            </div>
        </div>

    );
}

export default DropdownResults;