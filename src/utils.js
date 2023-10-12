import Cookies from "js-cookie";

/**
 * The function `compareObj` compares two objects and returns true if they have the same keys and
 * values, and false otherwise.
 * @param newObj - An object representing the new data to compare.
 * @param prevObj - The `prevObj` parameter is an object representing the previous state or values.
 * @returns a boolean value. It returns `false` if the length of the keys in `newObj` is not equal to
 * the length of the keys in `prevObj` or if any of the values of the keys in `newObj` do not match the
 * values of the corresponding keys in `prevObj`. It returns `true` if all the keys and values in `new
 */
export const compareObj = (newObj, prevObj) => {
	const resObjKeys = Object.keys(newObj);
	const cookiesObjKeys = Object.keys(prevObj);
	if (resObjKeys.length !== cookiesObjKeys.length) {
		return false;
	} else {
		for (let key of resObjKeys) {
			if (resObjKeys[key] !== cookiesObjKeys[key]) {
				return false;
			}
		}
		return true;
	}
};

/**
 * The function `setCookie` is used to set a cookie with a given key, value, and options.
 * @param key - The key parameter is a string that represents the name of the cookie. It is used to
 * identify the cookie when retrieving or deleting it.
 * @param value - The value parameter is the data that you want to store in the cookie. It can be any
 * valid JavaScript value, such as a string, number, boolean, object, or array.
 * @param options - The `options` parameter is an object that can contain various options for setting
 * the cookie. Some common options include:
 */
export const setCookie = (key, value, options) =>
	Cookies.set(key, JSON.stringify(value), options);

/**
 * The `getCookie` function retrieves a cookie value by its key and returns it as a parsed JSON object
 * if it exists, otherwise it returns an empty string.
 * @param key - The key parameter is a string that represents the name of the cookie you want to
 * retrieve.
 */
export const getCookie = (key) =>
	Cookies.get(key) ? JSON.parse(Cookies.get(key)) : "";

/**
 * The function `copyToClipboard` uses the `navigator.clipboard` API to copy the provided `text` to the
 * clipboard.
 * @param text - The `text` parameter is the text that you want to copy to the clipboard.
 */
export const copyToClipboard = async (text) => {
	await navigator.clipboard.writeText(text);
	alert("Copied Text:" + text);
};
