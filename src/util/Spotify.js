const clientID = "f9e87b59959d4119b791de8cb11adb35";
const redirectURI = "http://localhost:3000/";
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let access_token;
let expires_in;


const Spotify = {

  getAccessToken() {
    if (access_token) {
      return access_token;
    }
    let url = window.location.href;
    const foundAccessToken = url.match(/access_token=([^&]*)/);
    const foundExpiresIn = url.match(/expires_in=([^&]*)/);

    if(foundAccessToken && foundExpiresIn) {
          access_token = foundAccessToken[1];
          expires_in = Number(foundExpiresIn[1]);
          window.setTimeout(() => access_token = '', expires_in * 1000);
          window.history.pushState('Access Token', null, '/');
          return access_token;
    }
    else {
      window.location = spotifyUrl;
    }
  },

  savePlaylist(playlistName, trackURIs) {
    Spotify.getAccessToken();
    if(!playlistName && !trackURIs) {
      return;
    }
    const headers = {Authorization: `Bearer ${access_token}`};
    let userID = '';
    const userEndpoint = "https://api.spotify.com/v1/me";

    //getting the user ID from after logging into Spotify
    return fetch(userEndpoint, {headers: headers}).then(response => {
      return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;

        //after getting the id, make a post request for the new playlist
        let playlistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
        return fetch(playlistEndpoint, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            name: playlistName
          })
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            let playlistID = jsonResponse.id;

            //after posting the playlist
            return fetch(`${playlistEndpoint}/${playlistID}/tracks`, {
              headers: headers,
              method: "POST",
              body: JSON.stringify({uris: trackURIs})
            });
        })
     })
  },

search(searchTerm) {
  Spotify.getAccessToken();
  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
  return fetch(endpoint, {headers: {
    Authorization: `Bearer ${access_token}`
  }}).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if(!jsonResponse.tracks){
        return [];
      }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      preview: track.preview_url
    }));
  })
}

}

export default Spotify;
