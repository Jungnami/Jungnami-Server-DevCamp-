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

        let result = new Array();
        let updateQuery;
        let updateResult;
        
        for (let i = 0; i < dept_cd.length; i++){
            result[i] = await getUrl.getParam(url, queryParams, dept_cd[i]);
            result[i].push(dept_cd[i]);
            console.log(result[i])
            updateQuery = 'UPDATE `legislator` SET party_name = ?, ordinal = ?, phone = ? WHERE dept_cd = ?';
            updateResult = await db.queryParam_Parse(updateQuery, result[i]);
        }

        // Update party_cd
        const updatePartyQuery = 'UPDATE legislator, party LEFT JOIN legislator l ON l.party_name = party.party_name SET l.party_cd = party.party_cd';
        const updatePartyResult = await db.queryParam_None(updatePartyQuery);
    }
}