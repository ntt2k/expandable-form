import React from 'react';
import styled from 'styled-components';
import TextCard from '../components/TextCard';
import CheckItem from '../components/CheckItem';
import StringQuestion from '../components/StringQuestion';
import MemoQuestion from '../components/MemoQuestion';

const StyledRecursiveContainer = styled.div`
    padding-top: 25px;
    padding-left: 10px;
    margin-left: 20px;
`;

const RecursiveContainer = (props) => {
    const { data, tracker, onUpdate } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    const handleShowContents = (ctn) =>
        ctn.map((item) => (
            <RecursiveContainer
                key={item.formCid}
                data={item}
                tracker={[...tracker, formCid]}
                onUpdate={onUpdate}
            />
        ));

    const showType = () => {
        if (type === 'plaintext') {
            return <TextCard {...props} onShowContents={handleShowContents} />;
        }

        if (type === 'radio' || type === 'checkbox') {
            return <CheckItem {...props} onShowContents={handleShowContents} />;
        }

        if (type === 'stringquestion') {
            return (
                <StringQuestion
                    {...props}
                    onShowContents={handleShowContents}
                />
            );
        }

        if (type === 'memoquestion') {
            return (
                <MemoQuestion {...props} onShowContents={handleShowContents} />
            );
        }

        return show && handleShowContents(contents);
    };

    return (
        show && (
            <StyledRecursiveContainer>
                <p>{`formCid: ${formCid}`}</p>
                <p>{`This is a ${type}`}</p>
                {showType()}
            </StyledRecursiveContainer>
        )
    );
};

export default RecursiveContainer;
