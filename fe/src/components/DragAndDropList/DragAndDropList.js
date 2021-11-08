import {Button, Input, List, ListContainer, ListItem} from "./styles";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Icon} from "@iconify/react";
import React, {useCallback, useEffect, useState} from "react";
import {SocketContext} from "../socket";

export const DragAndDropList = ({playlist, setPlaylistData}) => {
    const [id, setId] = useState('')
    const socket = React.useContext(SocketContext);

    useEffect(() => {
        socket.emit("client_join");
        return () => socket.disconnect();
    }, [socket]);

    const reorderPlaylist = (result) => {
        const items = Array.from(playlist);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        return items
    }

    const handleOnDragEnd = useCallback((result) => {
        if (!result.destination) return;
        const reorderedPlaylist = reorderPlaylist(result)
        setPlaylistData(reorderedPlaylist);
        socket.emit('reorder', reorderedPlaylist)
    }, [playlist, setPlaylistData])

    const handleAddVideo = useCallback(() => {
        socket.emit('add', id)
        setId('')
    }, [id])

    const handleDeleteVideo = useCallback((e, indexToDelete) => {
        //if we are deleting the first item we will delete it only from the client
        // because other clients maybe watched this video till the end(and now their first video is different)
        if (indexToDelete === 0) {
            socket.emit('deleteAtEnd', indexToDelete, socket?.id)
        } else {
            socket.emit('delete', indexToDelete)
        }
    }, [])

    return (
        <ListContainer>
            <form onSubmit={handleAddVideo} id="inputContainer">
                <Input
                    data-testid="input"
                    type="text"
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value)
                    }}
                    placeholder="Enter video ID"
                />
                <Button
                    disabled={id.length < 11}
                    onClick={handleAddVideo}>
                    Add
                </Button>
            </form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="videos">
                    {(provided) => {
                        return (
                            <List {...provided.droppableProps} ref={provided.innerRef}>
                                {playlist?.length > 0 && playlist.map((video, index) =>
                                    <Draggable key={video.id} draggableId={video.id} index={index}>
                                        {(provided) => {
                                            return (
                                                <ListItem
                                                    data-testid="listItem" {...provided.draggableProps} {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    isCurrent={video.id === playlist[0].id}>
                                                    <div id="textContainer">
                                                        <div className="text">
                                                            {video.title}
                                                        </div>
                                                        {video.duration}
                                                    </div>
                                                    <div id="iconContainer"
                                                         data-testid={`deleteButton${index}`}
                                                         onClick={(e) => handleDeleteVideo(e, index)}>
                                                        <Icon width="33" height="42" icon="mdi:delete-outline"/>
                                                    </div>
                                                </ListItem>
                                            )
                                        }}
                                    </Draggable>
                                )}
                            </List>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        </ListContainer>
    )
}