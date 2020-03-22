import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { VirusActions, VirusResult, VirusResultItem } from './VirusActions';
import { RootState } from 'redux/Store';
import Log from 'utils/Log';
import { RootComponent, mapRootStateToProps } from 'core/RootComponent/RootComponent';
import { BasicProps } from "core/RootComponent/BasicProps";
import { BasicState } from "core/RootComponent/BasicState";

export interface VirusProps extends BasicProps {

}

export interface VirusState extends BasicState {
    loadingState: boolean
    italyResult: VirusResultItem[]
    netherlandResult: VirusResultItem[]
}

class VirusComponent extends RootComponent<VirusProps, VirusState> {
    constructor(props: VirusProps) {
        super(props);
        this.state = { loadingState: true, italyResult: [], netherlandResult:[] }
    }

    componentDidMount() {
        this.refresh();
    }
    async refresh() {

        this.setState({ loadingState: true });
        let it = await this.invokeAsync<VirusResult>(VirusActions.GetItalyData());
        let nl = await this.invokeAsync<VirusResult>(VirusActions.GetNetherlandData());
        this.setState({ loadingState: false, italyResult:it.data,netherlandResult:nl.data});
    }


    public render() {
        const { loadingState, italyResult } = this.state;

        return (
            <View>
                <Text>Virus!</Text>
                <Button title='refresh data' onPress={() => this.refresh()}></Button>
                {
                    loadingState ? <Text>Loading</Text> :
                        <FlatList data={italyResult}
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