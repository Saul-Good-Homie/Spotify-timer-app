import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistButton from "../ContentButtons/PlaylistButton";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setToken(localStorage.getItem("accessToken"));
  //   }
  // }, []);


  //use effect to get token from server
  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  //call the playlist endpoint and retrieve playlists

  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleGetPlaylists}>Get Playlists</button>
      {data?.items ? data.items.map((item) => <PlaylistButton data={item.name}></PlaylistButton>) : null}
    </>
  );
};

export default SpotifyGetPlaylists;