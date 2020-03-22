import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { VirusActions } from './VirusActions';
import { RootState } from 'redux/Store';
import Log from 'utils/Log';
import { RootComponent, mapRootStateToProps } from 'core/RootComponent/RootComponent';
import { BasicProps } from "core/RootComponent/BasicProps";
import { BasicState } from "core/RootComponent/BasicState";

export interface VirusProps extends BasicProps {

}

export interface VirusState extends BasicState {
    loadingState: boolean
    result: any
}


class VirusComponent extends RootComponent<VirusProps, VirusState> {
    constructor(props: VirusProps) {
        super(props);
        this.state = { loadingState: true, result: {} }
    }

    componentDidMount() {
        this.refresh();
    }
    async refresh() {

        this.setState({ loadingState: true });
        let result = await this.invokeAsync(VirusActions.GetData());
        this.setState({ loadingState: false, result });
    }


    public render() {
        const { loadingState, result } = this.state;

        return (
            <View>
                <Text>Virus!</Text>
                <Button title='refresh data' onPress={() => this.refresh()}></Button>
                {
                    loadingState ? <Text>Loading</Text> :
                        <FlatList data={result.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <>
                                    <Text>{item.date}</Text>
                                    <Text>{item.confirm}</Text>
                                    <Text>{item.heal}</Text>
                                    <Text>{item.dead}</Text>
                                </>
                            }
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    ...mapRootStateToProps(state)
});
export default connect()(VirusComponent);