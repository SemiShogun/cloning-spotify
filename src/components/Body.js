import React from 'react';
import './Body.css';
import Header from './Header';
import { useDataLayerValue } from '../DataLayer';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Songrow from './Songrow';

function Body({ spotify }) {
    const [{ discover_weekly, playlists }, dispatch] = useDataLayerValue();

    console.log('playlists 1', playlists);

    const playPlaylist = id => {
        spotify
            .play({
                context_uri: `spotify:playlist:${discover_weekly.id}`
            })
            .then(res => {
                spotify.getMyCurrentPlayingTrack().then(r => {
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    const playSong = id => {
        spotify
            .play({
                uris: [`spotify:track:${id}`]
            })
            .then(res => {
                spotify
                    .getMyCurrentPlayingTrack().then(r => {
                        dispatch({
                            type: "SET_ITEM",
                            item: r.item,
                        });
                        dispatch({
                            type: "SET_PLAYING",
                            item: true,
                        });
                    });
            });
    }

    return (
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body__info">
                <img 
                    src={discover_weekly?.images[0].url} 
                    alt="" 
                />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{discover_weekly?.name}</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            {console.log("hello")}

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon 
                        className="body__shuffle"
                        onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {/* List of Songs */}
                {discover_weekly?.tracks.items.map(item => (
                    <Songrow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body;
