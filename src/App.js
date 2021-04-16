import './App.css';
import {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import Pusher from 'pusher-js'
import axios from './axios'
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    document.title='WhatsappClone Sushil'
    axios.get('/messages/sync')
    .then(responce=>{
      setMessages(responce.data)
    })

  },[])

  
  useEffect(()=>{
    const  pusher = new Pusher('f60ca51060b31bc3b722', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessages) =>{
      setMessages([...messages,newMessages])
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  console.log(messages)
  return (
    <div className="app">
      <h1> Whatsapp clone by- <InsertEmoticonIcon/>Sushil Singh</h1>
      <div className='app_body'> 
      <Sidebar/>
      <Chat messages={messages}/>


      </div>
      <footer>
        @all right reserved #Sushil Singh
      </footer>
      
    </div>
  );
}

export default App;
