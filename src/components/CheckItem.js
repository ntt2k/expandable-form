import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function updateValue(val, data) {
    const { contents } = data;

    return {
        ...data,
        value: val,
        contents: contents.map((item) => ({
            ...item,
            show: val,
            contents: item.contents.map((i) => recursiveUpdateShow(val, i))
        }))
    };
}

function recursiveUpdateShow(val, i) {
    if (
        i.type === 'plaintext' ||
        i.type === 'stringquestion' ||
        i.type === 'memoquestion'
    ) {
        return {
            ...i,
            show: val,
            contents: i.contents.map((k) =>
                recursiveUpdateShow(val, k)
            )
        };
    }

    // other type: radio and checkbox
    return {
        ...i,
        show: val,
    };
}

const CheckItem = (props) => {
    const { data, tracker, adjacentItems, onUpdate, onShowContents } = props;
    const { formCid, type, required, value, show, contents, text } = data;

    const handleUpdateShow = (v) => {
        const current_updated_item = updateValue(v, data);

        const disable_adjacent_items =
            type === 'radio'
                ? adjacentItems.map((i) =>
                    updateValue(!v, i)
                  )
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
                <Form.Check
                    type={type}
                    id={formCid}
                    label={text}
                    value={value}
                    checked={value}
                    onChange={(event) => handleUpdateShow(event.target.checked)}
                />
            )}

            {onShowContents(contents)}
        </React.Fragment>
    );
};

CheckItem.propTypes = {
    data: PropTypes.object.isRequired,
    tracker: PropTypes.array.isRequired,
    adjacentItems: PropTypes.array,
    onUpdate: PropTypes.func.isRequired,
    onShowContents: PropTypes.func.isRequired
}

export default CheckItem;
