const { getPreferencesService } = require("../services/preferencesServices/getPreferencesSerivce");
const { putPreferencesService } = require("../services/preferencesServices/putPreferencesService");

exports.getPreferencesController = (req, res) => {
    getPreferencesService(req.user, req.message).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.putPreferencesController = (req, res) => {
    putPreferencesService(req.user, req.message, req.body).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.message
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}
