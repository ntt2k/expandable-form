import React from 'react';

const StringQuestion = (props) => {
    const { data, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    return (
        <React.Fragment>
            {show && (
                <React.Fragment>
                    <p>{`formCid: ${formCid}`}</p>
                    <p>{`This is a ${type}`}</p>
                    <p>{text}</p>
                </React.Fragment>
            )}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

export default StringQuestion;
