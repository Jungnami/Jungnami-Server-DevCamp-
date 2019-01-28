const request = require('request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const getCode = require('./getCode');
const getUrl  = require('./getUrl');
const { serviceKey } = require('../config/api');
let { url } = require('../config/api');
url += 'getMemberDetailInfoList';


module.exports = {
    detail : async() => {
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('300');

        const dept_cd = await getCode.getInfo();
        if(err) return;

        let result = new Array();

        for (let i = 0; i < dept_cd.length; i++){
            result[i] = await getUrl.getParam(url, queryParams, dept_cd[i]);
        }
        //Insert into legislator
        const updateQuery = 'UPDATE legislator (party_name, ordina, phone) SET ?';
        const updateResult = await db.queryParams_Parse(updateQuery, [result]);
        console.log(updateResult);

        //Update party_cd
        const updatePartyQuery = 'UPDATE legislator, city LEFT JOIN legistor l ON l.city = city.city_name SET l.city_cd = city.city_cd';
        const updatePartyResult = await db.queryParam_None(updatePartyQuery);
        console.log(updatePartyResult);
    }
}