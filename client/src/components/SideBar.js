import React from 'react'
import {Box, Typography,Divider,Stack} from '@mui/material'
import UserCard from './UserCard'
const SideBar = () => {
//    const  {loading,data,error} =  useQuery(GET_ALL_USERS)


//     if(loading) return <Typography variant="h6">Loading chats</Typography>
    
//     if(error){
//         console.log(error.message)
//     }
    const users = [
        {id:1,firstName:"Do",lastName:"Phung"},
        {id:2,firstName:"Nguyen",lastName:"A"},
        {id:3,firstName:"Tran",lastName:"B"},
        {id:4,firstName:"Le",lastName:"C"}
    ]

  return (
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    width="250px"
    padding="10px"
    >
        <Typography variant='h6'>Chat</Typography>
        <Divider />
        {
            users.map((item)=>(
                <UserCard key={item.id} item={item} />
            ))
        }

    </Box>
  )
}

export default SideBar