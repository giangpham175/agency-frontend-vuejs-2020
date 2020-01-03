$(document).ready(function () {
});

function facebookLogin() {
    var FB = window.FB;
    var scopes = 'email,public_profile';
    FB.login(function (data) {
        console.log(data);
        if (data.status === 'connected') {
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
                localStorage.setItem("name", response.name);
                localStorage.setItem("username", response.id);
                login(data.authResponse.accessToken);
            });
        }
    }, {
        scope: scopes
    });
}

function login(token) { 
    $.post(API.login, {access_token: token},
        function (data, textStatus, jqXHR) {
            console.log(data.data);
            if (data.status == 200) {
                console.log("Login success");
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                location.replace(SITE_URL);
            }else{
                alert(data.error);
            }
        },
    );
}