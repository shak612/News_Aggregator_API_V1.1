const { getNewsService } = require("../services/newsServices/getNewsService");
const { getNewsReadService } = require("../services/newsServices/getNewsRead");
const { postNewsReadService } = require("../services/newsServices/postNewsRead");
const { getNewsFavoriteService } = require("../services/newsServices/getNewsFavorite");
const { postNewsFavoriteService } = require("../services/newsServices/postNewsFavorite");
const { getNewsSearchService } = require("../services/newsServices/getNewsSearch");

exports.getNewsController = (req, res) => {
    getNewsService(req.user, req.message).then((response) => {
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

exports.getNewsReadController = (req, res) => {
    getNewsReadService(req.user, req.message).then((response) => {
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

exports.postNewsReadController = (req, res) => {
    postNewsReadService(req.user, req.message, req.params.id).then((response) => {
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

exports.getNewsFavoriteController = (req, res) => {
    getNewsFavoriteService(req.user, req.message).then((response) => {
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

exports.postNewsFavoriteController = (req, res) => {
    postNewsFavoriteService(req.user, req.message, req.params.id).then((response) => {
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

exports.getNewsSearchController = (req, res) => {
    getNewsSearchService(req.user, req.message, req.params.keyword).then((response) => {
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