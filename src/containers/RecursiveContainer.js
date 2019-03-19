import React from 'react';
import styled from 'styled-components';
import TextCard from '../components/TextCard';
import CheckItem from '../components/CheckItem';
import StringQuestion from '../components/StringQuestion';
import MemoQuestion from '../components/MemoQuestion';

const StyledRecursiveContainer = styled.div`
    padding-top: 20px;
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
            return (
                <TextCard
                    data={data}
                    tracker={tracker}
                    onUpdate={onUpdate}
                    onShowContents={handleShowContents}
                />
            );
        }

        if (type === 'radio' || type === 'checkbox') {
            return (
                <CheckItem
                    data={data}
                    tracker={tracker}
                    onUpdate={onUpdate}
                    onShowContents={handleShowContents}
                />
            );
        }

        if (type === 'stringquestion') {
            return (
                <StringQuestion
                    data={data}
                    tracker={tracker}
                    onUpdate={onUpdate}
                    onShowContents={handleShowContents}
                />
            );
        }

        if (type === 'memoquestion') {
            return (
                <MemoQuestion
                    data={data}
                    tracker={tracker}
                    onUpdate={onUpdate}
                    onShowContents={handleShowContents}
                />
            );
        }

        return show && handleShowContents(contents);
    };

    return (
        show && (
            <StyledRecursiveContainer>{showType()}</StyledRecursiveContainer>
        )
    );
};

export default RecursiveContainer;
