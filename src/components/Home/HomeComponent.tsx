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
    result: any
}


class HomeComponent extends RootComponent<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { loadingState: true, result: {} }
    }

    componentDidMount(){
        this.refresh();
    }
    async refresh() {

        this.setState({ loadingState: true });
        let result = await this.invokeAsync(HomeActions.GetData());
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
export default connect()(HomeComponent);