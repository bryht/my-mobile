import Log from "../Log";
import Env from "config/env";
import { IHttpRequest } from "./IHttpRequest";

export default class HttpRequestHelper<T> {
    constructor() {

    }

    public static CrateRequest(url: string, body: any | null = null, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): IHttpRequest {
        return {
            url: url ?? '',
            body,
            method
        }
    }

    public static RequestAsync<T>(requestObj: IHttpRequest, accessToken: string | null = null): Promise<T> {
        return new Promise(resolve => {

            var request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {

                if (request.readyState === 4 && request.status === 200) {
                    return resolve(JSON.parse(request.response) as T);
                } else {
                    Log.Info(request.status + request.responseText);
                }
            };
            request.open(requestObj.method, Env.baseUrl + requestObj.url);
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Content-Type', 'application/json');
            if (accessToken) {
                request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            }
            request.send(requestObj.body);
            console.log(request);
        })
    }

 
}