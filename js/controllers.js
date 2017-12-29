angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HelpCtrl', function($scope) {})

.controller("DBCtrl", function($scope, $cordovaSQLite) {
  function clear() {
    $scope.inputID = null;
    $scope.inputName = null;
    $scope.inputAge = null;
    $scope.inputGender = null;
    $scope.inputVocals = null;
    $scope.inputRole = null;
    $scope.inputNotes = null;
    $scope.inputScore = null;
  }
  clear();

  $scope.shouldShowDelete = false;

  $scope.dbData = { items: [
                  {   num: '0', nameText:"Joke text", age:'0', genderText:"Gender Text", vocalText:"Vocal Text", roleText:"Role Text", notesText:"Note Text",  score:'0'}
                ]}; 

  $scope.resetForm = function() {
    clear();
    console.log("It's working TM");
  }

  $scope.deleteItem = function(pls, index) {
    var query = "DELETE FROM auditionee WHERE num = ?"
    console.log(typeof pls);
    $cordovaSQLite.execute($scope.db,query,[pls]).then(function(result) {
    })
    $scope.dbData.items.splice(index, 1)
  }
 
  $scope.insert = function( ) {
    if(!angular.isDefined($scope.inputID) || 
      !angular.isDefined($scope.inputName) )
    {
      alert("Enter both the ID and name:");
      return;
    } 
    /*
    var queryNum = "SELECT num FROM auditionee WHERE num = ?";

    $cordovaSQLite.execute($scope.db,queryNum,[$scope.inputID]).then(function(result) {
      if(result != null) {
        alert("Cannot add unique of same ID");
        console.log($scope.inputID);
        throw new Error("error");
      }
    })
*/
    myID = $scope.inputID;
    myName = $scope.inputName;
    myAge = $scope.inputAge;
    myGender = $scope.inputGender;
    myVocals = $scope.inputVocals;
    myRole = $scope.inputRole;
    myNotes = $scope.inputNotes;
    myScore = $scope.inputScore;
    var query = "INSERT INTO auditionee (num, name, age, gender, vocals, role, notes, score) VALUES (?,?,?,?,?,?,?,?)";
    $cordovaSQLite.execute($scope.db,query,[myID, myName, myAge, myGender, myVocals, myRole, myNotes, myScore]).then(function(result) {
      console.log("INSERT ID -> " + myID + "name:" + myName + " " + myAge);
      }, 
    function(error) {
      console.error(error);
       });
    clear();
  };
 
  $scope.select = function() {
    var query = "SELECT * FROM auditionee";
    $scope.dbData.items.length = 0;  // clear out the array
    $cordovaSQLite.execute($scope.db,query,[]).then(function(result) {
      if(result.rows.length > 0) {
        for(i = 0; i<result.rows.length; i++){
          $scope.dbData.items.push({
            num: result.rows.item(i).num,
            nameText: result.rows.item(i).name,
            age: result.rows.item(i).age,
            genderText: result.rows.item(i).gender,
            vocalText: result.rows.item(i).vocals,
            roleText: result.rows.item(i).role,
            notesText: result.rows.item(i).notes,
            score: result.rows.item(i).score
          }); 
        }       
      } else {
        console.log("NO ROWS EXIST");
      }
    }, function(error) {
      console.error(error);
    });
  };
})
.controller("DetailCtrl", function($scope, $cordovaSQLite, $stateParams) {
     $scope.auditionee = {
    };

    var query = "SELECT * FROM auditionee WHERE num=?";

    $cordovaSQLite.execute($scope.db,query,[$stateParams.num]).then(function(result) {
      if(result.rows.length != 1) {
        // reditect
        return;
      }
      $scope.auditionee = result.rows.item(0);
    });
});