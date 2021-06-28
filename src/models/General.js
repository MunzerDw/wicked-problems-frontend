import { makeAutoObservable } from 'mobx'
import snapshots from 'models/Snapshots'
import axios from 'axios'

// Model the application state.
class General {
  signup = false

  constructor() {
    makeAutoObservable(this)
  }

  setSignup(state) {
    this.signup = state
  }

  //API FUNCTIONS
  async signup() {}
}

const general = new General()

export default general
