import React, { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import '../App.css';
import UserItem from './UserItem';

const fetcher = url => fetch(url).then(res => res.json());
const defaultHeight = '30vh';
const recordPerPage = 20;

function DropdownResults(props) {

    const isFetchedData = useRef(false);
    const dropdownRef = useRef(null);
    const [page, setPage] = useState(1);
    const [recordsToDisplay, setRecordsToDisplay] = useState([]);
    const [limitReached, setLimitReached] = useState(false);
    const [scrollPoint, setScrollPoint] = useState(0);


    const perPage = props.recordPerPage ? props.recordPerPage : recordPerPage;


    const { data, error } = useSWR(
        props.user ? `https://api.github.com/search/users?q=${props.user}&page=${page}&per_page=${perPage}` : null,
        fetcher
    );

    const onItemClicked = value => {
        props.onItemSelected(value);
    };

    const onDropdownScroll = event => {
        const target = event.target;
        if (Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < .5) {

            if (!limitReached && isFetchedData.current) {
                isFetchedData.current = false;
                if (scrollPoint < dropdownRef.current.scrollTop) {
                    setScrollPoint(dropdownRef.current.scrollTop);
                }
                setPage(page + 1);
            }
        }
    }

    useEffect(() => {
        setPage(1);
        setLimitReached(false);
        setScrollPoint(0);
        setRecordsToDisplay([]);
    }, [props.user]);

    useEffect(() => {
        if (data && !error && data.items != undefined) {
            var temp = data.items;
            if (data.items.length < perPage) {
                setLimitReached(true);
            }

            if (recordsToDisplay.length > 0) {
                temp = recordsToDisplay.concat(temp);
            }

            setRecordsToDisplay(temp);
        } else if (data && data.message) {
            setLimitReached(true);
        }

    }, [data, error])

    useEffect(() => {
        isFetchedData.current = true;
        if (dropdownRef.current && scrollPoint != dropdownRef.current.scrollTop) {
            dropdownRef.current.scrollTop = scrollPoint;
        }
    }, [recordsToDisplay])


    if (!props.user || error || !props.show) {
        return null;
    }


    return (

        <div ref={dropdownRef} className="DropDownContainer"
            onScroll={onDropdownScroll}
            style={{ maxHeight: props.height ? props.height : defaultHeight, width: props.width ? props.width : '100%' }}>
            {recordsToDisplay.map((item, index) =>
                <UserItem key={index} value={item} onItemClicked={onItemClicked} />
            )}
            {(!limitReached || !(data && data.message) && (recordsToDisplay.length >= perPage)) && <div className="LoadingMoreContainer">Loading...</div>}
            {data && data.message && <div className="UsernameError" style={{ width: props.width ? props.width : '100%' }}>{data.message}</div>}
        </div>

    );
}

export default DropdownResults;