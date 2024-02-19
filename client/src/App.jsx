import { Toaster } from 'react-hot-toast'
import { HomePage, NotFoundPage, LoginPage, RegisterPage, PostsPage, ProfilePage } from './pages/index.js'
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './context/postContext.jsx'
import { UserProvider } from './context/userContext.jsx'
import { NotificationProvider } from './context/notificationContext.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'

import Navbar from './components/Navbar.jsx'
import { Box } from '@mui/material'

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <NotificationProvider>
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
              </Route>
            </Routes>
          </Box>
        </NotificationProvider>
      </PostProvider>
    </UserProvider>
  )
}

export default App