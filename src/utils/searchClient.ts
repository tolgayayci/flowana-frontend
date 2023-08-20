import algoliasearch from "algoliasearch";
import { IProtocol } from "@/types/general";
import { getAppIdForProtocol, getSearchKeyForProtocol } from "./functions";

export const searchClient = (protocolName: IProtocol["protocol"]) => {
    return algoliasearch(
        getAppIdForProtocol(protocolName) as string,
        getSearchKeyForProtocol(protocolName) as string
    );
}