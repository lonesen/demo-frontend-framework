var app = angular.module("myApp", ["ngRoute"]);
app.service('CartService', function() {
  this.cartQuantity = 0;
});


//chức năng login 
// service để lưu trữ thông tin người dùng và kiểm tra đăng nhập
app.service('AuthService', function() {
  this.users = [
    { id: 1, email: 'long@gmail.com', password: '123' },
    { id: 2, email: 'user2@example.com', password: 'password2' },

  ];

  this.currentUser = null;
  //code chức năng đăng ký
  this.register = function(name, email, password) {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    var existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false; //  người dùng đã tồn tại
    }

    // Tạo người dùng mới và thêm vào danh sách
    var newUser = { id: this.users.length + 1, name: name, email: email, password: password };
    this.users.push(newUser);
    this.currentUser = newUser; // Tự động đăng nhập sau khi đăng ký

    return true; // Đăng ký thành công
  };

  this.login = function(email, password) {
    var user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true; // Đăng nhập thành công
    }
    return false; // Đăng nhập thất bại
  };

  this.logout = function() {
    this.currentUser = null;
  };

  this.getCurrentUser = function() {
    return this.currentUser;
  };
});





      app.controller("myCtrl",function ($scope, $rootScope, $routeParams, $http,CartService, $location, AuthService) {

        $scope.totalAmount = 0;

    // Hàm tính tổng giá tiền từ giỏ hàng
    $scope.calculateTotalAmount = function () {
        $scope.totalAmount = 0;
        for (var i = 0; i < $rootScope.cart.length; i++) {
            $scope.totalAmount += $rootScope.cart[i].totalPrice || 0;
        }
    };
    $scope.$watch('cart', function (newCart, oldCart) {
      $rootScope.cartQuantity = newCart.length;
      $scope.calculateTotalAmount();
  }, true);



        
        $scope.user = {}; // Đối tượng để lưu thông tin đăng nhập
  $scope.newUser = {}; // Đối tượng để lưu thông tin đăng ký

  $scope.login = function () {
    // Gọi hàm đăng nhập từ AuthService
    var loggedIn = AuthService.login($scope.user.email, $scope.user.password);

    if (loggedIn) {
      alert("Đăng nhập thành công!");
      $location.path("/"); // Chuyển hướng đến trang chính sau khi đăng nhập
    } else {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };

  $scope.register = function () {
    // Gọi hàm đăng ký từ AuthService
    var registered = AuthService.register($scope.newUser.name, $scope.newUser.email, $scope.newUser.password);

    if (registered) {
      alert("Đăng ký thành công!");
      $location.path("/login"); // Chuyển hướng đến trang chính sau khi đăng ký
    } else {
      alert("Đăng ký thất bại. Email đã được sử dụng.");
    }
  };

  $scope.logout = function () {
    AuthService.logout();
    $location.path("/login"); 
  };

  // Lấy thông tin người dùng hiện tại
  $scope.currentUser = AuthService.getCurrentUser();













        $rootScope.cartQuantity = CartService.cartQuantity;
        $scope.$watch('cart', function (newCart, oldCart) {
          $rootScope.cartQuantity = newCart.length;
        }, true);
          $scope.products = [];
          $http.get("data/dbhome.json").then(function (reponse) {
            $scope.products = reponse.data;
            //lấy giá trị id  index
            for(i=0;i<$scope.products.length;i++){
            if($scope.products[i].id==$routeParams.id){
                $scope.index=i;
            } 
          }
          });  
          $scope.productcard =[];
          $http.get("data/dblistsoft.json").then(function (reponse) {
            $scope.productcard = reponse.data;
            //lấy giá trị id  index
            for(i=0;i<$scope.productcard.length;i++){
            if($scope.productcard[i].id==$routeParams.id){
                $scope.index=i;
            } 
          }
          }),
          ///xóa sản phẩm
          $scope.removeProduct = function (productId) {
            var index = $rootScope.cart.findIndex((item) => item.id === productId);    
            if (index !== -1) {
                $rootScope.cart.splice(index, 1);
            }
            $rootScope.cartQuantity = $scope.cart.length;
        };
        $scope.clearCart = function () {
          $rootScope.cart = [];
          $rootScope.cartQuantity = 0;
      };
        
          //thêm sản phẩm hàm của thầy
          // $scope.addProduct = function(product){
          //   if(typeof $rootScope.cart == 'undefined'){
          //     $rootScope.cart=[];
          //   };
          //   var index = $rootScope.cart.findIndex((item) => item.id == product.id);
          //   if(index == -1){
          //     product.quantity = 1;
          //     $rootScope.cart.push(product);
          //   }else{
          //     // $rootScope.cart[index].quantity++;
          //     alert('Sản phẩm đã có trong giỏ hàng.');
          //   }
          //   $rootScope.cartQuantity = $scope.cart.length;
          //   console.log($rootScope.cart);
          // };


        //   $scope.addProduct = function(product) {
        //     if(typeof $rootScope.cart == 'undefined'){
        //         $rootScope.cart=[];
        //     };
        
        //     var index = $rootScope.cart.findIndex((item) => item.id == product.id);
        //     if(index == -1){
        //         product.quantity = 1;
        //         // Khởi tạo totalPrice khi thêm sản phẩm vào giỏ hàng
        //         product.totalPrice = product.price;
        //         $rootScope.cart.push(product);
        //     } else {
        //         alert('Sản phẩm đã có trong giỏ hàng.');
        //     }
        
        //     $rootScope.cartQuantity = $scope.cart.length;
        //     console.log($rootScope.cart);
        // };
        ///Hàm này Đẹp 
        $scope.addProduct = function(product) {
          if (typeof $rootScope.cart == 'undefined') {
              $rootScope.cart = [];
          }
          //check sản phẩm đã tồn tại chưa
          var index = $rootScope.cart.findIndex((item) => item.id == product.id);
      
          if (index == -1) {
              //chưa có thì thêm
              var productCopy = angular.copy(product);
              $rootScope.cart.push(productCopy);
          } else {
            var productCopy = angular.copy(product);
              $rootScope.cart.push(productCopy);  
              //thêm nhưng thông báo
              alert('Sản phẩm đã có trong giỏ hàng.');
          }
      
          $rootScope.cartQuantity = $rootScope.cart.length;
          console.log($rootScope.cart);
      };
      
      
      
      // $scope.sort = 'price'; 


      //   $scope.sort='price';
      //       $scope.tang=function(){
      //           $scope.sort='price';
      //       }
      //       $scope.giam=function(){
      //           $scope.sort='-price';
      //       }
      $scope.sortOption = 'price'; 

$scope.updateSorting = function() {
    if ($scope.sortOption === 'price') {
        $scope.sort = 'price';
    } else if ($scope.sortOption === 'priceDesc') {
        $scope.sort = '-price';
    }
};


          /// hàm tìm kiếm
          $rootScope.search=function(input){
              $rootScope.keySearch=input;
            }; 
            $scope.calculateTotalPrice = function (product) {
              // Tính tổng giá số lượng người lớn và trẻ em
              var numberOfAdults = product.numberOfAdults || 0;
              var numberOfChildren = product.numberOfChildren || 0;
      
              var totalPrice = (numberOfAdults * product.price) + (numberOfChildren * product.price * 0.5);///giảm nửa gía
      
              // Cập nhật tổng giá 
              product.totalPrice = totalPrice;
          };
             
        }
        
        
      );
      app.config(function ($routeProvider) {
        $routeProvider
          .when("/detailproductravel/:id", {
            templateUrl: "detailproductravel.html?" + Math.random(),
            controller: "myCtrl",
          })  
          .when("/login", {
            templateUrl: "login.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/dangki", {
            templateUrl: "dangki.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/giohang", {
            templateUrl: "giohang.html?" + Math.random(),
            controller: "myCtrl",
          })
          .when("/timkiem", {
            templateUrl: "timkiem.html?" + Math.random(),
            controller: "myCtrl",
          })
          .otherwise({
            templateUrl: "home.html",
            controller: "myCtrl",
          });
      });