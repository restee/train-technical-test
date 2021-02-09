import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DropdownResults from './DropDownComponent';


function CustomTypeahead(props) {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState(0);
    const [showDialog, setShowDialog] = useState(false);


    const onTextChangeHandler = event => {
        setInputValue(event.target.value);
        setShowDialog(true);
    };

    const onItemSelected = item => {
        setInputValue(item.login);
        setShowDialog(false);
    }

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }

        function handleResize() {
            setInputWidth(inputRef.current.offsetWidth);
        }

        window.addEventListener('resize', handleResize)
    }, [inputRef]);


    return (
        <div>
            <form>
                <input ref={inputRef}
                    type="text"
                    className="UsernameInput"
                    name="name"
                    value={inputValue}
                    onChange={onTextChangeHandler}
                    style={!props.style ? {} : props.style} />

                <DropdownResults
                    height={props.dropdownHeight}
                    user={inputValue}
                    width={inputWidth}
                    onItemSelected={onItemSelected}
                    show={showDialog} />
            </form>
        </div>
    );
}

export default CustomTypeahead;
