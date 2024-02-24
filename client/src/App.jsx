import { Toaster } from 'react-hot-toast'
import { HomePage, NotFoundPage, LoginPage, RegisterPage, PostsPage, ProfilePage } from './pages/index.js'
import ProfilesPage from './pages/profile/ProfilesPage.jsx'
import { Routes, Route } from 'react-router-dom'
import { SocketProvider } from './context/socketContext.jsx'
import { UserProvider } from './context/userContext.jsx'
import { PostProvider } from './context/postContext.jsx'
import { NotificationProvider } from './context/notificationContext.jsx'
import { MessageProvider } from './context/messageContext.jsx'; 

import ProtectedRoute from './ProtectedRoute.jsx'

import Navbar from './components/Navbar.jsx'
import { Box } from '@mui/material'

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <PostProvider>
          <NotificationProvider>
            <MessageProvider>
              
            <Navbar />
            <Toaster />

            <Box sx={{ paddingTop: '74px' }}>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>

                <Route element={<ProtectedRoute />}>
                  <Route path='/posts' element={<PostsPage />}></Route>
                  <Route path='/profile/:username' element={<ProfilePage />}></Route>
                  <Route path='/profiles/' element={<ProfilesPage />}></Route>
                </Route>
              </Routes>
            </Box>
            </MessageProvider>
          </NotificationProvider>
        </PostProvider>
      </SocketProvider>
    </UserProvider>
  )
}

export default App;