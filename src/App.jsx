import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'    

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
       <div className="min-h-screen flex items-center justify-center bg-black">
      <h1 className="text-6xl font-extrabold text-green-400">
        Tailwind is FINALLY Working 🚀
      </h1>
    </div>
      
     
    </>
  )
}

export default App
