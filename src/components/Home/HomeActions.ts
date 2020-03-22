import Log from "utils/Log";
import { IHttpRequest } from "core/Models/IHttpRequest";


export class HomeActions {

    static GetData(): IHttpRequest {

        return {
            method: 'GET',
            url: 'query/pubished/daily/list?country=意大利',
            body: '',
        };
    }

}