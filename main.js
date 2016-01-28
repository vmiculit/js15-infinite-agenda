
angular.module("js15",[])

angular.module("js15")
	.controller("js15Troller",["$scope", function($scope) {

	$scope.dayContainer = [
		{	name : "Sunday",
		 	date : 21,
		 	month: "January",
		 	year : 2016,
		 	hours : [
		 		{	hour : 1,
		 			meridiem : "am",
		 			tasks : [
		 				{
		 					content : "Pickup Groceries..."
		 				}

		 			]
		 		}
		 	]
		}
	]

	}])

			





