import React, {useCallback, useEffect, useState} from 'react'
import YouTube from 'react-youtube';
import {Container} from "./styles";
import useLayoutSize from '../../hooks/useLayoutSize';
import {DragAndDropList} from "../DragAndDropList/DragAndDropList";
import {SocketContext} from "../socket";

export const playlistHeight = '550'
export const Playlist = () => {
    const [playlistData, setPlaylistData] = useState([])
    const [width] = useLayoutSize();

    const socket = React.useContext(SocketContext);

    const opts = {
        height: playlistHeight,
        width: width / 2,
        playerVars: {
            autoplay: 1,
            controls: 0
        },
    };

    useEffect(() => {
        socket.emit("client_join");
        return () => socket.disconnect();
    }, []);

    socket.on('playlist', (playlist) => {
        setPlaylistData(playlist)
    })

    const handleDeleteFromClient = useCallback((e, indexToDelete) => {
        e.target.playVideo()
        socket.emit('deleteAtEnd', indexToDelete, socket?.id)
    }, [])

    const _onReady = useCallback((event) => {
        event.target.playVideo()
    }, [])

    return (
        <Container>
            <DragAndDropList playlist={playlistData} setPlaylistData={setPlaylistData}/>
            <YouTube
                videoId={playlistData[0]?.videoId}
                opts={opts}
                onEnd={(e) => handleDeleteFromClient(e, 0)}
                onReady={_onReady}
            />
        </Container>
    )
}


