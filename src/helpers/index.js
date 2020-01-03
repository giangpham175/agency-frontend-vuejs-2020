export const catchError = function(data) {
    let errorText = "";
    if (data.message && typeof data.mess === "string" && data.error && typeof data.error === "string") {
        errorText = data.message + "<br>" + data.error;
    } else if (data.error && typeof data.error === "object" && Object.keys(data.error).length !== 0) {
        if (data.error.errors && typeof data.error.errors === "object") {
            errorText = handleErrorObject(data.error.errors);
        } else {
            errorText = handleErrorObject(data.error);
        }
    } else if (data.message && typeof data.message === "object" && Object.keys(data.message).length !== 0) {
        if (data.message.error && typeof data.message.error === "object") {
            errorText = handleErrorObject(data.message.error);
        } else {
            errorText = handleErrorObject(data.message);
        }
    } else if (data.mess && typeof data.mess === "string") {
        errorText = data.mess;
    } else if (data.message && typeof data.message === "string") {
        errorText = data.message;
    } else if (data.error && typeof data.error === "string") {
        errorText = data.error;
    } else if (data.res && typeof data.res.error === "string") {
        errorText = data.res.error;
    }
    errorText = typeof errorText === "string" && errorText ? translateError(errorText) : null;
    return errorText;
};
const handleErrorObject = function(error) {
    let errorText = "";
    for (const key in error) {
        if (error.hasOwnProperty(key)) {
            if (Array.isArray(error[key])) {
                if (error[key][0].match(/taken/)) {
                    errorText += key + " đã tồn tại trong hệ thống, vui lòng thử lại" + "\n";
                } else if (error[key][0].match(/valid/)) {
                    errorText += key + " không hợp lệ, vui lòng thử lại" + "\n";
                } else if (error[key][0].match(/not match/)) {
                    errorText += key + " không chính xác" + "\n";
                } else if (error[key][0].match(/required/)) {
                    errorText += "Vui lòng nhập " + key + "\n";
                } else {
                    errorText += error[key][0] + "\n";
                }
            } else if (error[key].match(/taken/)) {
                errorText += key + " đã tồn tại trong hệ thống, vui lòng thử lại" + "\n";
            } else if (error[key].match(/valid/)) {
                errorText += key + " không hợp lệ, vui lòng thử lại" + "\n";
            } else if (error[key].match(/not match/)) {
                errorText += key + " không chính xác" + "\n";
            } else if (error[key].match(/required/)) {
                errorText += "Vui lòng nhập " + key + "\n";
            } else {
                errorText += key + ": " + error[key] + "\n";
            }
        }
    }
    return errorText;
};
const translateError = function(text) {
    text = text.replace("Trường number", "Số lượng");
    text = text.replace("Trường days", "Số ngày");
    text = text.replace("We cant find an account with this credentials.", "Sai tên đăng nhập hoặc mật khẩu, vui lòng thử lại.");
    return text;
};
export const facebookPostUrlToId = function(url) {
    var result = null;
    if (url.indexOf("facebook.com") < 0) {
        result = url;
    } else {
        var postId = url.match(/(.*)\/posts\/([0-9]{8,})/);
        var photoId = url.match(/(.*)\/photo.php\?fbid=([0-9]{8,})/);
        var videoId = url.match(/(.*)\/video.php\?v=([0-9]{8,})/);
        var storyId = url.match(/(.*)\/story.php\?story_fbid=([0-9]{8,})/);
        var linkId = url.match(/(.*)\/permalink.php\?story_fbid=([0-9]{8,})/);
        var otherId = url.match(/(.*)\/([0-9]{8,})/);
        var commentId = url.match(/(.*)comment_id=([0-9]{8,})/);
        if (postId) {
            result = postId[2];
        } else {
            if (photoId) {
                result = photoId[2];
            } else {
                if (videoId) {
                    result = videoId[2];
                } else {
                    if (storyId) {
                        result = storyId[2];
                    } else {
                        if (linkId) {
                            result = linkId[2];
                        } else {
                            if (otherId) {
                                result = otherId[2];
                            }
                        }
                    }
                }
            }
        }
        if (commentId) {
            result += "_" + commentId[2];
        }
    }
    return result;
};
export const buildParamQuery = function(params) {
    let esc = encodeURIComponent;
    let keyArray = [];
    for (const key in params) {
        if (params.hasOwnProperty(key) && (params[key] || params[key] === 0)) {
            keyArray.push(key);
        }
    }
    let query = keyArray.map(k => esc(k) + "=" + esc(params[k])).join("&");
    return query ? "?" + query : "";
};
export const removeUnicode = function(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
};
