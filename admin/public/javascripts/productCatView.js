var productCatApp = angular.module('productCatApp',["ui.bootstrap"]);

productCatApp.controller('ProductCatController',function ProductCatController($scope,$http){
    $scope.products = [];
    $http.get("/api/products").then(function(result){
        $scope.products = result.data;
    },function (err){
        alert(err);
    });

});