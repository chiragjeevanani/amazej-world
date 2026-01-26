export function getQueryVar(varName) {
    const queryStr = unescape(window.location.search) + '&';

    const regex = new RegExp('.*?[&\\?]' + varName + '=(.*?)&.*');

    const val = queryStr.replace(regex, "$1");

    return val == queryStr ? false : val;
}
