const db = require('../module/pool');

module.exports = {
    getInfo : async() => {
        const selectCdQuery = 'SELECT deptCd FROM legislator';
        const CdResult = await db.queryParam_None(selectCdQuery);
        const code = [];
        console.log(CdResult)
        for (let i = 0; i < CdResult.length; i++) {
            code[i] = CdResult[i].deptCd;
        }

        return code;
    }
}
