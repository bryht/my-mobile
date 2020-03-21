import Log from "./Log";
import Env from "config/env";
import { IHttpRequest } from "../core/Models/IHttpRequest";

export default class HttpHelper {
    constructor() {

    }

    public static RequestAsync<T>(action: IHttpRequest, accessToken: string | null = null): Promise<T> {
        return new Promise(resolve => {

            var request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {

                if (request.readyState === 4 && request.status === 200) {

                    action.result = JSON.parse(request.response);
                    return resolve(action.result);

                } else {
                    Log.Info(request.status + request.responseText);
                }
            };
            request.open(action.method, Env.baseUrl + action.url);
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Content-Type', 'application/json');
            if (accessToken) {
                request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            }
            request.send();

        })
    }
}