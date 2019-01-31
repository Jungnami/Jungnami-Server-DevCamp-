const request = require('sync-request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const { serviceKey } = require('../config/api');
let { url } = require('../config/api');

module.exports = {
    legislator : async() => {
        url += 'getMemberCurrStateList';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('400');

        const response = await request('GET', url + queryParams);
        const json = JSON.parse(xml2json.toJson(response.body));
        const item = json.response.body.items.item;

        let legi_name, legi_cd, dept_cd, reelection, region, city, profile_img;
        let legislator = new Array();

        for (let i in Object.keys(item)){
            legislator[i] = new Array();
            
            dept_cd = JSON.stringify(item[i].deptCd).replace(/['"]+/g, '');
            dept_cd = parseInt(dept_cd);
            legi_cd = JSON.stringify(item[i].num).replace(/['"]+/g, '');
            legi_cd = parseInt(legi_cd);
            legi_name = JSON.stringify(item[i].empNm).replace(/['"]+/g, '');
            reelection = JSON.stringify(item[i].reeleGbnNm).replace(/['"]+/g, '');
            region = JSON.stringify(item[i].origNm).replace(/['"]+/g, '');
            city = region.split(' ')[0];
            profile_img = JSON.stringify(item[i].jpgLink).replace(/['"]+/g, '');

            legislator[i].push(legi_cd, legi_name, city, region, profile_img, dept_cd, reelection);
        }
        
        //Insert into ligislator
        const insertLegiQuery = 'INSERT INTO legislator(legi_cd, legi_name, city_name, region, profile_img, dept_cd, reelection) VALUES ?';
        const insertLegiResult = await db.queryParam_Parse(insertLegiQuery, [legislator]);

        //Update city_cd
        const insertCityQuery = 'UPDATE legislator, city LEFT JOIN legislator l ON l.city_name = city.city_name SET l.city_cd = city.city_cd';
        const insertCityResult = await db.queryParam_None(insertCityQuery);
    }
}
