import fetch from "cross-fetch";

/**
 * Performs HTTP GET request
 * @param url resource URL
 * @returns Promise<Response>
 */
const get = async (url: string) => {
  fetch(url);
};

/**
 * Performs HTTP POST request
 * @param url resource URL
 * @param body HTTP request body
 * @returns Promise<Response>
 */
const post = async (
  url: string,
  body: Record<string, unknown>
): Promise<Response> =>
  fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

/**
 * Performs HTTP PUT request
 * @param url resource URL
 * @param body HTTP request body
 * @returns Promise<Response>
 */
const put = async (
  url: string,
  body: Record<string, unknown>
): Promise<Response> =>
  fetch(url, {
    method: "put",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

/**
 * Performs HTTP PATCH request
 * @param url resource URL
 * @param body HTTP request body
 * @returns Promise<Response>
 */
const patch = async (
  url: string,
  body: Record<string, unknown>
): Promise<Response> =>
  fetch(url, {
    method: "patch",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

/**
 * Performs HTTP DELETE request
 * @param url resource URL
 * @returns Promise<Response>
 */
const del = async (
  url: string,
  body: Record<string, unknown>
): Promise<Response> => fetch(url, { method: "delete" });

export const HttpService = { get, post, put, patch, del };
