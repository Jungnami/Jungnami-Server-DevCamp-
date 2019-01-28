const xml2json = require('xml2json');
const request = require('sync-request');

module.exports = {
    getParam : async (url, queryParams, dept_cd) => {
        let queryParamsEnd = queryParams + '&' + encodeURIComponent('dept_cd') + '=' + encodeURIComponent(dept_cd);
        let res = await request('GET', url+queryParamsEnd);

        let result = new Array();

        const json = JSON.parse(xml2json.toJson(res.body));
        const item = json.response.body.item;
        console.log(item);

        region = JSON.stringify(item.origNm).replace(/['"]+/g, ''); //detail
        polyNm = JSON.stringify(item.polyNm).replace(/['"]+/g, ''); //legi
        phoneNm = JSON.stringify(item.phoneNm).replace(/['"]+/g, '');   //detail
        reeleNm = JSON.stringify(item.reeleNm).replace(/['"]+/g, '');   //detail

        result.push(region, polyNm, phoneNm, reeleNm);
        return result;

    }
}