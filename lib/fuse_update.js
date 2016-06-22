var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fuseRoute() {
    var fuse = new express.Router();
    fuse.use(cors());
    fuse.use(bodyParser());


    // GET REST endpoint - query params may or may not be populated
    fuse.all('/', function(req, res) {
        // FUSE URL (Pending Fuse deployment on OpenShift + AWS for public IP's):
        // http://localhost:9191/opportunity/updateOpp/00628000008yT2Y/CLOSEWON

        var getListUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/opportunity/updateOpp';

        request.get({
            url: getListUrl,
            json: true
        }, function(error, response, body) {
            if (error) {
                return res.status(500).json(error);
            }
            return res.json(body);
        });
    });

    return fuse;
}

module.exports = fuseRoute;
