import { HomePage, NotFoundPage, LoginPage, RegisterPage } from './pages/index.js'
import {Routes, Route} from 'react-router-dom'
import {PostContainer} from './context/postContext.jsx'

function App() {
  return (
    <PostContainer>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>

      </Routes>
    </PostContainer>
  )
}

export default App