// https://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#

export const authEndpoint = 
"https://accounts.spotify.com/authorize";
const redirectUri = "https://spotify-clone-f724b.web.app/";
const clientId = "b91b6519b94448a3bd0b6071955761f8";

// Gives the user the correct permissions
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            // #accessToken=mysupersecretkey&name=sonny
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;