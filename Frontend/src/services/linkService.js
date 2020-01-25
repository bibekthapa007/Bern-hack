import http from "./httpService";
import { apiUrl } from "../config.json";

const linkcreateapi = apiUrl + "/createlink";
const allStat = apiUrl + "/stat/links";
const uniqueStat = apiUrl + "/stat/dlinks";
export function getLink(url) {
  return http.post(linkcreateapi, {
    originalLink: url
  });
}
export function getAllLinks() {
  return http.get(allStat);
}
export function getLinkStat(id) {
  return http.get(allStat + "/" + id);
}
export function getUniqueLinkStat(id) {
  return http.get(uniqueStat + "/" + id);
}

export default {
  getLink,
  getAllLinks,
  getLinkStat,
  getUniqueLinkStat
};
