import { useState } from 'react'
import { LoginForm, RegisterForm } from './components/AuthForms'

function App() {
  const [mode, setMode] = useState('login')
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))

  if (authed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="logo" className="h-6"/>
            <div className="flex-1">
              <input className="w-full max-w-2xl bg-white text-black rounded px-4 py-2" placeholder="Search for products, brands and more"/>
            </div>
            <button onClick={()=>{localStorage.removeItem('token'); setAuthed(false)}} className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">Logout</button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(12)].map((_,i)=> (
            <div key={i} className="bg-white rounded shadow p-4">
              <div className="h-40 bg-gray-100 rounded mb-3" />
              <div className="font-medium">Product {i+1}</div>
              <div className="text-sm text-gray-500">Best in class product</div>
              <div className="text-green-600 font-semibold mt-1">₹{(i+1)*999}</div>
              <button className="mt-3 w-full bg-blue-600 text-white rounded py-2">Add to cart</button>
            </div>
          ))}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button className={`flex-1 py-2 rounded-md ${mode==='login' ? 'bg-white shadow font-semibold' : ''}`} onClick={()=>setMode('login')}>Login</button>
          <button className={`flex-1 py-2 rounded-md ${mode==='register' ? 'bg-white shadow font-semibold' : ''}`} onClick={()=>setMode('register')}>Register</button>
        </div>
        {mode==='login' ? (
          <LoginForm onSuccess={()=>setAuthed(true)} />
        ) : (
          <RegisterForm onSuccess={()=>setMode('login')} />
        )}
      </div>
    </div>
  )
}

export default App
