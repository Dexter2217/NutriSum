var Profile = (function(){
    var privateMembers = {
        saveProfileButton : $(".profile-submit")
    };

    var publicMembers = {
        "init": function () {
            publicMembers.bindUI();
        },
        "bindUI": function () {
            $(document).on('click', privateMembers.saveProfileBtn, publicMembers.computeCalorieTarget);
        }
        "computeCalorieTarget" : function (event) {

        }
    };

})();
