interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: T;
}

export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  let sampleData:Result<T> = {
    success: errMsg ? false : true,
    data
  }
  errMsg ? sampleData.errMsg = errMsg : null;
  return sampleData;
}