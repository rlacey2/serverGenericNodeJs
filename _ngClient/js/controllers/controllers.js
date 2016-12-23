var appControllers = angular.module('appControllers', []);
 

  appControllers.controller('PlaceboCtrl', ['$rootScope','$scope'  ,
        function($rootScope,$scope) {
      // a global controller in case needed
          console.log("PlaceboCtrl"); 

      		$rootScope.recaptchaCodeAvailable = false;			
 
 		}]); // PlaceboCtrl
 
appControllers.controller('HomeCtrl', ['$scope' ,
		function($scope) {
			
			$scope.name= "AngularNode101";
	 
		}]); // HomeCtrl
	
appControllers.controller('TestsCtrl', ['$scope',  
  function($scope) {
  
  }]); // TestCtrl	
	
appControllers.controller('AboutCtrl', ['$scope', 
  function($scope) {
  
  }]); // AboutCtrl		
	
	
appControllers.controller('recaptchaCtrl', [  '$scope', 'vcRecaptchaService', '$resource', '$http',  '$q',
    function( $scope,   vcRecaptchaService, $resource,  $http, $q) {
			
		$scope.reCapthchaPublicKey = "set me "; //reCapthchaPublicKey; // google?
 
	 
		
		var reCAPTCHAid = -1;
		
			$scope.formData	 = {}; // the formdata 
 // test data
 $scope.formData = { "name" : "alpha", "email": "alpha@example.com" , "password" : "sdfsdfs"}
 		
		
			
		var expCallback =	function ()
		{
		//	alert("expCallback");
		}		
		
		$scope.showResponse = function()
		{
			var recaptchaResponse = vcRecaptchaService.getResponse();
			alert(recaptchaResponse);
		}
			
			
		$scope.clearReCAPTCHA = function()
			{
				 
					  
				if (reCAPTCHAid > -1)   
				{
					 grecaptcha.reset(reCAPTCHAid); // reset the google reCAPTCHA
					 
				}
				else
				{
		    reCAPTCHAid = grecaptcha.render('captchadiv', {
								 'sitekey': $scope.reCapthchaPublicKey ,
								 'expired-callback': expCallback
          });		 	
 				
				}
				 
			}			 // clearReCAPTCHA	
			
			
		// 	test data to send to the server
	var doc = 	{"eventId":"222","eventName":"Workshop 1","type":"Workshops" };
 		
			 $scope.signUp = function(){
              console.log($scope.formData);
							$scope.result = {};
							var request = {};
							// prepare the request data for sending
							request.name =  $scope.formData.name
							request.email =  $scope.formData.email;
							request.password =  $scope.formData.password;
							request.data = doc;
							
							request.recaptchaResponse = vcRecaptchaService.getResponse(); // attach the request for server authenication
							
							// move this to a service for better solution using $q.defer
							var deferred = $q.defer();
							 $http.post('/api/v1/request', request)				
									.success(function(request) { 
														deferred.resolve(request);
											 }).error(function(msg, code) {
													deferred.reject({"error" : msg , "code" : code});
											 
											 });
							 //return deferred.promise;
							 
							 deferred.promise.then(function(result) {
								    $scope.result = result;
									$scope.clearReCAPTCHA();
							 },
							 function(error)
							 {
								$scope.result =   error; 
								$scope.clearReCAPTCHA();
							 });
							     
 
        } // signUp
 
 

 		  angular.element(document).ready(function () {
        // ensure the recaptch script is ready
				$scope.clearReCAPTCHA();
				
				});
 
 
			
			
		}]); // recpathcaCtrl
		
		
		function vcRecaptchaApiLoaded()
		{
			console.log("vcRecaptchaApiLoaded()");
			//var deferredRecaptcha = $q.defer(); 
			//deferred.resolve('recaptcha code loaded');
		}
