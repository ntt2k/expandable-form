import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import data from './data/dummy_JSON_new';
import RecursiveContainer from './containers/RecursiveContainer';

const AppWrapper = styled.div`
    margin: 0 auto;
    width: 60%;
`;

const AppTitle = styled.h1`
    color: #3273dc;
    text-align: center;
`;

const AppContent = styled.div`
    padding-bottom: 50px;
`;

function recursiveCustomMergeCSRE(data, new_data) {
    function customizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.map((i) => {
                const srcObj = _.find(srcValue, { formCid: i.formCid });
                if (!!srcObj) {
                    return recursiveCustomMergeCSRE(i, srcObj);
                } else {
                    return i;
                }
            });
        }
    }

    return _.mergeWith(data, new_data, customizer);
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(new_data) {
        const { data } = this.state;

        const updated_state = recursiveCustomMergeCSRE(data, new_data);

        this.setState({
            data: updated_state
        });
    }

    render() {
        const { data } = this.state;

        return (
            <AppWrapper>
                <AppTitle>React Expandable Bootstrap Form</AppTitle>
                <AppContent>
                    <RecursiveContainer
                        data={data}
                        tracker={[]}
                        onUpdate={this.handleUpdate}
                    />
                </AppContent>
            </AppWrapper>
        );
    }
}

export default App;
