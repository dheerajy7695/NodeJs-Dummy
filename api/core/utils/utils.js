

module.exports.formatError = (value) => {
    if (value && value.code == 11000) {
        let keyData = (Object.keys(value.keyValue)[0]);
        let keyValueData = value.keyValue[keyData];
        let message = "Duplicate key error for " + keyData + ":" + keyValueData;
        return message;
    } else {
        return value.message;
    }
};

module.exports.formatData = (req, status, value) => {
    let resPayload;
    if (status) {
        resPayload = {
            reqId: req.headers.reqId,
            status: status,
            value
        }
    } else {
        resPayload = {
            reqId: req.headers.reqId,
            status: status,
            error: value
        }
    }
    return resPayload;
};