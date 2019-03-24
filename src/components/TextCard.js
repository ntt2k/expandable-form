import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const StyledCardBody = styled(Card.Body)`
    background-color: #f7f7f7;
    color: #4a4a4a;
`;

const TextCard = (props) => {
    const { data, onShowContents } = props;
    const { show, contents, text } = data;

    return (
        <React.Fragment>
            {show && (
                <Card>
                    <StyledCardBody>{text}</StyledCardBody>
                </Card>
            )}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

TextCard.propTypes = {
    data: PropTypes.object.isRequired,
    onShowContents: PropTypes.func.isRequired
}

export default TextCard;
