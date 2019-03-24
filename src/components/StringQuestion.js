import React from 'react';
import PropTypes from 'prop-types';

const StringQuestion = (props) => {
    const { data, onShowContents } = props;
    const { show, contents, text } = data;

    return (
        <React.Fragment>
            {show && <p>{text}</p>}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

StringQuestion.propTypes = {
    data: PropTypes.object.isRequired,
    onShowContents: PropTypes.func.isRequired
}

export default StringQuestion;
