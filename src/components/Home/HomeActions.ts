import Log from "utils/Log";
import HttpRequestHelper from "utils/HttpRequest/HttpRequestHelper";
import { IHttpRequest } from "utils/HttpRequest/IHttpRequest";
export class HomeActions {

    static GetData(): IHttpRequest {

        return HttpRequestHelper.CrateRequest('query/pubished/daily/list?country=意大利');
    }

}