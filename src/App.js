import Login from './pages/Login/Login'
import firebase from 'firebase/app'
import 'firebase/auth'
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from '@react-firebase/auth'
import Projects from './pages/projects/Projects'
require('dotenv').config()

function App() {
  return (
    <FirebaseAuthProvider
      firebase={firebase}
      {...{
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      }}
    >
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId, ...authState }) => {
          return !providerId ? (
            <div className="m-auto">loading...</div>
          ) : isSignedIn ? (
            <Projects />
          ) : (
            <Login />
          )
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  )
}

export default App
