'use strict';

angular.module('users').controller('PhoneBuzzController', ['$scope', '$http', '$location', 'Authentication', 'Caller',
	function($scope, $http, $location, Authentication, Caller) {

		$scope.init = function() {
			Caller.getCallRecords(function(records){
				$scope.callRecords = records;
				console.log(records);
            });
		};

		$scope.redial = function(record) {
			Caller.getCallerInfo(function(info){
				var callInfo = {};
				callInfo.from = info.from;
				callInfo.accountSID = info.accountSID;
				callInfo.authToken = info.authToken;
				callInfo.to = record.to;
				callInfo.saveRecord = true;

				$scope.submitMessage = "Call Submited";
				console.log(callInfo);

				$http.post('/phaseThree', callInfo).success(function(response) {
					console.log(response);
					$scope.init();
				}).error(function(response) {
					$scope.error = response.err;
				});
            });
		};

		$scope.storeCredentials = function() {
			if($scope.caller && $scope.caller.from && $scope.caller.accountSID && $scope.caller.authToken){
				Caller.storeCallerInfo($scope.caller, function(info){
					$scope.homePageMessage = "Information successfully updated";
					console.log(info);
					Caller.getCallerInfo(function(info2){
						console.log(info2);
					});
	            });
			}else{
				$scope.homePageMessage = "All three inputs are required!";
			}
		};

		$scope.call = function(saveRecord) {
			if($scope.credentials && $scope.credentials.to){
				Caller.getCallerInfo(function(info){
					var callInfo = {};
					callInfo.from = info.from;
					callInfo.accountSID = info.accountSID;
					callInfo.authToken = info.authToken;
					callInfo.to = $scope.credentials.to;

					if( $scope.credentials.sec ){
						callInfo.sec = $scope.credentials.sec;
					}
					if(saveRecord){
						callInfo.saveRecord = true;
					}

					$scope.submitMessage = "Call Submited";
					console.log(info);

					$http.post('/phaseThree', callInfo).success(function(response) {
						console.log(response);
						console.log("Done processing")
						$scope.init();
					}).error(function(response) {
						$scope.error = response.err;
					});
	            });
			}else{
				$scope.submitMessage = "Number to call is required!";
			}
		};
	}
]);