const request = require('sync-request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const { serviceKey } = require('../config/api');
let { url } = require('../config/api');

module.exports = {
    region : async() => {
        url += 'getLocalSearch';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('200');

        const response = await request('GET', url + queryParams);

        const json = JSON.parse(xml2json.toJson(response.body));
        const item = json.response.body.items.item;

        let region_cd, city, region_name;
        let result = new Array();

        for (let i in Object.keys(item)){
            result[i] = new Array();

            region_cd = JSON.stringify(item[i].origCd).replace(/['"]+/g, '');
            region_name = JSON.stringify(item[i].origNm).replace(/['"]+/g, '');
            city = region_name.split(' ')[0]; 
            
            result[i].push(region_cd, city, region_name);
        }

        const insertQuery = 'INSERT INTO region VALUES ?';
        const insertResult = await db.queryParam_Parse(insertQuery, [result]);
        console.log(insertResult);

        const cityQuery = 'INSERT INTO city (city_name) SELECT region_name FROM region GROUP BY city'
        const cityResult = await db.queryParam_None(cityQuery);
        console.log(cityResult);
    }
}