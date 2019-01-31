const xml2json = require('xml2json');
const request = require('sync-request');

module.exports = {
    getParam : async (url, queryParams, dept_cd) => {
        let queryParamsEnd = queryParams + '&' + encodeURIComponent('dept_cd') + '=' + encodeURIComponent(dept_cd);
        let res = await request('GET', url+queryParamsEnd);

        // console.log(url+queryParamsEnd)

        let party_name, ordinal, phone;
        let result = new Array();

        const json = JSON.parse(xml2json.toJson(res.body));
        const item = json.response.body.item;
        // console.log(item);

        try{
            party_name = JSON.stringify(item.polyNm).replace(/['"]+/g, ''); 
            // ordinal = JSON.stringify(item.electionNum).replace(/['"]+/g, '').split(',');
            // ordinal = ordinal[ordinal.length-1].replace(/[^0-9]/g,'');
            // ordinal = parseInt(ordinal);
            ordinal = JSON.stringify(item.reeleGbnNm).replace(/['"]+/g, '')
            ordinal = ordinal.substr(3, 2);
            ordinal = parseInt(ordinal);
            phone = JSON.stringify(item.assemTel).replace(/['"]+/g, '');
            console.log(phone)
        } catch (e) {
            // console.log(e);
        } finally {
            result.push(party_name, ordinal, phone);
            return result;
        }
    }
}