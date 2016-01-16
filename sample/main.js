var userService = require('./userService');
var css = require("./style.scss");

var users = userService.getAll();;
users.forEach(function(user) {
    $('#list').append('<li>' + user.name + '</li>');
});

$('#img').attr('src', require("./euricom.png"));
