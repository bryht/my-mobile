import { Action } from "redux";
import { UserEntity } from "core/Models/UserEntity";
import Authentication from "core/Authentication ";
import { IHttpRequest } from "core/Models/IHttpRequest";
import React from "react";
import { BasicState } from "./BasicState";
import { BasicProps } from "./BasicProps";
import { RootState } from "redux/Store";
import HttpHelper from "utils/HttpHelper";


export class RootComponent<Props extends BasicProps, States extends BasicState | any> extends React.Component<Props, States>{
    constructor(props: Props) {
        super(props);
    }

    async invokeAsync<T>(request: IHttpRequest): Promise<T> {

        return HttpHelper.RequestAsync<T>(request);
    }

    async invokeAsyncWithAuth(request: IHttpRequest): Promise<any> {

        const { dispatch, currentUser } = this.props;

        await Authentication.checkAuthenticationAsync(dispatch, currentUser as UserEntity);

        return HttpHelper.RequestAsync(request);
    }

    invokeDispatch(action: Action) {
        const { dispatch } = this.props;
        dispatch(action);
    }


}


export function mapRootStateToProps(state: RootState) {
    return { currentUser: state.system.currentUser }
}
