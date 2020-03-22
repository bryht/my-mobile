import Log from "utils/Log";
import { IHttpRequest } from "core/Models/IHttpRequest";

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

        return {
            method: 'GET',
            url: 'query/pubished/daily/list?country=意大利',
            body: '',
        };
    }

    static GetNetherlandData(): IHttpRequest {

        return {
            method: 'GET',
            url: 'query/pubished/daily/list?country=荷兰',
            body: '',
        };
    }

}