import React, { useEffect, useState } from "react";
import axios from "axios";

import "./YoutubePlayerX.css";

function YoutubePlayerX(props) {
  const [video, setVideo] = useState("");

  let searchTerm;

  const normalizeSearchTerm = () => {
    if (props.name) {
      return (searchTerm = props.name.toLowerCase().split(" ").join("%20"));
    } else if (props.original_name) {
      return (searchTerm = props.original_name
        .toLowerCase()
        .split(" ")
        .join("%20"));
    }
  };

  normalizeSearchTerm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}%20series%20trailer%20${props.year}&key=${process.env.REACT_APP_YOUTUBEAPI_KEY}`
        );

        console.log(response);

        console.log(props.year);

        setVideo(response.data.items[0].id.videoId);
      } catch (err) {}
    };
    fetchData();
  }, [props]);

  console.log(props.year);

  console.log(searchTerm);

  let videoId = `${video}`;

  return (
    <div className="responsive-video">
      {searchTerm !== undefined ? (
        <iframe
          className="video-frame"
          src={`//www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="notrailer">
          <p>"Sorry, trailer not found"</p>
        </div>
      )}
    </div>
  );
}

export default YoutubePlayerX;