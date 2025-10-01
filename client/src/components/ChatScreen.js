import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Box, AppBar, Toolbar, Avatar, Typography, TextField} from '@mui/material'
import MessageCard from './MessageCard'

const ChatScreen = () => {
  const {id,name} = useParams()
  const [messages,setMessages] = useState([])


  return (
    <Box
    flexGrow={1}
    >
      <AppBar position="static" 
        sx={{backgroundColor:"white",boxShadow:0}}
      >
        <Toolbar>
          <Avatar
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
            sx={{width:"32px", height:"32px", mr:2}}
          />
        <Typography variant="h6" color="black">{name}</Typography>
        </Toolbar>
      </AppBar>
      <Box backgroundColor="#f5f5f5" height="80vh" padding="10px" sx={{overflowY:"auto"}}>
        <MessageCard text="Hello Do" date ="1222" direction="start"/>
        <MessageCard text="Hello Do" date ="1222" direction="end"/>
        <MessageCard text="Hello Do" date ="1222" direction="start"/>
      </Box>
      <TextField
        placeholder="Nhập tin nhắn ..."
        variant="standard"
        fullWidth
        multiline
        rows={1.5}
      />

    </Box>
  )
}

export default ChatScreen