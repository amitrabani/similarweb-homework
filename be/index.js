const express = require('express');
const axios = require("axios");
const app = express();
const shortid = require("shortid");
const moment = require("moment");
let http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {origin: 'http://localhost:3000', credentials: true},
});

const PORT = 4000;
app.use(express.json());

http.listen(PORT)

let videosIds = []
let videosInfo = []
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3/videos?part='

// videosSnippet holds the videos title,
// videosContentDetails holds the duration
const mapIdsToInfo = (videosSnippet, videosContentDetails) => {
    return videosSnippet.data?.items.map((video, index) => {
            const videoDuration = new Date(
                moment
                    .duration(videosContentDetails.data?.items[index]?.contentDetails?.duration) * 1000)
                .toISOString().substr(11, 8);
            return {
                id: shortid.generate(),
                videoId: video.id,
                title: video.snippet.title,
                duration: videoDuration
            }
        }
    )
}

const broadcastPlaylist = (newPlaylist) => {
    io.emit('playlist', newPlaylist)
}

const fetchVideosInfo = () => {
    return axios.all([
        axios.get(`${youtubeApiBaseUrl}snippet&id=${videosIds}&key=AIzaSyDFI9fi9EacVEUE078VC9Kpo8LlfwbCsqM`),
        axios.get(`${youtubeApiBaseUrl}contentDetails&id=${videosIds}&key=AIzaSyDFI9fi9EacVEUE078VC9Kpo8LlfwbCsqM`)
    ])
        .then(axios.spread((res1, res2) => {
            videosInfo = mapIdsToInfo(res1, res2)
            broadcastPlaylist(videosInfo)
        }))
        .catch((err => console.log(err)))
}

const deleteVideo = (index) => {
    if (videosInfo[index]) {
        videosInfo.splice(index, 1);
    }
    if (videosIds[index]) {
        videosIds.splice(index, 1)
    }
}

io.on('connection', (socket) => {
    socket.on("client_join", () => {
        broadcastPlaylist(videosInfo)
    });
    socket.on('add', (id) => {
        videosIds.push(id)
        fetchVideosInfo()
    });
    socket.on('reorder', (newPlaylist) => {
        broadcastPlaylist(newPlaylist)
    })
    socket.on('delete', (index) => {
        deleteVideo(index)
        broadcastPlaylist(videosInfo)
    })
    socket.on('deleteAtEnd', (index, sessionID) => {
        deleteVideo(index)
        io.to(sessionID).emit('playlist', videosInfo)
    })
})

// check if videos starts
// test on server if 200