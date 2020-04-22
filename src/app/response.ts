import { HttpErrorResponse } from '@angular/common/http';

export class BasicResponse {
  constructor(success, errorMsg, result) {
    this.success = success;
    this.errorMsg = errorMsg;
    this.result = result;
  }
  success: boolean;
  errorMsg?: string;
  result?: any;
}

export function buildErrorResponse<T extends BasicResponse>(
  err: HttpErrorResponse
): T {
  console.log('buildErrorResponse with error:', err);
  const resp = <T>{};
  resp.success = false;
  resp.result = err;

  if (err.error === null) {
    resp.errorMsg = err.statusText;
    return resp;
  }

  if (err.error instanceof Error) {
    resp.errorMsg = err.error.message;
    return resp;
  }

  if (err.error.message) {
    resp.errorMsg = err.error.message;
    return resp;
  }

  if (err.message) {
    resp.errorMsg = err.message;
    return resp;
  }

  resp.errorMsg = JSON.stringify(err.error);
  return resp;
}
