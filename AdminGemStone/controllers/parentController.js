'use strict';

angular.module('loginApp').
controller('ParentController', ['$http','$scope', '$rootScope', '$modal', 'Auth', 'AUTH_EVENTS','USER_ROLES',
function($http,$scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES){
	// this is the parent controller for all controllers.
	// Manages auth login functions and each controller
	// inherits from this controller	

$scope.enterAgents=function() {
	var firstname = this.firstName;
	var lastname = this.lastName;
	var username = this.userName;
	var location = this.locationName;
	var emailid = this.emailId;
	var contact = this.contactNames;

	$http.get("http://localhost:17681/api/insertAgents?username=" + username)
		.then(function onFulfilled(response) {
			$scope.getUsernames = response.data;
			var getUsername = $scope.getUsernames;
			console.log(getUsername);
			var checkUserName = getUsername[0].userName;
			console.log(checkUserName);
			if (checkUserName == username) {
				alert("Username Already Exists...");
			}
		}).catch(function onRejected(response) {
		var request = $http({
			method: "post",
			url: "http://localhost:17681/api/insertAgents",
			crossDomain: true,
			data: {
				firstName: firstname,
				lastName: lastname,
				userName: username,
				locationName: location,
				emailId: emailid,
				contact: contact
			},
			headers: {'Content-Type': 'application/json'}
		})
			.success(function (resp) {

				//alert(resp);
				//further code will refresh the current database data on page
				alert("Registered Successfully...");
				//window.location='./main.html';
				//alert("success");
			})
		alert("second line");
		/*this.firstName = "";
		 this.lastName = "";
		 this.userName = "";
		 this.locationName = "";
		 this.emailId = "";
		 this.contactName = "";*/
	})
}

$scope.approve_req=function()
{
	console.log("approve");
	var agents_id=this.agents_id;
	$http.get("http://localhost:17681/api/userRegisters/"+agents_id)
		.success(function(res){
			$scope.getAgentsData=res;
			var getAgents=$scope.getAgentsData;
			var userName_ag=getAgents.userName;
			var firstName_ag=getAgents.firstName;
			var lastname_ag=getAgents.lastName;
			var location_ag=getAgents.locationName;
			var city_ag=getAgents.city;
			var emailid_ag=getAgents.emailId;
			var contact_ag=getAgents.contact;
			var password_ag='abcd1234';
			var request = $http({
				method: "post",
				url: "http://localhost:17681/api/perUserRegisters",
				crossDomain: true,
				data: {
					firstName: firstName_ag,
					lastName: lastname_ag,
					userName: userName_ag,
					locationName: location_ag,
					emailId: emailid_ag,
					contact: contact_ag,
					city: city_ag,
					passWord:password_ag
				},
				headers: {'Content-Type': 'application/json'}
			})
				.success(function (resp) {

					//alert(resp);
					//further code will refresh the current database data on page
					alert("Done Successfully...");
					//window.location='./main.html';
					//alert("success");
				})

			$http.delete("http://localhost:17681/api/userRegisters/"+agents_id)
				.success(function(res){

					alert("deleted");
				})
		})

}

	$scope.decline=function()
	{
		var decline_id=this.id_dec;
		$http.delete("http://localhost:17681/api/userRegisters/"+decline_id)
			.success(function(res){
				alert("deleted");
			})
	}

	$scope.approveStone=function()
	{
		var stone_id=this.stone_id;

		console.log("approve");
		$http.get("http://localhost:17681/api/itemDetails/"+stone_id)
			.success(function(res){
				$scope.getStonesData=res;
				var getStonesData=$scope.getStonesData;
				var userNamess_st=getStonesData.userNames;
				var presemi_st=getStonesData.preSemi;
				var ptype_st=getStonesData.pType;
				var sname_st=getStonesData.sName;
				var stonesize_st=getStonesData.stoneSize;
				var sweight_st=getStonesData.sWeight;
				var spieces_st=getStonesData.sPieces;
				var sdimensions_st=getStonesData.sDimensions;
				var sorigin_st=getStonesData.sOrigin;
				var color_st=getStonesData.sColor;
				var stoneshape_st=getStonesData.stoneShape;
				var sremark_st=getStonesData.sRemark;
				var sceragency_st=getStonesData.scerAgency;
				var scarat_st=getStonesData.sCarat;
				var stockid_st=getStonesData.stockId;
				var supplier_st=getStonesData.sSupplierRef;
				var spurchase_st=getStonesData.sPurchase;

				var request = $http({
					method: "post",
					url: "http://localhost:17681/api/perItemDetails",
					crossDomain: true,
					data: {
						userNames:  userNamess_st,
						preSemi: presemi_st,
						pType: ptype_st,
						sName: sname_st,
						stoneSize: stonesize_st,
						sWeight: sweight_st,
						sPieces:spieces_st ,
						sDimensions:sdimensions_st,
						sOrigin : sorigin_st,
						sColor : color_st,
						stoneShape : stoneshape_st,
						sRemark : sremark_st,
						scerAgency :sceragency_st,
						sCarat : scarat_st,
						stockId : stockid_st,
						sSupplierRef : supplier_st,
						sPurchase : spurchase_st
					},
					headers: {'Content-Type': 'application/json'}
				})
					.success(function (resp) {

						//alert(resp);
						//further code will refresh the current database data on page
						alert("Done Successfully...");
						//window.location='./main.html';
						//alert("success");
					})

				$http.delete("http://localhost:17681/api/itemDetails/"+stone_id)
					.success(function(res){

						alert("deleted");
					})
			})

	}

	$scope.updateItems=function()
	{
		var edit_i=this.edit_i;
		$http.get('http://localhost:17681/api/perItemDetails/' + edit_i)
			.success(function (res) {
				console.log(res);
				$scope.getupExpenss = res;

				var pushTextExpenses = $scope.getupExpenss;
				$scope.meraId=pushTextExpenses.id;
				$scope.sname = pushTextExpenses.sName;
				$scope.userAgent = pushTextExpenses.userNames;
				$scope.ptype = pushTextExpenses.pType;
				$scope.upbtn = true;
			});

	}

	$scope.updateSave=function()
	{
		var updateid=this.meraId;
		var bb2price=this.bbprice;
		var maxbbPrice=this.mpbbprice;
		var vipPrice=this.vip_price;
		var retailPrice=this.retailprice;
		var sname=this.sname;
		var ptype=this.ptype;
		var useragent=this.userAgent;
		var obj = {
			bbPrice: bb2price,
			maxbbPrice: maxbbPrice,
			vipPrice: vipPrice,
			retailPrice:retailPrice,
			userNames:useragent,
			pType:ptype,
			sName:sname
		};

		$http({
			method: 'put',
			url: "http://localhost:17681/api/perItemDetails/" + updateid,
			data: JSON.stringify(obj),
			headers: {
				'Content-Type': 'application/json'
			}
		}).
		success(function (data, status, headers, config) {
			alert("updated succesfully");
		}).
		error(function (data, status, headers, config) {
			console.log('Error: ' + status);
		});
	}

	$http.get("http://localhost:17681/api/insertAgents")
		.success(function(res){
			$scope.getInsertAgents=res;
			var getInsertAgents=$scope.getInsertAgents;

		})
	$http.get("http://localhost:17681/api/userRegisters")
		.success(function(res){
			$scope.getUserRegisters=res;

		})
	$http.get("http://localhost:17681/api/itemDetails")
		.success(function(res){
			$scope.getItemDetails=res;

		})

	$http.get("http://localhost:17681/api/perItemDetails")
		.success(function(res){
			$scope.getEditItems=res;

		})

	$scope.declineStone=function()
	{
		var reject_id=this.reject_id;
		$http.delete("http://localhost:17681/api/itemDetails/" + reject_id)
			.success(function (res) {
				console.log("deleted");
			})
	}
	$scope.modalShown = false;
	var showLoginDialog = function() {
		if (!$scope.modalShown) {
			$scope.modalShown = true;
			var modalInstance = $modal.open({
				templateUrl: 'templates/login.html',
				controller: "LoginCtrl",
				backdrop: 'static',
			});

			modalInstance.result.then(function () {
				$scope.modalShown = false;
			});
		}
	}
	
	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	}
	
	var showNotAuthorized = function(){
		alert("Not Authorized");
	}
	
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = Auth.isAuthorized;

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	
} ]);