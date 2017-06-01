angular.module('myApp.templates',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/templates',{
		templateUrl:'templates/templates.html',
		controller:'templateCtrl'
	}).
	when('/templates/:templateId',{
		templateUrl:'templates/templates-details.html',
		controller:'templateDetailsCtrl'
	});
}])
.controller('templateCtrl',['$scope','$http',function($scope,$http){
	$http.get('/json/templates.json').success(function(response){
		$scope.templates=response;
	});
}])
.controller('templateDetailsCtrl',['$scope','$routeParams','$http','$filter',function($scope,$routeParams,$http,$filter){
	
	$scope.templateId=$routeParams.templateId;
	console.log($scope.templateId);
	$http.get('/json/templates.json').success(function(response){
		$scope.template=$filter('filter')(response,function(r){
			return r.id==$scope.templateId;
		})[0];
		console.log($scope.template);
		
		$scope.MainName=$scope.template.name;
		$scope.MainImage=$scope.template.images[0].name;
		
		$scope.MainDescription=$scope.template.description;
		
		$scope.MainPrice=$scope.template.price;
		
		
	});
	$scope.setImage=function(image){
		$scope.MainImage=image.name;
	}
}]);