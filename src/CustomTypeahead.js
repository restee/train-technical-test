import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DropdownResults from './DropDownComponent';


function CustomTypeahead(props) {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [isCursorOut, setCursorOut] = useState(false);


    const onTextChangeHandler = event => {
        setInputValue(event.target.value);
        setShowDialog(true);
    };

    const onItemSelected = item => {
        setInputValue(item.login);
        setShowDialog(false);
    }

    const onInputFocus = event => {
        setShowDialog(true);
    }

    const onInputBlur = event => {
        if (isCursorOut)
            setShowDialog(false);
    }

    const onMouseLeaveForm = event => {
        setCursorOut(true);
    }

    const onMouseEnterForm = event => {
        setCursorOut(false);
    }

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }

        function handleResize() {
            setInputWidth(inputRef.current.offsetWidth);
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [inputRef]);


    return (
        <div >
            <form onMouseLeave={onMouseLeaveForm} onMouseEnter={onMouseEnterForm}>
                <input ref={inputRef}
                    type="text"
                    className="UsernameInput"
                    name="name"
                    value={inputValue}
                    onChange={onTextChangeHandler}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    style={!props.style ? {} : props.style} />

                <DropdownResults
                    recordPerPage={100}
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
