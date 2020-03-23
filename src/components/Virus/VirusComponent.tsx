import * as React from 'react';
import { View, Text, Button, FlatList, RefreshControl } from 'react-native';
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
    refreshing: boolean
    italyResult: VirusResultItem[]
    netherlandResult: VirusResultItem[]
}

class VirusComponent extends RootComponent<VirusProps, VirusState> {
    constructor(props: VirusProps) {
        super(props);
        this.state = { refreshing: true, italyResult: [], netherlandResult: [] }
    }

    componentDidMount() {
        this.refresh();
    }
    async refresh() {

        this.setState({ refreshing: true });
        let it = await this.invokeAsync<VirusResult>(VirusActions.GetItalyData());
        let itData=it.data.reverse().slice(0,5);
        let nl = await this.invokeAsync<VirusResult>(VirusActions.GetNetherlandData());
        this.setState({ refreshing: false, italyResult: itData, netherlandResult: nl.data });
    }


    public render() {
        const { refreshing, italyResult } = this.state;

        return (
            <View>
                <Text>Virus!</Text>
                <FlatList data={italyResult}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => this.refresh()}
                            tintColor='blue'
                        />
                    }
                    refreshing={refreshing}
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

            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    ...mapRootStateToProps(state)
});
export default connect()(VirusComponent);