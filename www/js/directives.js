angular.module('starter.directives', [])

.directive('ngLastRepeat', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
                });
            }
        }
    }
})


.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        if(file.size>0){
          scope.file = file;
          scope.$parent.file = file;
        } else {
          scope.file = {};
          scope.$parent.file = {};
        }
        scope.$apply();
      });
    }
  };
})


.directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, $el) {
        $rootScope.hideTabs = true;
        $scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  .directive('focusMe', function($timeout) {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focusMe, function(value) {
          if (value === true) {
            console.log('value=', value);
            //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
            //});
          }
        });
      }
    };
  })

.directive('elastic',function() {
  return {
    restrict: 'A',
    link: function($scope, element) {
      element.css({
        'resize' : 'none',
        'width' : '100%',
        'height' : '36px'
      });
      $scope.initialHeight = $scope.initialHeight || element[0].style.height;
      var resize = function() {
          element[0].style.height = $scope.initialHeight;
          element[0].style.height = "" + element[0].scrollHeight + "px";
      };
      element.on("input change", resize);
    }
  };
})

.directive('feed',function($rootScope, $ionicPopover, Dates ,$interval,$ionicLoading, $cordovaInAppBrowser, $ionicModal, $ionicPopup, $timeout,Http) {
  return {
    restrict: 'E',
    scope : {
      prefs : '=?',
      community : '=?',
      shrid : '=?'
    },
    templateUrl : 'templates/articlelist.html',
    link: function($scope, element,attrs) {
      $scope.refresh = function(counter){
        var feeds = {};
        $ionicLoading.show({
        template: 'Loading...',
        noBackdrop: true
        });
        var options = { "UserID" : 1, "count" : 0 };
        if(angular.isDefined($scope.prefs) && $scope.prefs){
          options.Pref = $scope.prefs;
        }else if(angular.isDefined($scope.community) && $scope.community){
          options.CommuID = $scope.community;
        }else if(angular.isDefined($scope.shrid) && $scope.shrid){
          options.ShrID = $scope.shrid;
        }
        Http.post('getfeeds',options)
        .success(function(data) {
          console.dir(data.Status.Articles);
          var ResponseCode = data.Status.ResponseCode;
          var ResponseMessage = data.Status.ResponseMessage;
          $ionicLoading.hide();
          if (ResponseCode == 200) {
              $scope.feeds = data.Status.Articles;
              console.dir(feeds);
          }
            else {
              $ionicPopup.alert({
                title: 'Message',
                template: $scope.ResponseMessage
              });
            }
        })
        .error(function(data) {
          //$scope.data.error={message: error, status: status};
          console.log("error" + data);
          $ionicLoading.hide();
        });
      }
      $scope.refresh(0);
      $scope.comments = null;
  		$scope.currentshrid = null;
      var communities = Http.getdata('communities').data;
      $scope.communities = communities.myCommunities.concat(communities.adminCommunities);
  		$ionicModal.fromTemplateUrl('templates/comments.html', {
  		  scope: $scope,
  		  animation: 'slide-in-up'
  		}).then(function(modal) {
  		  $scope.commentmodal = modal;
  		});
      $scope.timeSince = Dates.getintervalstring;
      var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
       };
       $scope.openBrowser = function(link) {
          $cordovaInAppBrowser.open(link, '_blank', options)

          .then(function(event) {
             // success
          })

          .catch(function(event) {
             // error
          });
       }
       $interval(function(){
         var i = 0;
         for(i=0;i < $scope.feeds.length;i++){
           $scope.feeds[i].LastEdited+=60;
         }
       },60000);

       $scope.followArticle = function(CommuID){
         console.log(CommuID);
         Http.post('followcommunity', {
          'UserID': $rootScope.UserID,
          'CommuID': CommuID
          })
         .success(function(data){
           $ionicLoading.show({
             template: 'Community Followed',
             duration : 1000
           });
           $scope.refresh(0);
         })
         .error(function(data){
           console.log('You are ');
         });
       }

       $scope.BookmarkArticle = function(index){
         console.log(index);
         var options = {
          'UserID': $rootScope.UserID,
          'ShrID': $scope.feeds[index].ShrID
        };
         var booked = $scope.feeds[index].Bookmarked;
         if(booked){
           options.action = 0;
         }else{
           options.action = 1;
         }
         Http.post('bookmark',options)
         .success(function(data){
           $ionicLoading.show({
             template: data.Status.ResponseMessage,
             duration : 1000
           });
           $scope.feeds[index].Bookmarked = !$scope.feeds[index].Bookmarked;
         })
         .error(function(data){
           console.log('You are ');
         });
       }

       $scope.likeArticle = function(index) {
        console.log('mama');
         if($rootScope.UserID && $scope.feeds[index].Liked == 0){
           Http.post('likearticle', {
            'UserID': $rootScope.UserID,
            'ShrID': $scope.feeds[index].ShrID,
              'Like': 'suar' // Like key for like and no Like key for unlike
            })
           .success(function(data){
             $scope.ResponseCode = data.Status.ResponseCode;
             $scope.ResponseMessage = data.Status.ResponseMessage;
             if ($scope.ResponseCode == 200) {
               $scope.feeds[index].Likes++;
               $scope.feeds[index].Liked = 1;
             }
             else {
               $ionicPopup.alert({
                 title: 'Message',
                 template: $scope.ResponseMessage
               });
             }
           })
           .error(function(data){
             console.log('You are ');
           });
         }else {
           Http.post('likearticle', {
            'UserID': $rootScope.UserID,
            'ShrID': $scope.feeds[index].ShrID,
             // Like key for like and no Like key for unlike
            })
           .success(function(data){
             $scope.ResponseCode = data.Status.ResponseCode;
             $scope.ResponseMessage = data.Status.ResponseMessage;
             if ($scope.ResponseCode == 200) {
               $scope.feeds[index].Likes--;
               $scope.feeds[index].Liked = 0;
             }else{
               $ionicPopup.alert({
                 title: 'Message',
                 template: $scope.ResponseMessage
               });
             }
           })
           .error(function(data){
             console.log('You are not sure');
           });
         };
       }
       var template = '<ion-popover-view style="height:110px"> ' +
                      '   <ion-content >' +
                      '       <div class="list">' +
                      '         <a class="item" style="border-bottom:1px solid #fff" ng-click="editArticle()">' +
                      '           Edit'+
                      '         </a>'+
                      '         <a class="item" ng-click="deleteArticle(tempitem,UserID)">' +
                      '           Delete'+
                      '         </a>'+
                      '       </div>'
                      '   </ion-content>' +
                      '</ion-popover-view>';

       $scope.popover2 = $ionicPopover.fromTemplate(template, {
          scope: $scope
      });
       $scope.openPopover1 = function($event,item){
        $scope.popover2.show($event);
        $scope.tempitem = item;
       };
      $scope.closePopover = function () {
          $scope.popover2.hide();
      };
      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function () {
          $scope.popover2.remove();
      });
       $scope.deleteArticle = function(item,UserID){
         var index = $scope.feeds.indexOf(item)
         console.log(index);
         $scope.feeds.splice(index, 1);
         Http.post('deletearticle',{
           'ShrID':item.ShrID,
           'UserID':UserID
         })
         .success(function(data){
           $scope.ResponseCode = data.Status.ResponseCode;
           $scope.ResponseMessage = data.Status.ResponseMessage;
           if ($scope.ResponseCode == 200){
             $scope.feeds.splice(index, 1);

             console.log("12344555555");
           //article.Isbookmark = false;
           }
         })
         $scope.popover2.hide();
       }


   		$scope.commentit = function(anon,comment){
   			if(!anon){
   				anon = 0;
   			}else{
   				anon = 1;
   			}
   			Http.post('commentarticle', {
   				'ShrID' : $scope.currentshrid,
   				'UserID' : $rootScope.UserID,
   				'Comment' : comment,
   				'Anon' : anon
   			}).success(function(data) {
   		 $scope.ResponseCode = data.Status.ResponseCode;
   		 $scope.ResponseMessage = data.Status.ResponseMessage;
   		 $ionicLoading.hide();
   		 if ($scope.ResponseCode == 200) {
   			 var newcomment = {'Comment' : comment, 'IsAnon' : anon, 'Replies' : {}, 'ComID' : data.Status.ComID, FullName : "Jon Snow"};
   			 $scope.comments.push(newcomment);
   			 $scope.commentmodal.someotherProperty = "";
   			 $scope.commentmodal.iscomanon = false;
   		 }
   			 else {
   				 $ionicPopup.alert({
   					 title: 'Message',
   					 template: $scope.ResponseMessage
   				 });
   			 }
   		 }).error(function(data) {
   			 //$scope.data.error={message: error, status: status};
   			 console.log("error" + data);
   			 $ionicLoading.hide();
   		 });
   		}
   		$scope.replyit = function(index, anon, reply){
         if(!anon){
   				anon = 0;
   			}else{
   				anon = 1;
   			}
         console.log(index);
         console.log(anon);
         console.log(reply);
   			var comid = $scope.comments[index].ComID;
         console.log(comid);
   			Http.post('commentarticle', {
   				'reply' : 'dc',
   				'ComID' : comid,
   				'UserID' : $rootScope.UserID,
   				'Comment' : reply,
   				'Anon' : anon
   			}).success(function(data) {
   		 $scope.ResponseCode = data.Status.ResponseCode;
   		 $scope.ResponseMessage = data.Status.ResponseMessage;
   		 $ionicLoading.hide();
   		 if ($scope.ResponseCode == 200) {
   			 var newreply = {'RepID' : data.Status.RepID, 'Reply' : reply, 'IsAnon' : anon, FullName : "Jon Snow", "RepID" : data.Status.RepID};
   			 $scope.comments[index].Replies.push(newreply);
   			 $scope.commentmodal.someProperty[index] = "";
   			 $scope.commentmodal.isrepanon[index] = false;
   		 }
   			 else {
   				 $ionicPopup.alert({
   					 title: 'Message',
   					 template: $scope.ResponseMessage
   				 });
   			 }
   		 }).error(function(data) {
   			 //$scope.data.error={message: error, status: status};
   			 console.log("error" + data);
   			 $ionicLoading.hide();
   		 });
   		}
   		$scope.openCommentModal = function(item){
         console.log(item);
   			$scope.currentshrid = item;
   			$ionicLoading.show({
   			template: 'Loading...',
   			noBackdrop: true
   			});
   			Http.post('getcomments',{ShrID : $scope.currentshrid})
   			 .success(function(data) {
   			$scope.ResponseCode = data.Status.ResponseCode;
   			$scope.ResponseMessage = data.Status.ResponseMessage;
   			$ionicLoading.hide();
   			if ($scope.ResponseCode == 200) {
   					$scope.comments = data.Status.Comments;
   					console.dir($scope.comments);
   			}else{
   				$ionicPopup.alert({
   					title: 'Message',
   					template: $scope.ResponseMessage
   				});
   			}
   			}).error(function(data) {
   				//$scope.data.error={message: error, status: status};
   				console.log("error" + data);
   				$ionicLoading.hide();
   			});
   			$scope.commentmodal.show();
   		}
       $scope.closeModal = function() {
         $scope.commentmodal.hide();
         };
         $scope.showPopup = function(shrid) {
             $scope.alertPopup = $ionicPopup.show({
             	template: '<select ng-model="alertPopup.selectedCommunity" ng-options="x.Name for x in communities"></select> <textarea elastic placeholder="Place your thoughts..." ng-model="alertPopup.shareSummary"></textarea>',
                 title: 'Share',
                 subTitle: 'Select one of your groups to share',
                 scope: $scope,
                 buttons: [
                 	{ text: 'Cancel' },
                 	{
                 		text: '<b>Share</b>',
                 		type: 'button-positive',
              			onTap: function(e) {
                     console.dir($scope.alertPopup);
                     if($scope.alertPopup.selectedCommunity != null){
                       console.log('Yeah');
                       var options = {
                         UserID : $rootScope.UserID,
                         ShrID : shrid,
                         CommuID : $scope.alertPopup.selectedCommunity.CommuID,
                         Type : 2
                       }
                       if($scope.alertPopup.shareSummary){
                         options.Summary = $scope.alertPopup.shareSummary;
                       }
                       $ionicLoading.show({
                 			template: 'Sharing...',
                 			noBackdrop: true
                 			});
                       console.dir(options);
                       Http.post('sharearticle',options)
                       .success(function(data){
                         $scope.ResponseCode = data.Status.ResponseCode;
                   			$scope.ResponseMessage = data.Status.ResponseMessage;
                   			$ionicLoading.hide();
                   			if ($scope.ResponseCode == 200) {
                           $ionicLoading.show({
                     			template: 'Article Shared',
                     			duration : 1000
                     			});
                           return data;
                   			}else{
                   				$ionicPopup.alert({
                   					title: 'Message',
                   					template: $scope.ResponseMessage
                   				});
                   			}
                       })
                       .error(function(data){
                         console.log("error" + data);
                 				$ionicLoading.hide();
                       })
                     }else{
                       e.preventDefault();
                     }
                   }
            		},
          		]
             });
         };
    }
  };
})

.directive('checkStrength', function() {
  return {
    replace: false,
    restrict: 'EACM',
    link: function(scope, iElement, iAttrs) {

      var strengths = {
        colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
        mesureStrength: function(pwd) {
          var nScore = 0,
            nLength = 0,
            nAlphaUC = 0,
            nAlphaLC = 0,
            nNumber = 0,
            nSymbol = 0,
            nMidChar = 0,
            nRequirements = 0,
            nUnqChar = 0,
            nRepChar = 0,
            nRepInc = 0,
            nConsecAlphaUC = 0,
            nConsecAlphaLC = 0,
            nConsecNumber = 0,
            nConsecSymbol = 0,
            nConsecCharType = 0,
            nSeqAlpha = 0,
            nSeqNumber = 0,
            nSeqSymbol = 0,
            nSeqChar = 0,
            nReqChar = 0;
            var strReverse = function(s){
              return s.split("").reverse().join("");
            };
          var nTmpAlphaUC = "",
            nTmpAlphaLC = "",
            nTmpNumber = "",
            nTmpSymbol = "";
          var sAlphas = "abcdefghijklmnopqrstuvwxyz";
          var sNumerics = "01234567890";
          var sSymbols = ")!@#$%^&*()";
          var sComplexity = "Too Short";
          if (pwd) {
            nScore = parseInt(pwd.length * 4);
            nLength = pwd.length;
            var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
            var arrPwdLen = arrPwd.length;

            /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
            for (var a = 0; a < arrPwdLen; a++) {
              if (arrPwd[a].match(/[A-Z]/g)) {
                if (nTmpAlphaUC !== "") {
                  if ((nTmpAlphaUC + 1) == a) {
                    nConsecAlphaUC++;
                    nConsecCharType++;
                  }
                }
                nTmpAlphaUC = a;
                nAlphaUC++;
              } else if (arrPwd[a].match(/[a-z]/g)) {
                if (nTmpAlphaLC !== "") {
                  if ((nTmpAlphaLC + 1) == a) {
                    nConsecAlphaLC++;
                    nConsecCharType++;
                  }
                }
                nTmpAlphaLC = a;
                nAlphaLC++;
              } else if (arrPwd[a].match(/[0-9]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                  nMidChar++;
                }
                if (nTmpNumber !== "") {
                  if ((nTmpNumber + 1) == a) {
                    nConsecNumber++;
                    nConsecCharType++;
                  }
                }
                nTmpNumber = a;
                nNumber++;
              } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                  nMidChar++;
                }
                if (nTmpSymbol !== "") {
                  if ((nTmpSymbol + 1) == a) {
                    nConsecSymbol++;
                    nConsecCharType++;
                  }
                }
                nTmpSymbol = a;
                nSymbol++;
              }
              /* Internal loop through password to check for repeat characters */
              var bCharExists = false;
              for (var b = 0; b < arrPwdLen; b++) {
                if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
                  bCharExists = true;
                  /*
                  Calculate icrement deduction based on proximity to identical characters
                  Deduction is incremented each time a new match is discovered
                  Deduction amount is based on total password length divided by the
                  difference of distance between currently selected match
                  */
                  nRepInc += Math.abs(arrPwdLen / (b - a));
                }
              }
              if (bCharExists) {
                nRepChar++;
                nUnqChar = arrPwdLen - nRepChar;
                nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
              }
            }

            /* Check for sequential alpha string patterns (forward and reverse) */
            for (var s = 0; s < 23; s++) {
              var sFwd = sAlphas.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqAlpha++;
                nSeqChar++;
              }
            }

            /* Check for sequential numeric string patterns (forward and reverse) */
            for (var s = 0; s < 8; s++) {
              var sFwd = sNumerics.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqNumber++;
                nSeqChar++;
              }
            }

            /* Check for sequential symbol string patterns (forward and reverse) */
            for (var s = 0; s < 8; s++) {
              var sFwd = sSymbols.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqSymbol++;
                nSeqChar++;
              }
            }

            /* Modify overall score value based on usage vs requirements */

            /* General point assignment */
            if (nAlphaUC > 0 && nAlphaUC < nLength) {
              nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
            }
            if (nAlphaLC > 0 && nAlphaLC < nLength) {
              nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2));
            }
            if (nNumber > 0 && nNumber < nLength) {
              nScore = parseInt(nScore + (nNumber * 4));
            }
            if (nSymbol > 0) {
              nScore = parseInt(nScore + (nSymbol * 6));
            }
            if (nMidChar > 0) {
              nScore = parseInt(nScore + (nMidChar * 2));
            }

            /* Point deductions for poor practices */
            if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) { // Only Letters
              nScore = parseInt(nScore - nLength);
            }
            if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) { // Only Numbers
              nScore = parseInt(nScore - nLength);
            }
            if (nRepChar > 0) { // Same character exists more than once
              nScore = parseInt(nScore - nRepInc);
            }
            if (nConsecAlphaUC > 0) { // Consecutive Uppercase Letters exist
              nScore = parseInt(nScore - (nConsecAlphaUC * 2));
            }
            if (nConsecAlphaLC > 0) { // Consecutive Lowercase Letters exist
              nScore = parseInt(nScore - (nConsecAlphaLC * 2));
            }
            if (nConsecNumber > 0) { // Consecutive Numbers exist
              nScore = parseInt(nScore - (nConsecNumber * 2));
            }
            if (nSeqAlpha > 0) { // Sequential alpha strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqAlpha * 3));
            }
            if (nSeqNumber > 0) { // Sequential numeric strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqNumber * 3));
            }
            if (nSeqSymbol > 0) { // Sequential symbol strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqSymbol * 3));
            }

            /* Determine if mandatory requirements have been met and set image indicators accordingly */
            var arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
            var arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
            var arrCharsLen = arrChars.length;
            for (var c = 0; c < arrCharsLen; c++) {
              if (arrCharsIds[c] == "nLength") {
                var minVal = parseInt(7);
              } else {
                var minVal = 0;
              }
              if (arrChars[c] == parseInt(minVal + 1)) {
                nReqChar++;
              } else if (arrChars[c] > parseInt(minVal + 1)) {
                nReqChar++;
              }
            }
            nRequirements = nReqChar;
            if (pwd.length >= 8) {
              var nMinReqChars = 3;
            } else {
              var nMinReqChars = 4;
            }
            if (nRequirements > nMinReqChars) { // One or more required characters exist
              nScore = parseInt(nScore + (nRequirements * 2));
            }

            /* Determine complexity based on overall score */
            if (nScore > 100) {
              nScore = 100;
            } else if (nScore < 0) {
              nScore = 0;
            }
            return nScore;
          } else {
            /* Display default score criteria to client */
            return 0;
          }

        },
        getColor: function(s) {
          var idx = 0;
          if (s <= 10) {
            idx = 0;
          } else if (s <= 20) {
            idx = 1;
          } else if (s <= 30) {
            idx = 2;
          } else if (s <= 40) {
            idx = 3;
          } else {
            idx = 4;
          }

          return {
            idx: idx + 1,
            col: this.colors[idx]
          };
        }
      };

      scope.$watch(iAttrs.checkStrength, function() {
        if (scope.pw === '') {
          iElement.css({
            "display": "none"
          });
        } else {
          var strength = strengths.mesureStrength(scope.pw);
          var c = strengths.getColor(strength);
          iElement.css({
            "display": "inline"
          });
          var elements = iElement.children('li');
          var i;
          for(i =0; i < elements.length;i++){
            if( i < c.idx){
              elements[i].style.background = c.col;
            }else{
              elements[i].style.background = "#DDD";
            }
          }
        }
      });

    },
    template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
  };
})
