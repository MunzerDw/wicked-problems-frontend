import React from 'react'
import firebase from 'firebase/app'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import Dropdown from './Dropdown'

function User() {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId, ...authState }) => {
        return (
          <Dropdown
            actions={[
              {
                key: 'Sign out',
                action: () => {
                  firebase.auth().signOut()
                },
              },
            ]}
            trigger={
              <div className="flex space-x-2 items-center cursor-pointer">
                <div className="bg-blue-300 w-8 h-8 p-1 flex items-center justify-center text-sm rounded-full">
                  MD
                </div>
                <div>{user.displayName}</div>
              </div>
            }
          />
        )
      }}
    </FirebaseAuthConsumer>
  )
}

export default User
