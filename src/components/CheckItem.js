import React from 'react';
import { Form } from 'react-bootstrap';

function recursiveUpdateShow(isChecked, data) {
    const { type, contents } = data;
    let new_contents = contents;

    if (
        type === 'plaintext' ||
        type === 'stringquestion' ||
        type === 'memoquestion'
    ) {
        new_contents = contents.map((item) =>
            recursiveUpdateShow(isChecked, item)
        );
    }

    return {
        ...data,
        show: isChecked,
        contents: new_contents
    };
}

const CheckItem = (props) => {
    const { data, tracker, onUpdate, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    const handleUpdateShow = (isChecked) => {
        const updated_data = {
            ...data,
            contents: contents.map((item) => {
                return {
                    ...item,
                    show: isChecked,
                    contents: item.contents.map((k) =>
                        recursiveUpdateShow(isChecked, k)
                    )
                };
            })
        };

        const new_nested_data = tracker.reverse().reduce(
            (prev, current) => {
                return [{ formCid: current, contents: [...prev] }];
            },
            [updated_data]
        )[0];

        onUpdate(new_nested_data);
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
