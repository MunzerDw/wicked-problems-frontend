import firebase from 'firebase/app'
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <section className="w-screen h-screen flex bg-gradient-to-r from-gray-500 to-gray-400">
      <form
        className="rounded p-6 px-8 my-auto ml-16 mr-16 space-y-6 w-full"
        style={{
          maxWidth: '400px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          setLoading(true)
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
              const errorMessage = error.message
              setError(errorMessage)
            })
            .finally(() => {
              setLoading(false)
            })
        }}
      >
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.currentTarget.value)
            }}
            className="bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.currentTarget.value)
            }}
            className="bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        {error && <div className="text-red-700">{error}</div>}
        <div>
          {loading ? (
            'Loading..'
          ) : (
            <button
              type="submit"
              className="border text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
              firebase.auth().signInWithPopup(googleAuthProvider)
            }}
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login With Google
          </button>
        </div>
      </form>
    </section>
  )
}

export default Login
