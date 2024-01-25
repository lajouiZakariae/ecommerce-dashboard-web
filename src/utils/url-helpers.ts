import { forOwn, omitBy } from 'lodash';

export const resolveQueryParamsString = (params: object): string =>
    Object.entries(params)
        .filter(([_, value]) => value)
        .map((searchParam) => searchParam.join('='))
        .join('&');

export const appendSearchParams = (
    prev: URLSearchParams,
    toAppend: object,
): URLSearchParams => {
    let params: { [key: string]: string } = {};

    // take previous params
    for (const [key, value] of prev) params[key] = value;

    // append new params
    forOwn(toAppend, (value, key) => (params[key] = value));

    // clear empty params
    params = omitBy(params, (v) => v === '' || v === null);

    // assign to search params
    const urlSearchParams = new URLSearchParams();

    forOwn(params, (value, key) => urlSearchParams.set(key, value));

    return urlSearchParams;
};
