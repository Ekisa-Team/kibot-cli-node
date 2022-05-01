export class HTTPResponseError extends Error {
  response!: Response;

  constructor(r: Response) {
    super(`HTTP Error response: ${r.status} ${r.statusText}`);
    this.response = r;
  }
}

export const checkHttpStatus = (response: Response) => {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
};
