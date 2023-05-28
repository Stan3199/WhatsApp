import { Avatar } from '@material-ui/core';
import React, { useEffect,useState } from 'react'
import './SidebarChat.css';
import db from './firebase';
import {Link} from "react-router-dom";

function SidebarChat({addNewChat, id, name}) {

    const [seed, setseed] = useState('');
    const [messages, setmessages] = useState([])
    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000))
    },[])

    useEffect(() => {
        if(id){
            db.collection('Rooms').doc(id)
            .collection('messages')
            .orderBy('timestamp','desc').
            onSnapshot(snapshot=>{
                setmessages(snapshot.docs.map(doc=>doc.data()))
            })
        }
    }, [id])

    const createChat =()=>{
        const roomName = prompt("Please enter name for chat");

        if(roomName) {
            //do some
            db.collection('Rooms').add({
                name:roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2> {name}
                    </h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2> Add new chat</h2>
        </div>
    )
}

export default SidebarChat
