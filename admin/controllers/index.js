(function (homeController) {
    
    homeController.getIndex = function (req, res, next) {
        res.render('index', { title: 'B2BSupport', description : 'Self-Service Portal' });

    }

})(module.exports)