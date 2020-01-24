import http from "./httpService";
import { apiUrl } from "../config.json";

const linkcreateapi = apiUrl + "/createlink";
const alllinksstatsapi = apiUrl + "/stats/links";
export function getLink(url) {
  return http.post(linkcreateapi, {
    originalLink: url
  });
}
export function getAllLinks() {
  return http.get(alllinksstatsapi);
}
export function getLinkStat(id) {
  return http.get(alllinksstatsapi + id);
}
export default {
  getLink,
  getAllLinks,
  getLinkStat
};
