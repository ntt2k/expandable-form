import React from 'react';

const MemoQuestion = (props) => {
    const { data, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    return (
        <React.Fragment>
            {show && <p>{text}</p>}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

export default MemoQuestion;
