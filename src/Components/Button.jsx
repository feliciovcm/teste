import React from 'react';

export default function Button(props) {

    return (
        <button
            data-testid="form-btnName"
            type="button"
            onClick={props.clicked}
        >
            <i className="fas fa-play fa-2x" />
        </button>
    )
}