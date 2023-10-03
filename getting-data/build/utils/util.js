"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
const getResponseData = (data, errMsg) => {
    let sampleData = {
        success: errMsg ? false : true,
        data
    };
    errMsg ? sampleData.errMsg = errMsg : null;
    return sampleData;
};
exports.getResponseData = getResponseData;
