import React from 'react'
import './Input.css'

const Input = (props) => {
    return (
        <>
            <input
                placeholder={props?.placeholder}
                name={props?.name}
                onChange={props?.onChange}
                type={props?.type}
                className="input" />
        </>
    )
}

export default Input