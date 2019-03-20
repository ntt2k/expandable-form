import React from 'react';
import { Form } from 'react-bootstrap';

function recursiveUpdateShowForCheckItem(val, data) {
    const { contents } = data;

    return {
        ...data,
        value: val,
        contents: contents.map((item) => ({
            ...item,
            show: val,
            contents: item.contents.map((i) => {
                if (
                    i.type === 'plaintext' ||
                    i.type === 'stringquestion' ||
                    i.type === 'memoquestion'
                ) {
                    return {
                        ...i,
                        show: val,
                        contents: i.contents.map((k) =>
                            recursiveUpdateShowForCheckItem(val, k)
                        )
                    };
                }

                // other type: radio and checkbox
                return {
                    ...i,
                    show: val
                };
            })
        }))
    };
}

const CheckItem = (props) => {
    const { data, tracker, adjacentItems, onUpdate, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    const handleUpdateShow = (v) => {
        const current_updated_item = recursiveUpdateShowForCheckItem(v, data);

        const disable_adjacent_items =
            type === 'radio'
                ? adjacentItems.map((i) => recursiveUpdateShowForCheckItem(!v, i))
                : [];

        const new_nested_data = tracker.reduceRight(
            (prev, current) => [{ formCid: current, contents: [...prev] }],
            [...disable_adjacent_items, current_updated_item]
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
                        checked={value}
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
