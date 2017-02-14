
var FoodLog = (function () {

  var privateMembers = {
    manualAddButton: $("#manualAdd"),
    manualEntryForm: $("#manual-entry-form"),
    totalCalories: null,
    totalFat: null,
    targetCalories: null,
    targetFat: null,
    consumedFoodItems: [], //List of food item objects

    clearForm: function(nameRef, caloriesRef, fatRef) {
      nameRef.val("");
      caloriesRef.val("");
      fatRef.val("");
    },
  };

  var publicMembers = {
    init: function() {
      console.log("init called!");
      publicMembers.bindUI();
      //this.friendTest();
    },

    bindUI: function() {
      console.log("bindUI called!");
      //this.manualAddButton.on( "click", addManualItem);
      privateMembers.manualEntryForm.submit(publicMembers.addManualItem);
    },

    //Get total of a certain category from the consumedFoodItems array
    getTotal: function(category) {
      var firstNumber,
      result = 0;

      if (privateMembers.consumedFoodItems.length === 1)
      {
        return privateMembers.consumedFoodItems[0][category];
      }
      else
        privateMembers.consumedFoodItems.map(function(foodItem) {
          result += parseInt(foodItem[category]);
        });
        return result;
    },

    //Add item to consumedFoodItems list
    addConsumedItem: function(foodItemObject) {

      console.log("You have logged item: ");
      console.log(foodItemObject);


      privateMembers.consumedFoodItems.push(foodItemObject);
      publicMembers.addToList(foodItemObject);
      publicMembers.updateFoodLogData();

      /*console.log("ConsumerFoodItems Array: ");
      console.log(privateMembers.consumedFoodItems);
      console.log("current total calories is: " + publicMembers.getTotal("calories"));*/

    },

    addManualItem: function(event) {

      event.preventDefault();
      console.log("addToIntake called!");
      var $name = $("#name");
      var $calories = $("#calories");
      var $fat = $("#fat");

      var manualFoodItem = {
        name: $name.val(),
        calories: $calories.val(),
        fat: $fat.val()
      };

      publicMembers.addConsumedItem(manualFoodItem);
      //TODO: Make this take any number of inputs
      privateMembers.clearForm($name, $calories, $fat);
    },

    updateFoodLogData: function() {
      privateMembers.totalCalories = publicMembers.getTotal("calories");
      privateMembers.totalFat = publicMembers.getTotal("fat");
      publicMembers.updateFoodLogDisplay();
    },

    updateFoodLogDisplay: function() {
      var $currentCalories = $("#current-calories"),
      $currentFat = $("#current-fat");

      $currentCalories.text(privateMembers.totalCalories);
      $currentFat.text(privateMembers.totalFat);
    },

    addToList: function(foodItemObject) {
      $(".intake-list").append("<li><p>Name: "+ foodItemObject.name + "</p><p>Calories: " + foodItemObject.calories + "</p><p>Fat: " + foodItemObject.fat + "</p>");
    }
  };

  return publicMembers;



})();
