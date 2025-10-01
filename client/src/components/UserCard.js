import React from 'react'
import {Stack,Avatar, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';


const UserCard = ({item:{firstName,lastName,id}}) => {
  const navigate = useNavigate()
  return (
    <Stack
      className="usercard"
      direction="row"
      spacing={2}
      sx={{py:1}}
      onClick={()=>navigate(`/${id}/${firstName} ${lastName}`)}
    >
      <Avatar
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName}`}
        sx={{width:"32px",height:"32px"}}
      />
      <Typography variant="subtitle2">{firstName} {lastName}</Typography>
    </Stack>
  )
}

export default UserCard