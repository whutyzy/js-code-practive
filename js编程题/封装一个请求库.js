function xhr(config) {
    return new Promise((resolve, reject) => {
        const {
            data,
            method,
            url,
            validateStatus,
            responseType,
            timeout,
            withCredentials,
            headers = {},
            onDownloadProgress,
            onUploadProgress
        } = config
        const request = new XMLHttpRequest()
        request.open(method.toUpperCase(), url, true)
        configureRequest()
        addEvents()
        processHeaders()
        function configureRequest() {
            if (responseType) {
                request.responseType = responseType
            }
            if (timeout) {
                request.timeout = timeout
            }

            if (withCredentials) {
                request.withCredentials = withCredentials
            }
        }
        function addEvents() {
            request.onreadystatechange = function handleLoad() {
                if (request.readyState !== 4) {
                    return
                }

                if (request.status === 0) {
                    return
                }

                const responseHeaders = parseHeaders(
                    request.getAllResponseHeaders()
                )
                const responseData =
                    responseType && responseType !== 'text'
                        ? request.response
                        : request.responseText
                const response = {
                    data: responseData,
                    status: request.status,
                    statusText: request.statusText,
                    headers: responseHeaders,
                    config,
                    request
                }
                if (!validateStatus || validateStatus(response.status)) {
                    resolve(response)
                } else {
                    reject(
                        new Error(
                            `Request failed with status code ${response.status}`,
                            config,
                            null,
                            request,
                            response
                        )
                    )
                }
            }

            request.onerror = function handleError() {
                reject(createError('Network Error', config, null, request))
            }

            request.ontimeout = function handleTimeout() {
                reject(
                    createError(
                        `Timeout of ${config.timeout} ms exceeded`,
                        config,
                        'ECONNABORTED',
                        request
                    )
                )
            }
            if (onDownloadProgress) {
                request.onprogress = onDownloadProgress
            }

            if (onUploadProgress) {
                request.upload.onprogress = onUploadProgress
            }
        }

        function processHeaders() {
            Object.keys(headers).forEach((name) => {
                if (data === null && name.toLowerCase() === 'content-type') {
                    delete headers[name]
                } else {
                    request.setRequestHeader(name, headers[name])
                }
            })
        }

        request.send(data)
    })
}

export default class Axios {
    constructor(initConfig) {
        this.defaults = initConfig
    }

    dispatchRequest(config) {
        config.url = transformURL(config)
        config.data = transform(
            config.data,
            config.headers,
            config.transformRequest
        )
        config.headers = flattenHeaders(config.headers, config.method)
        return xhr(config).then(
            (res) => {
                return transformResponseData(res)
            },
            (e) => {
                if (e && e.response) {
                    e.response = transformResponseData(e.response)
                }
                return Promise.reject(e)
            }
        )
    }
    request(url, config) {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        config = mergeConfig(this.defaults, config)
        return this.dispatchRequest(config)
    }
    get(url, config) {
        return this.request(
            Object.assign(config || {}, {
                method: 'get',
                url
            })
        )
    }
}

function transformResponseData(res) {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}

function transform(data, headers, fns) {
    if (!fns) {
        return data
    }
    if (!Array.isArray(fns)) {
        fns = [fns]
    }
    fns.forEach((fn) => {
        data = fn(data, headers)
    })
    return data
}

export function buildURL(url, params, paramsSerializer) {
    if (!params) {
        return url
    }

    let serializedParams

    if (paramsSerializer) {
        serializedParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {
        serializedParams = params.toString()
    } else {
        const parts = []

        Object.keys(params).forEach((key) => {
            const val = params[key]
            if (val === null || typeof val === 'undefined') {
                return
            }
            let values = []
            if (Array.isArray(val)) {
                values = val
                key += '[]'
            } else {
                values = [val]
            }
            values.forEach((val) => {
                if (isDate(val)) {
                    val = val.toISOString()
                } else if (isPlainObject(val)) {
                    val = JSON.stringify(val)
                }
                parts.push(`${encode(key)}=${encode(val)}`)
            })
        })

        serializedParams = parts.join('&')
    }

    if (serializedParams) {
        const markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url
}


function createInstance(config)  {
  const instance = new Axios(config)
  return instance 
}

const axios = createInstance({})

axios.create = function create(config) {
    return createInstance(mergeConfig(defaults, config))
}

export default axios