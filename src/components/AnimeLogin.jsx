import React, { useEffect, useState } from "react";
import { SiMyanimelist } from "react-icons/si";
import "../styles/components/animeLogin.scss";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const AnimeLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handelLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/anime-proxy`, {
        params: { challenge: sessionStorage.getItem("codeChallenge") },
      });

      const path = `https://myanimelist.net${response.data.path}`;
      window.location.href = path;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="anime-login">
        <div>
          <img src="/assets/images/anime-login.svg" />
        </div>
        <div>
          {isLoading ? (
            <CircularProgress sx={{ color: "#f75151" }} />
          ) : (
            <button onClick={handelLogin}>
              Login with <SiMyanimelist size={25} className="icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeLogin;
