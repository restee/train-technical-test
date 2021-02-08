import React, { useState } from 'react';
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());


function DropdownResults({ height, user, width }) {

    const { data, error } = useSWR(
        user ? `https://api.github.com/search/users?q=${user}` : null,
        fetcher
    );

    console.log(data);

    if (!height)
        height = '30vh';

    if (!user)
        return null;

    const itemViews = [];

    if (data) {
        for (const [index, value] of data.items.entries()) {
            itemViews.push(
                <div key={index + index - 1}>
                    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', color: 'black', marginLeft: "10%", marginRight: "10%" }}>
                        <img src={value.avatar_url} height="60%" width="20%" />
                        <p style={{ marginLeft: "10%" }}>{value.login}</p>
                    </div>
                    {index < data.items.length - 1 && <div style={{ backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: '1px' }} />}
                </div>)

        }
    }

    return (
        <div style={{ height, position: 'fixed', backgroundColor: "white", overflow: 'auto', display: 'flex', flexDirection: 'column', width }}>
            {itemViews}
        </div>
    );
}

export default DropdownResults;