const request = require('request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const getCode = require('./getCode');
const getUrl  = require('./getUrl');
const { serviceKey } = require('../config/api');
const url = 'http://apis.data.go.kr/9710000/NationalAssemblyInfoService/getMemberDetailInfoList';

let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('300');

console.log(queryParams)
async function getDetail(err){
    const dept_cd = await getCode.getInfo();
    if(err) return;

    let result = new Array();

    for (let i = 0; i < dept_cd.length; i++){
        result[i] = await getUrl.getParam(url, queryParams, dept_cd[i]);
        console.log(result[i])
    }

    // const insertQuery = 'INSERT INTO legislator VALUES ?';
    // const insertResult = await debug.queryParams_Parse(insertQuery);
    // const detailQuery = 'INSERT INTO detail_legislator VALUES ?';
    // const detailResult = await debug.queryParams_Parse(detailQuery);
}

getDetail();