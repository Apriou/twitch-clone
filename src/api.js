import axios from "axios";

const CLIENT_ID = "kte23fzog6o1eoq9ojpasu6aoqmmvf";
//const REDIRECT_URI = 'http://localhost:3000/'
//const REDIRECT_URI = 'http://apriou.freeboxos.fr:49164/'
const REDIRECT_URI = "https://apriou-twitch-clone.herokuapp.com/";

export const apiConnection = () => {
  const url =
    "https://id.twitch.tv/oauth2/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    REDIRECT_URI +
    "&response_type=token";
  //console.log('url : ', url);
  window.location.href = url;

  return null;
};

export const getTokenValidation = () => {
  const api = axios.create({
    headers: {
      Authorization: "OAuth " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://id.twitch.tv/oauth2/validate");
};

export const getTopGames = () => {
  //console.log('getTopGames access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/games/top");
};

export const getTopStreams = () => {
  //console.log('getTopStreams access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/streams");
};

export const getGames = (ids) => {
  //console.log('getGames access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/games?" + ids);
};

export const getUsers = (query) => {
  //console.log('getUsers access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/users?" + query);
};

export const getStreamByUserLogin = (userLogin) => {
  //console.log('getStreamByUserLogin access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/streams?user_login=" + userLogin);
};

export const getStreamsByGameId = (gameId) => {
  //console.log('getStreamsByGameId access_Token', localStorage.getItem("access_token"));

  const api = axios.create({
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  return api.get("https://api.twitch.tv/helix/streams?game_id=" + gameId);
};
