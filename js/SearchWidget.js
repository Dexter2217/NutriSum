

var SearchWidget = (function () {

  var privateMembers = {
    resultsObject: null,
    resultsList: $(".results-list"),
    searchButton: "#search-button",
    resultBtn: ".result-btn",

  };

  var publicMembers = {

    init : function(){
        publicMembers.bindUI();

        console.log(FoodLog);
    },



    bindUI: function() {
        $(document).on('click', privateMembers.searchButton, publicMembers.getItems);
        $(document).on('click', privateMembers.resultBtn, publicMembers.addResultItem);
        //privateMembers.searchButton.on( "click", publicMembers.getItems);
        //privateMembers.resultBtn.on("click", publicMembers.addResultItem);
    },

    getItems: function() {
        var searchText = $("#search-box").val(),
        ajaxCall;

        ajaxCall = $.ajax({
            "url": "https://nutritionix-api.p.mashape.com/v1_1/search/"+ searchText + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat",
            "type": 'GET',
            "dataType": 'json',
            "beforeSend": function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "flHqbbu2s8mshUXPmSKAWjbaY09Up1Ey0Upjsn8qvZ6pJTfNLL"); // Enter here your Mashape key
            }
        });

        ajaxCall.then(publicMembers.onSuccess, publicMembers.onFailure);

    },

    addResultItem: function() {
        var currentResultItem = $(this).closest(".result-item");

        var foodItem = {
            name: $(currentResultItem).find(".item-name").text().split(": ")[1],
            calories: $(currentResultItem).find(".calorie-name").text().split(": ")[1],
            fat: $(currentResultItem).find(".fat-name").text().split(": ")[1]
        };

        FoodLog.addConsumedItem(foodItem);

    },

    buildResultList: function() {
        console.log("The result list");
        console.log(privateMembers.resultsObject);
        privateMembers.resultsObject.map(function(item){
            var listItem = $(document.createElement('li'));
            listItem.addClass("result-item");
            privateMembers.resultsList.append(listItem);

            var brandNameElement = $('<p/>', {
                text: 'Brand: ' + item.fields.brand_name,
                class: "brand-name"
            });

            var itemNameElement = $('<p/>', {
                text: 'Item Name: ' + item.fields.item_name,
                class: "item-name"
            });

            var caloriesElement = $('<p/>', {
                text: 'Calories: ' + item.fields.nf_calories,
                class: 'calorie-name'
            });

            var fatElement = $('<p/>', {
                text: 'Fat: ' + item.fields.nf_total_fat,
                class: 'fat-name'
            });

            var buttonElement = $("<a href='#' class='result-btn'>Add to Daily Intake</a>");

            listItem.append(brandNameElement);
            listItem.append(itemNameElement);
            listItem.append(caloriesElement);
            listItem.append(fatElement);
            listItem.append(buttonElement);
          });
    },

    onSuccess: function(data) {
        console.log("Data is: ");
        console.log(data);
        privateMembers.resultsObject = data.hits;
        privateMembers.resultsList.html("");
        publicMembers.buildResultList();
    },

    onFailure: function(req, status, err) {
        console.log("ERROR: " + req  + " " + status + " " + err);
    }
  };

  return publicMembers;


})();
