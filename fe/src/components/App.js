import {Playlist} from "./Playlist/Playlist";
import Container from "./styles"
import {socket, SocketContext} from "./socket";
import React from "react";

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Container style={{height: '550px'}}>
                <Playlist/>
            </Container>
        </SocketContext.Provider>
    );
}

export default App;
