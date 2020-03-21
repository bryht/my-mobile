import * as React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HomeActions } from './HomeActions';
import { RootState } from 'redux/Store';
import Log from 'utils/Log';
import { RootComponent, mapRootStateToProps } from 'core/RootComponent/RootComponent';
import { BasicProps } from "core/RootComponent/BasicProps";
import { BasicState } from "core/RootComponent/BasicState";



export interface HomeProps extends BasicProps {

}

export interface HomeState extends BasicState {
    loadingState: boolean
    data: any
}


class HomeComponent extends RootComponent<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { loadingState: true, data: [] }
    }
    async refresh() {

        this.setState({ loadingState: true });
        let notifications = await this.invokeAsync(HomeActions.GetData());
        this.setState({ loadingState: false });
        Log.Debug(notifications);
    }


    public render() {
        const { loadingState, data } = this.state;

        return (
            <View>
                <Text>welcome to home!</Text>
                <Button title='get-data' onPress={() => this.refresh()}></Button>
                {
                    loadingState ? <Text>Loading</Text> :
                        <FlatList data={data}
                            renderItem={({ item }) => <Text >{item.ret}</Text>}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    ...mapRootStateToProps(state)
});
export default connect()(HomeComponent);