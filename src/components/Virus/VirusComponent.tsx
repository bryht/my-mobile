import * as React from 'react';
import { View, Text, Button, FlatList, RefreshControl, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { VirusActions, VirusResult, VirusResultItem } from './VirusActions';
import { RootState } from 'redux/Store';
import Log from 'utils/Log';
import { RootComponent, mapRootStateToProps } from 'core/RootComponent/RootComponent';
import { BasicProps } from "core/RootComponent/BasicProps";
import { BasicState } from "core/RootComponent/BasicState";
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface VirusProps extends BasicProps {

}

export interface VirusState extends BasicState {
    refreshing: boolean
    virusRankingResult: VirusResultItem[]
    populationData: any[]
}

class VirusComponent extends RootComponent<VirusProps, VirusState> {
    constructor(props: VirusProps) {
        super(props);
        this.state = {
            refreshing: true,
            virusRankingResult: [],
            populationData: [
                { name: '美国', population: 327167434 },
                { name: '荷兰', population: 17231017 },
                { name: '意大利', population: 60431283 },
                { name: '西班牙', population: 46723749 },
                { name: '德国', population: 82927922 },
                { name: '伊朗', population: 81800269 },
                { name: '法国', population: 66987244 },
                { name: '瑞士', population: 8516543 },
                { name: '比利时', population: 11422068 },
                { name: '奥地利', population: 8847037 },
                { name: '澳大利亚', population: 24992369 },
                { name: '新西兰', population: 4885500 },
                { name: '英国', population: 66488991 },
            ]
        }
    }


    componentDidMount() {
        this.refresh();
    }
    async refresh() {

        this.setState({ refreshing: true });
        let result = await this.invokeAsync<VirusResult>(VirusActions.GetRankingList());
        this.setState({ refreshing: false, virusRankingResult: result.data });
    }

    deadRate(item: VirusResultItem) {
        return (item.dead / (item.nowConfirm + item.heal + item.dead) * 100).toFixed(1);
    }

    infectRateForPopulation(item: VirusResultItem) {
        const { populationData } = this.state;
        let country = populationData.filter(p => p.name == item.name)[0];
        if (country) {
            return ((item.nowConfirm + item.heal + item.dead) / country.population * 1000).toFixed(2);
        } else {
            return 0;
        }
    }

    deadRateForPolulation(item: VirusResultItem) {
        const { populationData } = this.state;
        let country = populationData.filter(p => p.name == item.name)[0];
        if (country) {
            return (item.dead / country.population * 1000000).toFixed(2);
        } else {
            return 0;
        }
    }

    public render() {
        const { refreshing, virusRankingResult } = this.state;

        return (
            <View style={styles.container}>
                <FlatList style={styles.rankingList} data={virusRankingResult}
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
                        <View style={styles.rankingListItem}>
                            <View style={styles.rankingListItemRow}>
                                <Text style={{ ...styles.normalFontSize }}>{item.name}</Text>
                                <Text style={{ ...styles.smallFontSize }}>({item.continent})</Text>
                                <Text style={{ ...styles.smallFontSize,...styles.textMargin,color:'purple' }}>{this.infectRateForPopulation(item) + "‰"} </Text>
                                <View style={{ marginLeft: "auto", flexDirection: "row" }}>
                                    <Text style={{ ...styles.normalFontSize }} >{item.nowConfirm} </Text>
                                    <Text style={{ ...styles.smallFontSize, color: "red" }}> +{item.confirmCompare}</Text>
                                </View>
                            </View>
                            <View style={styles.rankingListItemRow}>
                                <Text style={{ ...styles.textMargin, color: "green" }}><Icon name="user-shield"></Icon>{item.heal}</Text>
                                <Text style={{ ...styles.textMargin, color: "red" }}><Icon name="user-slash"></Icon>{item.dead}</Text>
                                <Text style={{ ...styles.textMargin, color: "brown" }}><Icon name="user-slash"></Icon> <Icon name="chart-area"></Icon> {this.deadRate(item) + "%"}</Text>
                                {
                                    this.deadRateForPolulation(item) > 0 ?
                                        <Text style={{ ...styles.textMargin, color: "black" }}><Icon name="user-slash"></Icon><Icon name="font-awesome-flag"></Icon> <Icon name="chart-area"></Icon> {this.deadRateForPolulation(item) + "‰‰"}</Text> :
                                        <Text></Text>
                                }
                            </View>
                        </View>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    searchBox: {

    },
    normalFontSize: {
        fontSize: 20
    },
    smallFontSize: {
        fontSize: 12
    },
    textMargin: {
        marginLeft: 20
    },
    rankingList: {
        flexDirection: "column",
    },
    rankingListItem: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        padding: 6,
    },
    rankingListItemRow: {
        flex: 1,
        flexDirection: "row",
    }
});