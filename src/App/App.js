import Login from '../pages/Login/Login'
import firebase from 'firebase/app'
import 'firebase/auth'
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from '@react-firebase/auth'
import Router from './components/Router'
import axios from 'axios'
import States from '../states/States'
import LoadingPage from '../pages/LoadingPage/LoadingPage'
import useDarkMode from '../hooks/useDarkMode'
require('dotenv').config()

function App() {
  useDarkMode()

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
      <div className="dark:text-white">
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId, ...authState }) => {
            if (isSignedIn) {
              firebase
                .auth()
                .currentUser.getIdToken()
                .then((value) => {
                  axios.defaults.headers = {
                    Authorization: 'Bearer ' + value,
                  }
                })
                .catch((error) => console.log(error))
            }
            return !providerId && !isSignedIn ? (
              <LoadingPage />
            ) : isSignedIn ? (
              <States>
                <Router />
              </States>
            ) : (
              <Login />
            )
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  )
}

export default App
