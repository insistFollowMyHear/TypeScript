interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}

export const getResponseData = (data: any, errMsg?: string): Result => {
  let sampleData:Result = {
    success: errMsg ? false : true,
    data
  }
  errMsg ? sampleData.errMsg = errMsg : null;
  return sampleData;
}