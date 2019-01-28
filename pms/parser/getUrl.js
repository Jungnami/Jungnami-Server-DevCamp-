const xml2json = require('xml2json');
const request = require('sync-request');

module.exports = {
    getParam : async (url, queryParams, dept_cd) => {
        let queryParamsEnd = queryParams + '&' + encodeURIComponent('dept_cd') + '=' + encodeURIComponent(dept_cd);
        let res = await request('GET', url+queryParamsEnd);

        let party_name, ordinal, phone;
        let result = new Array();

        const json = JSON.parse(xml2json.toJson(res.body));
        const item = json.response.body.item;
        console.log(item);

        party_name = JSON.stringify(item.polyNm).replace(/['"]+/g, ''); 
        ordinal = JSON.stringify(item.electionNum).replace(/['"]+/g, '');
        ordinal = ordinal.split(',');
        ordinal = ordinal[ordinal.length-1].slice(0, -1);
        ordinal = praseInt(ordinal);
        phone = JSON.stringify(item.phoneNm).replace(/['"]+/g, ''); 
        
        result.push(party_name, ordinal, phone);
        return result;
    }
}