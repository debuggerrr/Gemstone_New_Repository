var db = null;
var records = null;
var result=null;
var count;
var uniqueUser={};
var username;
var global_password;
var global_id;
var example=angular.module('starter', ['ionic', 'ngCordova']);
example.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

    .state('AddList', {
      url: '/AddList',
      templateUrl: 'Add-List.html',
      controller: 'ExampleController'
    })

    .state('AddList.home', {
      url: '/home',
      views:{
        'tab-home':{
          templateUrl: 'templates/home.html',
          controller: 'ExampleController'
        }
      }
    })

    .state('AddList.AddItem', {
      url: '/AddItem',
      views:{
        'tab-item':{
          templateUrl: 'templates/AddItem.html',
          controller: 'ExampleController'
        }
      }
    })

    .state('AddList.ViewItems', {
      url: '/viewitems',
      reload:true,
      views:{
        'tab-viewitems':{
          templateUrl: 'templates/ViewItems.html',
          controller: 'ExampleController',
          reload:true
        }
      }

    })


    .state('signUp', {
      url: '/signUp',
        templateUrl: 'signUp.html',
        controller: 'ExampleController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'ExampleController'

    })


    .state('forgot-password', {
      url: '/Forgot-password',
      templateUrl: 'templates/forgot.html',
      controller: 'ExampleController'
    })
    .state('ProdCat', {
      url: '/ProductCategory',
      templateUrl: 'templates/ProdCat.html',
      controller: 'ExampleController'
    })
    .state('ProdPrices', {
      url: '/ProductPrices',
      templateUrl: 'templates/ProdPrices.html',
      controller: 'ExampleController'
    })
    .state('ProdDetails', {
      url: '/ProductDetails',
      templateUrl: 'templates/ProdDetails.html',
      controller: 'ExampleController'
    })
    .state('ProdInfo', {
      url: '/ProductInfo',
      templateUrl: 'templates/ProdInfo.html',
      controller: 'ExampleController'
    })
    .state('changepassword', {
      url: '/changepassword',
      templateUrl: 'templates/changePassword.html',
      controller: 'ExampleController'
    });

  $urlRouterProvider.otherwise('/login');
})

  .run(function($ionicPlatform, $cordovaSQLite,$rootScope, $timeout, $state, $ionicHistory) {
    var backbutton=0;
    $ionicPlatform.registerBackButtonAction(function() {
      if ( ($state.$current.name=="login") ||
        ($state.$current.name=="AddList.home") || ($state.$current.name=="AddList.AddItem") || ($state.$current.name=="AddList.ViewItems")
      ){
        // H/W BACK button is disabled for these states (these views)
        // Do not go to the previous state (or view) for these states.
        // Do nothing here to disable H/W back button.
        if(backbutton==0){
          backbutton++;
          window.plugins.toast.showShortBottom('Press again to exit');
          $timeout(function(){backbutton=0;},5000);
        }else{
          navigator.app.exitApp();
        }
      } else {
        // For all other states, the H/W BACK button is enabled
       $ionicHistory.goBack();
      }
    }, 100);

    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
  })


example.controller("ExampleController", function($scope,$rootScope, $http, $cordovaCamera, $cordovaSQLite, $state, $ionicPopup, $ionicPopover, $cordovaToast) {

  $scope.rad1="precious";

  $scope.insert = function () {
    $state.go('signUp',{});

  };

  $scope.logout = function () {
    $state.go('login',{});

  };

  $scope.hidePopover = function() {
    $scope.popover.hide();
  };

  db=window.openDatabase("my.db","1.0","my.db",100000);
  $cordovaSQLite.execute(db,"SELECT * from items_list").then(function(result){
    if(result.rows.length > 0){
      $scope.count=result.rows.length;
    }
    else {
      $scope.count=0;
    }

  });


  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

  function dataURItoBlob(dataURI, callback) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new BlobBuilder();
    bb.append(ab);
    return bb.getBlob(mimeString);
  };

  $scope.login = function (credentials) {
   var user=this.text1;
    var pass=this.text2;
    $http.get("http://localhost:55453/api/userRegisters?userName="+user+"&passWord="+pass)
      .then(function onFulfilled(response) {
        console.log(response.data);
        $scope.getResult = response.data;
        console.log("this is credentials data");
        $rootScope.credentials=response.data;
        console.log($rootScope.credentials);
        var result = $scope.getResult;
         username = result[0].userName;
        var password = result[0].passWord;
        global_id=result[0].id;
        // alert(username);
        // alert(password);
       if (username == user && password == pass)
       {
          $state.go("AddList");
        }

      }).catch ( function onRejected(response) {
        console.log(response.status);
        var alertPopup = $ionicPopup.alert({
        title: 'Login Failed !',
        template: 'Please Enter Correct Credentials'
      });
      });
     }
$http.get("http://localhost:55453/api/userRegisters")
  .success(function(result){
    $scope.getChangedPassword=result;
  });

  $scope.changepass = function(){
    alert(username);
    var old_pass=this.oldpassword;
    var new_pass=this.newpass;
    var confirm_pass=this.confirmpass;
    var data = ({
      passWord: $scope.confirm_pass
  });

    $http.put("http://localhost:55453/api/userRegisters/"+global_id,data)
      .success(function(res){
        alert("Done");
        console.log(username);
      })

  }

  $scope.signup = function ()
  {alert("first line");
    var firstName=this.firstName;
    var lastName=this.lastName;
    var userName_Name=this.userName;
    var city=this.city;
    var emailId=this.email;
    var contact=this.contact;
    var pass='abcd1234';
   // alert(contact);
    //alert(userName_Name);
    $http.get("http://localhost:55453/api/userRegisters?username_name="+userName_Name)
      .then(function onFulfilled(response){
        $scope.getUsernames=response.data;
        var getUsername=$scope.getUsernames;
        var checkUserName=getUsername[0].userName;
        if(checkUserName==userName_Name)
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Sign Up Failed !',
            template: 'This Username Already Exists. Please Try Different One.'
          });
        }
      }).catch(function onRejected(response) {
      var request = $http({
        method: "post",
        url: "http://localhost:55453/api/userRegisters",
        crossDomain: true,
        data: {
          firstName: firstName,
          lastName: lastName,
          userName: userName_Name,
          city: city,
          emailId: emailId,
          contact: contact,
          passWord: pass,
        },
        headers: {'Content-Type': 'application/json'}
      })
        .success(function (resp) {

          //alert(resp);
          //further code will refresh the current database data on page
          $http.get('http://localhost:55453/api/userRegisters')
            .success(function (res) {
              var alertPopup = $ionicPopup.alert({
                title: 'Registered Successfully ! !',
                template: 'You Can Now Login'
              });
              window.location='./main.html';
            });
          //alert("success");
        })
      alert("second line");
      this.firstName = "";
      this.lastName = "";
      this.userName = "";
      this.city = "";
      this.email = "";
      this.contact = "";
    })

  }

  $http.get("http://localhost:55453/api/itemDetails?userone="+username)
    .success(function(res){
      $scope.getItemDetails=res;
      var getItemDetails=$scope.getItemDetails;
       });




  $scope.getData=[];
  var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;

  db = window.openDatabase("my.db","1.0","my.db",100000)

  var query="SELECT precious,purchasetype,stonename, size, weight, pieces, dimension, color, shape, origin, treatment, certi, salesprice,stockid, certificatenum, purchase FROM items_list ";

  $cordovaSQLite.execute(db, query).then(function(result) {

    if(result.rows.length >0){


      for(var i=0; i<result.rows.length; i++){
        $scope.getData.push({a:result.rows.item(i).precious,b:result.rows.item(i).purchasetype,c:result.rows.item(i).stonename,d:result.rows.item(i).size,e:result.rows.item(i).weight,f:result.rows.item(i).pieces,g:result.rows.item(i).dimension,h:result.rows.item(i).color,i:result.rows.item(i).shape,j:result.rows.item(i).origin,k:result.rows.item(i).treatment,l:result.rows.item(i).certi,m:result.rows.item(i).salesprice,n:result.rows.item(i).stockid,o:result.rows.item(i).certificatenum,p:result.rows.item(i).purchase});
          count++;
      }

    }
    else{
      console.log("####console######## NO results found #######"+"Table record #: ");
    }
  }, function(error){
    console.log(error);
  });

  $scope.doRefresh = function() {
   // $scope.getData.push({a:result.rows.item(i).precious,b:result.rows.item(i).purchasetype,c:result.rows.item(i).stonename,d:result.rows.item(i).size,e:result.rows.item(i).weight,f:result.rows.item(i).pieces,g:result.rows.item(i).dimension,h:result.rows.item(i).color,i:result.rows.item(i).shape,j:result.rows.item(i).origin,k:result.rows.item(i).treatment,l:result.rows.item(i).certi,m:result.rows.item(i).salesprice,n:result.rows.item(i).stockid,o:result.rows.item(i).certificatenum,p:result.rows.item(i).purchase});
   // $scope.getData.push('More items ' + Math.random());
    $cordovaSQLite.execute(db, query).then(function(result) {

      if(result.rows.length >0){


        for(var i=count; i<result.rows.length; i++){
          $scope.getData.push({a:result.rows.item(i).precious,b:result.rows.item(i).purchasetype,c:result.rows.item(i).stonename,d:result.rows.item(i).size,e:result.rows.item(i).weight,f:result.rows.item(i).pieces,g:result.rows.item(i).dimension,h:result.rows.item(i).color,i:result.rows.item(i).shape,j:result.rows.item(i).origin,k:result.rows.item(i).treatment,l:result.rows.item(i).certi,m:result.rows.item(i).salesprice,n:result.rows.item(i).stockid,o:result.rows.item(i).certificatenum,p:result.rows.item(i).purchase});

        }

      }
      else{
        console.log("####console######## NO results found #######"+"Table record #: ");
      }
    }, function(error){
      console.log(error);
    });
    $scope.$broadcast('scroll.refreshComplete');

    $cordovaToast.showLongBottom('List Refreshed!')
      .then(function(success) {
        // Do something on success
      }, function(error) {
        // Handle error
      });
  }

  $scope.show = function () {

    $state.go('AddList.ViewItems',{});
  };

  $scope.forget = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Password Changed..!!',
      template: 'New password has been sent to your email!'
    });
  };


  $scope.enter = function ()
  {
    var radioSelected;
    var purchaseType=this.purchasetype;
    var stoneName=this.stonename;
    var size=this.sizesize;
    var weight=this.weightweight;
    var pieces=this.piecespieces;
    var dimensions=this.dimensions;
    var color=this.colorco;
    var shape=this.shapeshape;
    var origin=this.originor;
    var treatment=this.treatment;
    var certificates=this.certi;
    var carat=this.salesPrice;
    var stock_id=this.stockid;
    var supplierCert=this.certificatenum;
    var pur_price=this.purchase;
      alert(username);
      alert(color);
    var request = $http({
      method: "post",
      url: "http://localhost:55453/api/itemDetails",
      crossDomain: true,
      data: {
        userNames : username,
        pType :purchaseType ,
        sName :stoneName ,
        stoneSize : size,
        sWeight: weight,
        sDimensions: dimensions,
        sPieces : pieces,
        sColor: color,
        stoneShape :shape,
        sOrigin :origin,
        sRemark : treatment,
        scerAgency : certificates,
        sCarat : carat,
        sSupplierRef : supplierCert,
        sPurchase : pur_price,
        stockId : stock_id,
      },
      headers: {'Content-Type': 'application/json'}
    })
      .success(function (resp) {

        //alert(resp);
        //further code will refresh the current database data on page
        $http.get('http://localhost:55453/api/itemDetails')
          .success(function (res) {
            var alertPopup = $ionicPopup.alert({
              title: 'Thank you !!',
              template: 'Items Entered.'
            });
            //window.location='./main.html';
          });
        //alert("success");
      })
    alert("second line");
    this.purchasetype="";
    this.stonename= "";
    this.sizesize = "";
    this.weightweight = "";
    this.piecespieces = "";
    this.dimensions = "";
    this.colorco = "";
    this.shapeshape= "";
    this.originor="";
    this.treatment="";
    this.certi="";
    this.salesPrice="";
    this.stockid="";
    this.certificatenum="";
    this.purchase="";
  }

  $scope.pictureUrl="http://placehold.it/50x50";
  $scope.takePicture=function(img){
    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
    };
    $cordovaCamera.getPicture(options)
      .then(function(imageData) {
      $scope.pictureUrl = "data:image/jpeg;base64," + imageData;

        blobImg = dataURItoBlob($scope.pictureUrl);
      /*var query = "INSERT INTO imagewala (img) VALUES (?)";
      $cordovaSQLite.execute(db, query, [img]).then(function(res) {
        window.alert("INSERT ID -> " + res.insertId);
      }, function (err) {
        window.alert(err);
      });*/
      window.alert("Picture Captured .. !!");
    }, function(err) {
      window.alert("Error!!"+err);
    });
  };
  $scope.takePhoto=function(){
    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: Camera.EncodingType.JPEG
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
      blobImg = dataURItoBlob($scope.pictureUrl);
      window.alert("Picture Captured .. !!");
    }, function(err) {
      window.alert("Error!!"+err.message);
    });
  };

});



