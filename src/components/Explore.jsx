import React from "react";
import { Container, Row } from "react-bootstrap";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { listSongs } from "../graphql/queries";
import { updateSong } from '../graphql/mutations';
import { useState, useEffect } from "react";
import {IconButton} from "@material-ui/core"
import FavoriteIcon from '@material-ui/icons/Favorite';
Amplify.configure(awsconfig);

const FIRST_IMAGE = {
  imageUrl:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90062/trinity_oli_2015119_lrg.jpg",
};
const SECOND_IMAGE = {
  imageUrl:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90062/trinity_oli_2017092_lrg.jpg",
};

function Explore() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs));
      const songList = songData.data.listSongs.items;
      console.log("song list", songList);
      setSongs(songList);
    } catch (error) {
      console.log("error on fetching songs", error);
    }
  };

  const addLike = async idx => {
    try {
        const song = songs[idx];
        song.like = song.like + 1;
        delete song.createdAt;
        delete song.updatedAt;

        const songData = await API.graphql(graphqlOperation(updateSong, { input: song }));
        const songList = [...songs];
        songList[idx] = songData.data.updateSong;
        setSongs(songList);
    } catch (error) {
        console.log('error on adding Like to song', error);
    }
};

  return (
    <div className="explore">
      <div className="slider">
        <Container fluid>
          <Row>
            <ReactBeforeSliderComponent
              firstImage={FIRST_IMAGE}
              secondImage={SECOND_IMAGE}
            />
          </Row>
          <Row>
            {songs.map((song,idx) => {
              return (
                <div className="experiment" key={`song${idx}`}>
                  <p>Song title: {song.title}</p>
                  <p>Song likes: 
                    <IconButton aria-label="like" onClick={() => addLike(idx)}>
                      <FavoriteIcon/>
                    </IconButton>
                    {song.like}
                  </p>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Explore;
