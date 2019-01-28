const request = require('sync-request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const { serviceKey } = require('../config/api');
let { url } = require('../config/api');

module.exports = {
    party : async() => {
        url += 'getPolySearch';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;

        const response = await request('GET', url + queryParams);
        
        const json = JSON.parse(xml2json.toJson(response.body));
        const item = json.response.body.items.item;

        let name, code;
        // let result = new Array();
        const insertQuery = 'INSERT INTO party VALUES ?, ?';

        for (let i in Object.keys(item)){
            // result[i] = new Array();

            code = JSON.stringify(item[i].polyCd).replace(/['"]+/g, '');
            code = parseInt(code);
            name = JSON.stringify(item[i].polyNm).replace(/['"]+/g, '');
           
            console.log(code)
            console.log(name)
             // result[i].push(code, name);
            
            const insertResult = await db.queryParam_Arr(insertQuery, code, name);
            // const insertResult = await db.queryParam_Parse(insertQuery, [result]);
            console.log(insertQuery)
            console.log(insertResult);
        }

        // const insertQuery = 'INSERT INTO party VALUES ?';
        // const insertResult = await db.queryParam_Parse(insertQuery, [result]);
        // console.log(insertResult);
    }
}