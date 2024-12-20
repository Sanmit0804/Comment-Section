import { useState } from 'react'
import './App.css'
import CommentItem from '../components/CommentItem'
import CommentList from '../components/CommentList'
import CommentSection from '../components/CommentSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CommentSection/>
    </>
  )
}

export default App
