import Env from "config/env";
import { authorize, AuthorizeResult, refresh } from "react-native-app-auth";
import { Dispatch } from "redux";
import { UserState } from "core/Models/UserState";
import { UserEntity } from "core/Models/UserEntity";
import { SystemActions } from "components/System/SystemActions";

export default class Authentication {


    static getConfig(tenantId: string) {
        return {
            warmAndPrefetchChrome: true,
            issuer: Env.identityUrl,
            clientId: Env.clientId,
            redirectUrl: Env.redirectUrl,
            scopes: Env.scopes,
            dangerouslyAllowInsecureHttpRequests: true,
            usePKCE: true,
            additionalParameters: { acr_values: `tenant:${tenantId}` }
        }
    }

    static async loginAsync(tenantId: string): Promise<AuthorizeResult | null> {
        try {
            const result = await authorize(this.getConfig(tenantId));
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    static async refreshAsync(tenantId: string, refreshToken: string) {
        try {
            const result = await refresh(this.getConfig(tenantId), { refreshToken: refreshToken });
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    static async checkAuthenticationAsync(dispatch: Dispatch, currentUser: UserEntity) {
        if (currentUser == null) {
            dispatch(SystemActions.GoLogin());
            return;
        }
        var currentUserObject = new UserEntity();
        Object.assign(currentUserObject, currentUser);
        var currentUserState = currentUserObject.getUserState();

        if (currentUserState == UserState.NeedRefresh) {
            let refreshResult = await Authentication.refreshAsync(currentUserObject.tenantId, currentUserObject.refreshToken);
            if (refreshResult) {
                currentUserObject.accessToken = refreshResult.accessToken;
                currentUserObject.expireDate = new Date(refreshResult.accessTokenExpirationDate);
                dispatch(SystemActions.SaveUser(currentUserObject));
            }
        } else if (currentUserState == UserState.NeedLogin) {
            dispatch(SystemActions.GoLogin());
        }
    }

}