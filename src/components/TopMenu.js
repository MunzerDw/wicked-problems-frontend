import Button from './Button'
import firebase from 'firebase/app'
import ThemeToogle from './ThemeToogle'

function TopMenu() {
  return (
    <div
      className="w-full h-full bg-gray-200 dark:bg-gray-700 p-6 flex"
      style={{
        maxHeight: '90px',
      }}
    >
      <div className="w-full flex justify-between items-center my-auto">
        <div
          className="text-2xl font-medium dark:text-white"
          style={{
            fontFamily: 'Pattaya',
          }}
        >
          Wicked Problems
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToogle />
          <Button
            color="red"
            onClick={() => {
              firebase.auth().signOut()
            }}
            basic
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TopMenu
