const request = require('request');
const synReq = require('sync-request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const { serviceKey } = require('../config/api');

const url = 'http://apis.data.go.kr/9710000/NationalAssemblyInfoService/getMemberCurrStateList';

let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('400');

request({
    url: url + queryParams,
    method : 'GET'
}, async (error, response, body) => {
    const json = JSON.parse(xml2json.toJson(response.body));
    const item = json.response.body.items.item;

    let legi_name, legi_cd, dept_cd, reelection, region, city, profile_img;
    let legislator = new Array();
    let detail_legislator = new Array();

    for (let i in Object.keys(item)){
        legislator[i] = new Array();
        detail_legislator = new Array();

        legi_cd = JSON.stringify(item[i].num).replace(/['"]+/g, '');
        legi_cd = parseInt(legi_cd);
        legi_name = JSON.stringify(item[i].empNm).replace(/['"]+/g, '');
        dept_cd = JSON.stringify(item[i].deptCd).replace(/['"]+/g, '');
        dept_cd = parseInt(dept_cd);
        reelection = JSON.stringify(item[i].reeleGbnNm).replace(/['"]+/g, '');
        region = JSON.stringify(item[i].origNm).replace(/['"]+/g, '');
        city = region.split(' ')[0];
        profile_img = JSON.stringify(item[i].jpgLink).replace(/['"]+/g, '');

        legislator[i].push(legi_cd, legi_name, city, profile_img, dept_cd);
        detail_legislator[i].push(reelection);
    }
    //Insert into ligislator
    const insertQueryLegi = 'INSERT INTO legislator (legi_cd, legi_name, city, profile_img, dept_cd) VALUES ?';
    const insertResultLegi = await db.queryParam_Parse(insertQueryLegi, [legislator]);

     //Insert into detail_legislator
     const insertQueryDetail = 'INSERT INTO detail_legislator (legi_cd, region, reelection) VALUES ?';
     const insertResultDetail = await db.queryParam_Parse(insertQueryDetail, [detail_legislator]); 


});

module.exports = legislator;