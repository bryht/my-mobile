import Log from "utils/Log";
import { IHttpRequest } from "utils/HttpRequest/IHttpRequest";
import HttpRequestHelper from "utils/HttpRequest/HttpRequestHelper";
export interface VirusResult {
    ret: number;
    info: string;
    data: VirusResultItem[];
}

export interface VirusResultItem {
    name: string;
    continent: string;
    date: string;
    isUpdated: boolean;
    confirmAdd: number;
    confirmAddCut: number;
    confirm: number;
    suspect: number;
    dead: number;
    heal: number;
    nowConfirm: number;
    confirmCompare: number;
    nowConfirmCompare: number;
    healCompare: number;
    deadCompare: number;
}


export class VirusActions {

    //generate class http://json2ts.com/
    static GetRankingList(): IHttpRequest {
        return HttpRequestHelper.CrateRequest('automation/foreign/country/ranklist', null, 'POST');
    }

}