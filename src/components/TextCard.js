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
                <React.Fragment>
                    <p>{`formCid: ${formCid}`}</p>
                    <p>{`This is a ${type}`}</p>
                    <Card>
                        <StyledCardBody>{text}</StyledCardBody>
                    </Card>
                </React.Fragment>
            )}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

export default TextCard;
