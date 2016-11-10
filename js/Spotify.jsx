var TransitionGroup = React.addons.CSSTransitionGroup;
var Spotify = Spotify || {};

Spotify.addr = 'https://api.spotify.com/v1/';

Spotify.auth = {
    clientId: "c0dce3be8fcf44bca854a6407965ba8c",
    clienSecret: "0b5e934ca37a40dabcaf33987a3cde69",
    redirectUrl: "http://localhost:8080/callback"
}

Spotify.client = {
    fetch: function(type, id, callback) {
        $.ajax({
            url: Spotify.addr + type + '/' + id,
            success: function(response) {
                callback(response);
            }
        });
    },

    search: function(query, type, callback) {
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