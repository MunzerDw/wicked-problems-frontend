import { makeAutoObservable } from 'mobx'

// Model the application state.
class Test {
  state = false

  constructor() {
    makeAutoObservable(this)
  }

  setState(state) {
    this.state = state
  }
}

const test = new Test()

export default test
