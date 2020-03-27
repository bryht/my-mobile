import Log from "utils/Log";
import { IHttpRequest } from "utils/HttpRequest/IHttpRequest";
import HttpRequestHelper from "utils/HttpRequest/HttpRequestHelper";
export interface VirusResult {
    ret:  number;
    info: string;
    data: VirusResultItem[];
}

export interface VirusResultItem {
    date:       string;
    confirmAdd: number;
    confirm:    number;
    heal:       number;
    dead:       number;
    suspect:    number;
}


export class VirusActions {

    static GetItalyData(): IHttpRequest {
        return HttpRequestHelper.CrateRequest('query/pubished/daily/list?country=意大利');
    }

    static GetNetherlandData(): IHttpRequest {
        return HttpRequestHelper.CrateRequest('query/pubished/daily/list?country=荷兰');
    }

}