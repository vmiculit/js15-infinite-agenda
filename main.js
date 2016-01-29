
angular.module("js15",[])

angular.module("js15")
	.controller("js15Troller",["$scope","$window", "$timeout", "$interval", "$location", "$anchorScroll", function($scope, $window, $timeout, $interval, $location, $anchorScroll) {

	// Create an Empty Day Container

	$scope.dayContainer = []

	// Set Today's date

	$scope.today = new Date()

	// Set Counters in both directions

	$scope.futureCounter = 1
	$scope.pastCounter = 1


	// Find and Set Yesterday's Date

	$scope.findPreviousDayDate = function() {
		var date = new Date($scope.today)
		date.setDate($scope.today.getDate() - $scope.pastCounter)
		return date
	}

	$scope.previousDay = $scope.findPreviousDayDate()

	// Find and Set Tomorrow's Date

	$scope.findNextDayDate = function(offset) {
		var date = new Date($scope.today)
		date.setDate($scope.today.getDate() + offset)
		return date
	}

	$scope.nextDay = $scope.findNextDayDate()

	// Function that creates the Day Hours as an Array

	var hourMaker = function() {
		var hoursArray = []

		for (var i = 0; i <= 23; i++) {
			if (i <= 11) {
				hoursArray.push({hour : i+1, meridiem : "am", tasks : [{content : "Test", show : true, edit : false}], background : "#ecf0f1"})
			} else {
				hoursArray.push({hour : i-11, meridiem : "pm", tasks : [{content : "", show : true, edit : false}], background : "#bdc3c7"})
			}
		}
		return hoursArray
	}

	//Function that creates the Day Object and pushes it into our Day Container

	var dayMaker = function(desiredDate, anchorId) {
		var dayObject = {}

		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December']

		if (desiredDate === $scope.today) {
			dayObject["name"] = days[desiredDate.getDay()]
		 	dayObject["date"] = desiredDate.getDate()
		 	dayObject["month"]= months[desiredDate.getMonth()]
		 	dayObject["year"] = desiredDate.getFullYear()
		 	dayObject["anchor"] = "today"
		 	dayObject["hours"] = hourMaker()

		 	$scope.dayContainer.push(dayObject)

		} else if (desiredDate > $scope.today) {
			dayObject["name"] = days[desiredDate.getDay()]
		 	dayObject["date"] = desiredDate.getDate()
		 	dayObject["month"]= months[desiredDate.getMonth()]
		 	dayObject["year"] = desiredDate.getFullYear()
		 	dayObject["anchor"] = "f" + anchorId
		 	dayObject["hours"] = hourMaker()

		 	$scope.dayContainer.push(dayObject)
		 	$scope.futureCounter += 1
		} else {
			dayObject["name"] = days[desiredDate.getDay()]
		 	dayObject["date"] = desiredDate.getDate()
		 	dayObject["month"]= months[desiredDate.getMonth()]
		 	dayObject["year"] = desiredDate.getFullYear()
		 	dayObject["anchor"] = "p" + anchorId
		 	dayObject["hours"] = hourMaker()

		 	$scope.dayContainer.unshift(dayObject)
		 	$scope.pastCounter += 1
		}
	}

	// Initialize Page & Set Anchor

	dayMaker($scope.today)
	$location.hash("today")

	// Create 2 days in the Future

	dayMaker($scope.findNextDayDate($scope.futureCounter), $scope.futureCounter)
	dayMaker($scope.findNextDayDate($scope.futureCounter), $scope.futureCounter)

	// Create 2 days in the Past

	dayMaker($scope.findPreviousDayDate($scope.pastCounter), $scope.pastCounter)
	dayMaker($scope.findPreviousDayDate($scope.pastCounter), $scope.pastCounter)

	// Scroll to #Anchor

	$anchorScroll()
	$anchorScroll.yOffset = 75

	// Check every second for scrolling and add days as needed

	$interval (function () {

		var scrollTop = document.scrollingElement.scrollTop
		var scrollHeight = document.documentElement.scrollHeight
		var scrollRatio = scrollTop/scrollHeight

		if (scrollRatio > .60) {

			dayMaker($scope.findNextDayDate($scope.futureCounter), $scope.futureCounter)

		} else if (scrollRatio < .20){

			$location.hash("p" + ($scope.pastCounter - 3))
			dayMaker($scope.findPreviousDayDate($scope.pastCounter), $scope.pastCounter)
			dayMaker($scope.findPreviousDayDate($scope.pastCounter), $scope.pastCounter)
			$anchorScroll()

		}

	}, 100)

	// Adding, editing & removing content items

	$scope.addNewTask = function(dayIndex, timeIndex) {
		$scope.dayContainer[dayIndex].hours[timeIndex].tasks.push({content : "", show : false, edit : true})
	}

	$scope.editNote = function(dayIndex, timeIndex, idx) {
		$scope.dayContainer[dayIndex].hours[timeIndex].tasks[idx].show = false
		$scope.dayContainer[dayIndex].hours[timeIndex].tasks[idx].edit = true
	}

	}])

			





