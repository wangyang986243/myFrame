/**
 * 统一的请求 api
 * @params arg [Object] 调用地方传参数进来
 */
import instance from '@/axios/instance.js';
import Config from '@/config';

// post
export const _post = arg => {
	return instance.post(`${arg.url}`, arg.params, {
		timeout: arg.timeout || Config.defaultTimeout,
		showLoading: !arg.noShowLoading,
		loadingMessage: arg.loadingMessage,
		contentType: arg.contentType,
		responseType: arg.responseType || Config.responseType,
		...arg.extra
	})
};

// delete
export const _delete = arg => {
	return instance.delete(`${arg.url}`, {
		data: arg.params
	}, {
		timeout: arg.timeout || Config.defaultTimeout,
		showLoading: !arg.noShowLoading
	});
};
// put
export const _put = arg => {
	return instance.put(`${arg.url}`, arg.params, {
		timeout: arg.timeout || Config.defaultTimeout,
		showLoading: !arg.noShowLoading,
		contentType: arg.contentType
	});
};

// get
export const _get = arg => {
	if (arg.query) {
		Object.keys(arg.query).forEach(key => {
			let flag = arg.url.indexOf('?') !== -1 ? '&' : '?';
			arg.url += `${flag}${key}=${arg.query[key]}`;
		})
	}
	if (arg.params) {
		Object.keys(arg.params).forEach(key => {
			let flag = arg.url.indexOf('?') !== -1 ? '&' : '?';
			arg.url += `${flag}${key}=${arg.params[key]}`;
		})
	}
	return instance.get(`${arg.url}`, {
		timeout: arg.timeout || Config.defaultTimeout,
		showLoading: !arg.noShowLoading,
		responseType: arg.responseType || Config.responseType
	})
};

// patch
export const _patch = arg => {
	return instance.patch(`${arg.url}`, {
		timeout: arg.timeout || Config.defaultTimeout,
		showLoading: !arg.noShowLoading
	});
};
