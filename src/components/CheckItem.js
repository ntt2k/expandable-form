import React from 'react';
import { Form } from 'react-bootstrap';

function recursiveUpdateProperty(property, value, data) {
    const { type, contents } = data;
    let new_contents = contents;

    if (
        type === 'plaintext' ||
        type === 'stringquestion' ||
        type === 'memoquestion'
    ) {
        new_contents = contents.map((item) =>
            recursiveUpdateProperty(property, value, item)
        );
    }

    return {
        ...data,
        [property]: value,
        contents: new_contents
    };
}

const CheckItem = (props) => {
    const { data, tracker, onUpdate, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    const handleUpdateShow = (val) => {
        const updated_data = {
            ...data,
            contents: contents.map((item) => {
                return {
                    ...item,
                    show: val,
                    contents: item.contents.map((i) =>
                        recursiveUpdateProperty('show', val, i)
                    )
                };
            })
        };

        const new_nested_data = tracker.reduceRight(
            (prev, current) => ([{ formCid: current, contents: [...prev] }]),
            [updated_data]
        );

        onUpdate(new_nested_data[0]);
    };

    return (
        <React.Fragment>
            {show && (
                <Form>
                    <Form.Check
                        type={type}
                        id={formCid}
                        label={text}
                        value={value}
                        onClick={(event) =>
                            handleUpdateShow(event.target.checked)
                        }
                    />
                </Form>
            )}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

export default CheckItem;
