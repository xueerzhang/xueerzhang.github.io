/*
pseudocode: 

*/


window.fbAsyncInit = function() {
    //setup Facebook SDK for Javascript
    FB.init({
        appId: '289711791224570',
        status: true, //reduce the time it takes to check for the state of a logged-in user
        xfbml: false, //not using social plugins, improve page load times
        version: 'v2.1' //determine which Graph API version is used
    });

    // determine if a user is logged in to Facebook and has authenticated this app
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') { // the user is logged in and has authenticated this app 
            // response.authResponse supplies the user's ID, a valid access token, a signed request, and the time the access token and signed request each expire
            // var uid = response.authResponse.userID;
            // var accessToken = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') { // the user is logged in to Facebook, but has not authenticated this app
            // prompt to authenticate this app
        } else { // the user isn't logged in to Facebook
            // prompt to log in
        }
    });

    //check user login status and request permission for accessing user notifications
    FB.login(function(response) {
        // console.log("FB.Login response: " + response.toSource());

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
            });

            //access all the notifications of the user
            FB.api("/me/notifications", function(response) {
                console.log("/me/notifications response: " + response.toSource());

                console.log("the length of /me/notifications/data array: " + response.data.length);
                //console.log("/me/notifications/data/summary/unseen_count response: " + response.summary.unseen_count.toSource());
                var nCount = response.data.length; // get the total amount of notifications
                console.log("nCount = " + nCount);

                // create a bubble for each notification
                var i;
                for (i = 0; i < (nCount + 1); i++) {
                    console.log("i = " + i);

                    //console.log("/me/notifications/data/id response: " + response.data[i].id.toSource());
                    var nId = "/" + response.data[i].id; // get the id of each notification
                    console.log("notification id: " + nId);
                    console.log("notification title: " + response.data[i].title.toSource());

                    var newBubble = $("<div/>"); //create a div for a new bubble 
                    $(newBubble).attr("id", i).addClass("bubble"); //give newBubble div an id and a class

                    //set a random color to each bubble
                    //reference: http://stackoverflow.com/questions/5897573/jquery-random-background-color-and-color-on-2-divs
                    var colors = ["#45b29d", "#efc94c", "#e27a3f", "#df4949"];
                    var rand = Math.floor(Math.random() * colors.length);
                    var randColor = colors[rand];
                    $(".bubble").css("background-color", randColor);

                    //set different animation path to each bubble
                    var randAnimation = "bounce" + Math.floor(Math.random() * 2) + " 30s linear 0s infinite alternate";
                    $(".bubble").css("-webkit-animation", randAnimation);
                    $(".bubble").css("animation", randAnimation);

                    $("#canvas").append(newBubble); //append the newBubble div to the bubbletification canvas
                    console.log("poping bubble " + i + " of color " + randColor);
                };
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'manage_notifications', //request one additional permission from user
        // return_scopes: true //receive a list of the granted permissions in the grantedScopes field on the authResponse object
        // console.log("Listing granted permissions: " + response.authResponse.grantedScopes);
    });

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// //init
// var init = function() {
//     console.log("init success");
// };

// //doc load listener
// $(document).ready(function() {
//     //call init() func when the page loads
//     init();
// });
