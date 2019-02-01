const db = require('../module/pool');

module.exports = {
    getInfo : async() => {
        const selectCdQuery = 'SELECT dept_cd FROM legislator';
        const CdResult = await db.queryParam_None(selectCdQuery);
        const code = [];
        for (let i = 0; i < CdResult.length; i++) {
            code[i] = CdResult[i].dept_cd;
        }

        return code;
    }
}
