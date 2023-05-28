import React from 'react';

import './Sidebar.css';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert,SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import {useState, useEffect} from 'react';
import db from './firebase';
import {useStateValue} from './StateProvider';

function Sidebar() {
    const [{user},dispatch]=useStateValue();
    const [rooms, setrooms] = useState([]);
    

    useEffect(()=>{
        const unsubscribe = db.collection('Rooms').onSnapshot(snapshot=>{
            setrooms(snapshot.docs.map(doc=>
                ({
                    id:doc.id,
                    data:doc.data(),
                })
            ));
        })

        return ()=>{
            unsubscribe();
        }

    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}></Avatar>
                <div className="sidebar__headerRight">
                    <IconButton >
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" ></input>
                </div>
                
                

            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
