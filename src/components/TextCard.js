import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const StyledCardBody = styled(Card.Body)`
    background-color: #f7f7f7;
    color: #4a4a4a;
`;

const TextCard = (props) => {
    const { data, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

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

export default TextCard;
