import React, { useState, useRef, useEffect } from 'react'
import { Box, Stack, Typography, Button, TextField, Card, CircularProgress, Alert } from '@mui/material'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER, LOGIN_USER } from '../graphql/mutations';

const AuthScreen = ({ setloggedIn }) => {
  const [showLogin, setShowLogin] = useState(true)
  const [formData, setFormData] = useState({})
  const authForm = useRef(null)
  const [alertMsg, setAlertMsg] = useState(null);

  // Thêm onError cho mutation đăng ký
  const [signupUser, { data: signupData, loading: l1 }] = useMutation(SIGNUP_USER, {
    onError(error) {
      setAlertMsg({ type: "error", text: error.message });
      setTimeout(() => setAlertMsg(null), 5000);
    }
  });

  // Thêm onError cho mutation đăng nhập
  const [loginUser, { data: loginData, loading: l2 }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("jwt", data.signinUser.token)
      setloggedIn(true)
    },
    onError(error) {
      setAlertMsg({ type: "error", text: error.message });
      setTimeout(() => setAlertMsg(null), 5000);
    }
  });

  useEffect(() => {
    if (signupData) {
      setAlertMsg({
        type: "success",
        text: `${signupData.signupUser.firstName} ${signupData.signupUser.lastName} đã đăng ký tài khoản thành công`
      });
      const timer = setTimeout(() => setAlertMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [signupData]);

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Đang xác thực...</Typography>
        </Box>
      </Box>
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (showLogin) {
      loginUser({ variables: { userSignin: formData } })
    } else {
      signupUser({
        variables: {
          userNew: formData
        }
      })
    }
  }

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card
        variant="outlined"
        sx={{ padding: "10px" }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: "400px" }}
        >
          {alertMsg && <Alert severity={alertMsg.type}>{alertMsg.text}</Alert>}
          <Typography variant="h5">{showLogin ? "Đăng nhập" : "Đăng ký"} Chat App</Typography>
          {
            !showLogin &&
            <>
              <TextField
                name="firstName"
                label="Nhập họ"
                variant="standard"
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Nhập tên"
                variant="standard"
                onChange={handleChange}
                required
              />
            </>
          }
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Nhập mật khẩu"
            variant="standard"
            onChange={handleChange}
            required
          />
          <Typography textAlign="center" variant="subtitle1" className="usercard" onClick={() => {
            setShowLogin((preValue) => !preValue)
            setFormData({})
            authForm.current.reset()
          }}> {showLogin ? "Bạn chưa có tài khoản? Đăng ký ngay" : "Bạn đã có tài khoản? Đăng nhập ngay"}</Typography>
          <Button variant='outlined' type="submit">{showLogin ? "Đăng nhập" : "Đăng ký"}</Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default AuthScreen