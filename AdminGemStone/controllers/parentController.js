'use strict';

angular.module('loginApp').
controller('ParentController', ['$http','$state','$scope', '$rootScope', '$modal', 'Auth', 'AUTH_EVENTS','USER_ROLES',
function($http,$state,$scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES){
	// this is the parent controller for all controllers.
	// Manages auth login functions and each controller
	// inherits from this controller



	$scope.enterAgents=function() {
	var firstname = this.firstName;
	var lastname = this.lastName;
	var username = this.ad_userName;
	var location = this.locationName;
	var emailid = this.emailId;
	var contact = this.contactNames;
	var ag_roles=this.roles;
	var addedby='Admin';
	var pass_gent='abcd1234';
	$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters?username=" + username)
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
			url: "http://gemstonelive.azurewebsites.net/api/perUserRegisters",
			crossDomain: true,
			data: {
				firstName: firstname,
				lastName: lastname,
				userName: username,
				agentRole: ag_roles,
				emailId: emailid,
				contactAgent: contact,
				addedBy : addedby,
				passWord:pass_gent,
				originAgent :location
			},
			headers: {'Content-Type': 'application/json'}
		})
			.success(function (resp) {

                $.ajax({
                    type: "post",
                    url: "",
                    data: {userName: username, emailId:emailid },
                    cache: false,
                    success: function (data)
                    {
                        //alert(data);
                        //$('#getSubmit')[0].reset();
                    }});



        //alert(resp);
				//further code will refresh the current database data on page
				alert("Registered Successfully...");
				//window.location='./main.html';
				$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters")
					.success(function(res){
						$scope.getPerUserDetails=res;
						var totag=res.length;
						$scope.totag=totag;
					});	//alert("success");
			})
		//alert("second line");
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
	var agentseller="Seller";
	console.log("approve");
	var agents_id=this.agents_id;
	$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters/"+agents_id)
		.success(function(res){
			$scope.getAgentsData=res;
			var getAgents=$scope.getAgentsData;
			var userName_ag=getAgents.userName;
			var firstName_ag=getAgents.firstName;
			var lastname_ag=getAgents.lastName;
			var city_ag=getAgents.origin;
			var emailid_ag=getAgents.emailId;
			var contact_ag=getAgents.contact;
			var password_ag='abcd1234';
			var addedby='Application';
			var request = $http({
				method: "post",
				url: "http://gemstonelive.azurewebsites.net/api/perUserRegisters",
				crossDomain: true,
				data: {
					firstName: firstName_ag,
					lastName: lastname_ag,
					userName: userName_ag,
					addedBy: addedby ,
					agentRole:agentseller,
					emailId: emailid_ag,
					contactAgent: contact_ag,
					originAgent: city_ag,
					passWord:password_ag
				},
				headers: {'Content-Type': 'application/json'}
			})
				.success(function (resp) {

					//alert(resp);
					//further code will refresh the current database data on page
					alert("The Agent has been Approved as Seller!!");
					//window.location='./main.html';
					//alert("success");
				})

			$http.delete("http://gemstonelive.azurewebsites.net/api/userRegisters/"+agents_id)
				.success(function(res){
					$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters")
						.success(function(res){
							$scope.getUserRegisters=res;
							var us=res.length;
							$scope.us=us;
						})	;
					$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters")
						.success(function(res){
							$scope.getPerUserDetails=res;
							var totag=res.length;
							$scope.totag=totag;
						});

				})
		})
}

	$scope.approve_req_pur=function()
	{
		var agentrole="Purchaser";
		console.log("approve");
		var agents_id=this.agents_id_purchaser;
		$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters/"+agents_id)
			.success(function(res){
				$scope.getAgentsData=res;
				var getAgents=$scope.getAgentsData;
				var userName_ag=getAgents.userName;
				var firstName_ag=getAgents.firstName;
				var lastname_ag=getAgents.lastName;
				var location_ag=getAgents.locationName;
				var city_ag=getAgents.origin;
				var emailid_ag=getAgents.emailId;
				var contact_ag=getAgents.contact;
				var password_ag='abcd1234';
				var addedbyp='Application';

				var request = $http({
					method: "post",
					url: "http://gemstonelive.azurewebsites.net/api/perUserRegisters",
					crossDomain: true,
					data: {
						firstName: firstName_ag,
						lastName: lastname_ag,
						userName: userName_ag,
						addedBy: addedbyp,
						emailId: emailid_ag,
						agentRole: agentrole,
						contactAgent: contact_ag,
						originAgent: city_ag,
						passWord:password_ag
					},
					headers: {'Content-Type': 'application/json'}
				})
					.success(function (resp) {

						//alert(resp);
						//further code will refresh the current database data on page
						alert("The Agent has been Approved as Purchaser");
						//window.location='./main.html';
						//alert("success");
					})

				$http.delete("http://gemstonelive.azurewebsites.net/api/userRegisters/"+agents_id)
					.success(function(res){
						$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters")
							.success(function(res){
								$scope.getPerUserDetails=res;
								var totag=res.length;
								$scope.totag=totag;
							});
						$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters")
							.success(function(res){
								$scope.getUserRegisters=res;
								var us=res.length;
								$scope.us=us;
							})	;
					})
			})
		}

	$scope.decline=function()
	{
		var decline_id=this.id_dec;
		$http.delete("http://gemstonelive.azurewebsites.net/api/userRegisters/"+decline_id)
			.success(function(res){
				alert("The Agent has been Declined!!");
				$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters")
					.success(function(res){
						$scope.getUserRegisters=res;
						var us=res.length;
						$scope.us=us;
					})	;
			})

	};

	$scope.deletetax=function()
	{
		var del_id=this.del_id;
		$http.delete("http://gemstonelive.azurewebsites.net/api/perItemDetails/"+del_id)
			.success(function(res){
				//alert("deleted");

				$http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
					.success(function(res){
						$scope.getPerItemDetails=res;
						alert("Item Deleted Successfully!!");
					})
			});
	};

	$scope.delsolditem=function()
	{
		var sold_id=this.sold_id;
		$http.delete("http://gemstonelive.azurewebsites.net/api/soldItemDetails/"+sold_id)
			.success(function(res){
				//alert("deleted");

				$http.get("http://gemstonelive.azurewebsites.net/api/soldItemDetails")
					.success(function(res){
						$scope.getSoldItems=res;
						alert('Item Deleted Successfully');
					});
			});
	};

	$scope.markSold=function()
	{
		//console.log("Mark Sold");
		var items_id2=this.items_id;
		$http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails/"+items_id2)
			.success(function(res){
				$scope.getItemsData=res;
				var getItems=$scope.getItemsData;
				var userName_item=getItems.userNames;
				var preSemi_item=getItems.preSemi;
				var pType_item=getItems.pType;
				var sName_item=getItems.sName;
				var stoneSize_item=getItems.stoneSize;
				var sWeight_item=getItems.sWeight;
				var sPieces_item=getItems.sPieces;
				var sDimensions_item=getItems.sDimensions;
				var sColor_item=getItems.sColor;
				var stoneShape_item=getItems.stoneShape;
				var sOrigin_item=getItems.sOrigin;
				var scerAgency_item=getItems.scerAgency;
				var sCarat_item=getItems.sCarat;
				var stockId_item=getItems.stockId;
				var sSupplierRef_item=getItems.sSupplierRef;
				var sPurchase_item=getItems.sPurchase;
                var bbPrice_item=getItems.bbPrice;
                var maxbbPrice_item=getItems.maxbbPrice;
                var vipPrice_item=getItems.vipPrice;
                var retailPrice_item=getItems.retailPrice;

				var request = $http({
					method: "POST",
					url: "http://gemstonelive.azurewebsites.net/api/soldItemDetails",
					crossDomain: true,
					data: {
						userNames: userName_item,
						preSemi: preSemi_item,
						pType: pType_item,
						sName: sName_item,
						stoneSize: stoneSize_item,
						sWeight: sWeight_item,
						sPieces: sPieces_item,
						sDimensions:sDimensions_item,
						sColor: sColor_item,
						stoneShape: stoneShape_item,
						sOrigin: sOrigin_item,
						scerAgency: scerAgency_item,
						sCarat: sCarat_item,
						stockId: stockId_item,
						sSupplierRef: sSupplierRef_item,
						sPurchase:sPurchase_item,
                        bbPrice:bbPrice_item,
                        maxbbPrice:maxbbPrice_item,
                        vipPrice:vipPrice_item,
                        retailPrice:retailPrice_item
					},
					headers: {'Content-Type': 'application/json'}
				})
					.success(function (resp) {
					    console.log("retail Price :"+retailPrice_item);
					    $http.delete("http://gemstonelive.azurewebsites.net/api/perItemDetails/" + items_id2)
					.success(function (res) {
					    //alert("deleted");					   
					})
					    $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
                                   .success(function (res) {
                                       $scope.getPerItemDetails = res;
                                       alert("Item added to Sold Items");
                                   });
					    $http.get("http://gemstonelive.azurewebsites.net/api/soldItemDetails")
                            .success(function (res) {
                                $scope.getSoldItems = res;
                            });
						//alert(resp);
						//further code will refresh the current database data on page
						//alert("Done Successfully...");
						//window.location='./main.html';
						//alert("success");
					})

				
			})
	}


	$scope.approveStone=function()
	{
		var stone_id=this.stone_id;

		console.log("approve");
		$http.get("http://gemstonelive.azurewebsites.net/api/itemDetails/"+stone_id)
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
					url: "http://gemstonelive.azurewebsites.net/api/perItemDetails",
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

						//window.location='./main.html';
						//alert("success");
					})

				$http.delete("http://gemstonelive.azurewebsites.net/api/itemDetails/"+stone_id)
					.success(function(res){
						alert("The Stone has been Approved!!");
						$http.get("http://gemstonelive.azurewebsites.net/api/itemDetails")
							.success(function(res){
								$scope.getItemDetails=res;
								var x=res.length;
								$scope.x=x;
							})

						$http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
							.success(function(res){
								$scope.getPerItemDetails=res;
							})
					})
			})

	}

	$scope.updateItems=function()
	{
		var edit_i=this.edit_i;
		$http.get('http://gemstonelive.azurewebsites.net/api/perItemDetails/' + edit_i)
			.success(function (res) {
				console.log(res);
				$scope.getupExpenss = res;
				var getuserforupdate = $scope.getupExpenss;
				var user2 = getuserforupdate.userNames;
				console.log(user2);
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
	    
		//alert("Update function");
		var updateid=this.meraId;
		var bbprice1=this.bbprice;
		var maxbbPrice1=this.mpbbprice;
		var vipPrice1=this.vip_price;
		var retailPrice1=this.retailprice;
		var sname1=this.sname;
		var ptype1=this.ptype;
		var useragent = this.userAgent;		
		var username_for_update ;
		var presemi1 ;
		var stonesize1 ;
		var sweight1 ;
		var spieces1 ;
		var sdimensions1 ;
		var sorigin1 ;
		var color1 ;
		var stoneshape1 ;
		var sremark1 ;
		var sceragency1 ;
		var scarat1 ;
		var stockid1 ;
		var supplier1 ;
		var spurchase1;
		
		//alert("retailPrice :"+retailPrice1);
		console.log(updateid);

	    $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails/" + updateid)
            .success(function (res) {
                $scope.getItemss = res

                var getItems = $scope.getItemss;

                username_for_update = getItems.userNames;                
                presemi1 = getItems.preSemi;
                console.log(presemi1);
                 ptype1 = getItems.pType;
                 stonesize1 = getItems.stoneSize;
                 sweight1 = getItems.sWeight;
                 spieces1 = getItems.sPieces;
                 sdimensions1 = getItems.sDimensions;
                 sorigin1 = getItems.sOrigin;
                 color1 = getItems.sColor;
                 stoneshape1 = getItems.stoneShape;
                 sremark1 = getItems.sRemark;
                 sceragency1 = getItems.scerAgency;
                 scarat1 = getItems.sCarat;
                stockid1 = getItems.stockId;
                 supplier1 = getItems.sSupplierRef;
                 spurchase1 = getItems.sPurchase;

                 $http.delete("http://gemstonelive.azurewebsites.net/api/perItemDetails/" + updateid)
         .success(function (res) {
             //alert("Record Deleted");
         })
                 var request = $http({
                     method: "post",
                     url: "http://gemstonelive.azurewebsites.net/api/perItemDetails",
                     crossDomain: true,
                     data: {
                         userNames: useragent,
                         preSemi: presemi1,
                         pType: ptype1,
                         sName: sname1,
                         stoneSize: stonesize1,
                         sWeight: sweight1,
                         sPieces: spieces1,
                         sDimensions: sdimensions1,
                         sOrigin: sorigin1,
                         sColor: color1,
                         stoneShape: stoneshape1,
                         sRemark: sremark1,
                         scerAgency: sceragency1,
                         sCarat: scarat1,
                         stockId: stockid1,
                         sSupplierRef: supplier1,
                         sPurchase: spurchase1,
                         bbPrice: bbprice1,
                         maxbbPrice: maxbbPrice1,
                         vipPrice: vipPrice1,
                         retailPrice: retailPrice1
                     },
                     headers: { 'Content-Type': 'application/json' }
                 })
                   .success(function (resp) {

                       //alert(resp);
                       //further code will refresh the current database data on page
                       alert("Record Updated Successfully!");
                       //window.location='./main.html';
                       //alert("success");
                       $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
                         .success(function (res) {
                                     $scope.getPerItemDetails = res;
                                     var totalItems = res.length;
                                     $scope.totalItems = totalItems;

                                     $('#myModal1').modal('hide');
                         })
                   })

            })
        
	    
              
	}



	$http.get("http://gemstonelive.azurewebsites.net/api/userRegisters")
		.success(function(res){
			$scope.getUserRegisters=res;
			var us=res.length;
			$scope.us=us;
		})

	$http.get("http://gemstonelive.azurewebsites.net/api/soldItemDetails")
		.success(function(res){
			$scope.getSoldItems=res;
		})

	$http.get("http://gemstonelive.azurewebsites.net/api/itemDetails")
		.success(function(res){
			$scope.getItemDetails=res;
			var x=res.length;
			$scope.x=x;
		})

	$http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
		.success(function(res){
			$scope.getPerItemDetails=res;
			var totalItems=res.length;
			$scope.totalItems=totalItems;
		})

	$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters")
		.success(function(res){
			$scope.getPerUserDetails=res;
			var totag=res.length;
			$scope.totag=totag;

		});


	$scope.showDetails=function(){
	var id=this.st_id;
		//alert(id)
		$http.get("http://gemstonelive.azurewebsites.net/api/itemDetails/"+id)
			.success(function(res){
				$scope.getItemDetailsByStone=res;
				var test=$scope.getItemDetailsByStone;
				$scope.id=test.id;
				$scope.userNames= test.userNames;
				$scope.preSemi=test.preSemi;
				$scope.pType=test.pType;
				$scope.sName=test.sName;
				$scope.stoneSize=test.stoneSize;
				$scope.sWeight=test.sWeight;
				$scope.sPieces=test.sPieces;
				$scope.sDimensions=test.sDimensions;
				$scope.sColor=test.sColor;
				$scope.stoneShape=test.stoneShape;
				$scope.sOrigin=test.sOrigin;
				$scope.sRemark=test.sRemark;
				$scope.scerAgency=test.scerAgency;
				$scope.sCarat=test.sCarat;
				$scope.stockId=test.stockId;
				$scope.sSupplierRef=test.sSupplierRef;
				$scope.sPurchase=test.sPurchase;
				$scope.imageName=test.imageName;
				var img = $scope.imageName;
				//alert(img);
			})
	};

	$scope.showPerDetails=function(){
		var id=this.viewst_id;
		$http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails/"+id)
			.success(function(res){
				$scope.getItemDetailsByStone=res;
				var test=$scope.getItemDetailsByStone;
				$scope.id=test.id;
				$scope.userNames= test.userNames;
				$scope.preSemi=test.preSemi;
				$scope.pType=test.pType;
				$scope.sName=test.sName;
				$scope.stoneSize=test.stoneSize;
				$scope.sWeight=test.sWeight;
				$scope.sPieces=test.sPieces;
				$scope.sDimensions=test.sDimensions;
				$scope.sColor=test.sColor;
				$scope.stoneShape=test.stoneShape;
				$scope.sOrigin=test.sOrigin;
				$scope.sRemark=test.sRemark;
				$scope.scerAgency=test.scerAgency;
				$scope.sCarat=test.sCarat;
				$scope.stockId=test.stockId;
				$scope.sSupplierRef=test.sSupplierRef;
				$scope.sPurchase=test.sPurchase;
				$scope.imageName=test.imageName;

			})
	};


	/*$scope.cancelAndNew=function()
	{
		//document.getElementById('signup1').reset();
		document.getElementById("sname").value = "";
		document.getElementById("uname").value = "";
		document.getElementById("ptype").value = "";
		document.getElementById("b2bprice").value = "";
		document.getElementById("perb2bprice").value = "";
		document.getElementById("vipprice").value = "";
		document.getElementById("retailprice").value = "";
		$scope.upbtn=false;
	}*/

	$scope.declineStone=function()
	{
		var reject_id=this.reject_id;
		$http.delete("http://gemstonelive.azurewebsites.net/api/itemDetails/" + reject_id)
			.success(function (res) {
				console.log("deleted");
				alert("The Stone has been Declined!!");
				$http.get("http://gemstonelive.azurewebsites.net/api/itemDetails")
					.success(function(res){
						$scope.getItemDetails=res;
						var x=res.length;
						$scope.x=x;
					})
			})
	}

	$scope.decline_view=function()
	{
		var id_view=this.id_view;
		$http.delete("http://gemstonelive.azurewebsites.net/api/perUserRegisters/" + id_view)
			.success(function (res) {
				alert("Agent Deleted Successfully");
				$http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters")
					.success(function(res){
						$scope.getPerUserDetails=res;
						var totag=res.length;
						$scope.totag=totag;
					})
				//console.log("deleted");
			})
	}



	$scope.increment=function(){
		var count=1;
		count=count+1;
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
	};
	$scope.modalShow = false;

	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	};
	
	var showNotAuthorized = function(){
		alert("You are not Authorized");
	};
	
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