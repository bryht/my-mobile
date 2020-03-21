import * as React from 'react';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import { Dispatch } from 'redux';
import { UserEntity } from "core/Models/UserEntity";
import { connect } from 'react-redux';
import { getItemAsync } from 'utils/Storage';
import { SystemActions } from 'components/System/SystemActions';
import { RootState } from 'redux/Store';

export interface AppNavigationProps {
    dispatch: Dispatch;
    currentUser: UserEntity | null;
}

class AppNavigation extends React.Component<AppNavigationProps, any> {
    constructor(props: AppNavigationProps) {
        super(props);
    }
    
    public render() {
        return (<HomeScreen />)
    }
}

export default connect()(AppNavigation);
