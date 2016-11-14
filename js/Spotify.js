var TransitionGroup = React.addons.CSSTransitionGroup;
var Spotify = Spotify || {};

Spotify.addr = 'https://api.spotify.com/v1/';

Spotify.auth = {
    clientId: "c0dce3be8fcf44bca854a6407965ba8c",
    clientSecret: "0b5e934ca37a40dabcaf33987a3cde69",
    redirectUrl: "http://127.0.0.1:8080/index.html",
    accessToken: "",
    login(callback) {
        var url = 'https://accounts.spotify.com/authorize?client_id=' + Spotify.auth.clientId +
            '&redirect_uri=' + encodeURIComponent(Spotify.auth.redirectUrl) +
            '&response_type=token';

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.location = url;
    }
}

Spotify.client = {
    get(url, callback) {
        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + Spotify.auth.accessToken,
            },
            success: function(response) {
                callback(response);
            },
            error: function(http) {
                if (http.status == 401) {
                    Spotify.auth.login();
                }
            }
        });
    },

    fetch(type, id, callback) {
        $.ajax({
            url: Spotify.addr + type + '/' + id,
            success: function(response) {
                callback(response);
            },
            error: function(http) {
                if (http.status == 401) {
                    Spotify.auth.login();
                }
            }
        });
    },

    search(query, type, callback) {
        $.ajax({
            url: Spotify.addr + 'search',
            data: {
                q: query,
                type: type,
                limit: 50
            },
            success: function(response) {
                callback(response);
            }
        });
    }
}

if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    var token = hash.substr(hash.indexOf('access_token')).split('&')[0].split('=')[1];
    if (token) Spotify.auth.accessToken = token;
}