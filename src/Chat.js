import { Avatar ,IconButton} from '@material-ui/core'
import React , {useState} from 'react'
import './chat.css'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import axios from './axios'




function Chat({ messages }) {
    const [input, setInput]=useState('')


    const sendMessage= async (e)=>{
        e.preventDefault();
        await axios.post('/messages/new',{
            message:input,
            name:'Demo name',
            timestamp:'just now', 
            received:false
        });
        setInput('')
    }
    return (
        <div className='chat'>
<div className='chat_header'>
    <Avatar/> 
    <div className='chat_headerInfo'>
        <h3> Room Name</h3>
        <p> Last seen...</p>

    </div>
    <div className='chat_headerRight'> 
          <IconButton>
              <SearchOutlined/>
          </IconButton>
          <IconButton>
          <AttachFile/>
          </IconButton>
          <IconButton>
              <MoreVert/>
          </IconButton>
        </div>    
    </div>  
    <div className='chat_body'>
        {messages.map(message=>(
            <p className={`chat_message ${message.received || 'chat_receiver'}`}>
            <span className='chat_name'>
                {message.name}
            </span>
            {message.message}
            <span className='chat_timestamp'>
                {message.timestamp}
                </span></p>        


        ))}

        

        </div> 
        <div className='chat_footer'>
            <IconButton>
            <InsertEmoticonIcon/>
            </IconButton>
            <form>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a Message'
                type='text'/>
                <button type='submit' onClick={sendMessage}> Send a message </button>
                <PhotoLibraryIcon/>
                <MicIcon/>
            </form>


        </div>

        
        
    
        </div>
    )
}

export default Chat
