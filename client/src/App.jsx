import { HomePage, NotFoundPage, LoginPage, RegisterPage } from './pages/index.js'
import {Routes, Route} from 'react-router-dom'
import { PostProvider } from './context/postContext.jsx'

function App() {
  return (
    <PostProvider>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>

      </Routes>
    </PostProvider>
  )
}

export default App