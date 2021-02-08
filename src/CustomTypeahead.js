import React, { useState, useRef, useEffect } from 'react';
import DropdownResults from './DropDownComponent';




function CustomTypeahead({ fontSize, dropdownHeight }) {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState(0);

    const onTextChangeHandler = event => {
        setInputValue(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
            console.log('inputWidth = ', inputWidth);
        }

    }, [inputRef]);

    return (
        <div>
            <form>
                <input ref={inputRef} type="text" style={{ width: '100%', padding: '5px', fontSize: '20px' }} name="name" value={inputValue} onChange={onTextChangeHandler} />
                <DropdownResults user={inputValue} width={inputWidth} />
            </form>
        </div>
    );
}

export default CustomTypeahead;
