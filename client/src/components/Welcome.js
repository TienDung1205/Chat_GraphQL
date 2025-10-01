import React from 'react'
import { Stack, Typography } from '@mui/material';

const Welcome = () => {
  return (
    <Stack
    justifyContent="center"
    alignItems="center"
    flexGrow={1}
    >
        <Typography variant="h3">Chào mừng bạn đến với Chat App</Typography>
    </Stack>
  )
}

export default Welcome