import firebase from 'firebase/app'
import { useState } from 'react'
import Button from '../../components/Button'
import Form from '../../components/Form'
import Input from '../../components/Input'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <section className="w-screen h-screen flex bg-gradient-to-r from-gray-500 to-gray-400">
      <Form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
          } catch (error) {
            const errorMessage = error.message
            setError(errorMessage)
          }
          setLoading(false)
        }}
      >
        <div className="space-y-2 text-white">
          <Input
            label="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value)
            }}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="space-y-2 text-white">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value)
            }}
            required
          />
        </div>
        {error && <div className="text-red-700">{error}</div>}
        <Button loading={loading} basic color="white" type="submit">
          Sign in
        </Button>
        <div>
          <Button
            color="indigo"
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
              firebase.auth().signInWithPopup(googleAuthProvider)
            }}
          >
            Login with Google
          </Button>
        </div>
      </Form>
    </section>
  )
}

export default Login
