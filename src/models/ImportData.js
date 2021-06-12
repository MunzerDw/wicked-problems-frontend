import { makeAutoObservable } from 'mobx'
import snapshots from 'models/Snapshots'
import axios from 'axios'

// Model the application state.
class ImportData {
  snapshotId = ''
  file = ''
  dateFormat = ''
  dateColumn = ''
  valueColumn = ''
  separator = ''
  open = false

  constructor() {
    makeAutoObservable(this)
  }

  setSnapshotId(id) {
    this.snapshotId = id
  }

  setSeparator(separator) {
    this.separator = separator
  }

  setFile(file) {
    this.file = file
  }

  setDateColumn(name) {
    this.dateColumn = name
  }

  setValueColumn(name) {
    this.valueColumn = name
  }

  setDateFormat(dateFormat) {
    this.dateFormat = dateFormat
  }

  setOpen(state) {
    this.open = state
    if (!state) {
      this.file = ''
      this.dateFormat = ''
      this.snapshotId = ''
      this.dateColumn = ''
      this.valueColumn = ''
      this.separator = ''
    }
  }

  //API FUNCTIONS
  async uploadData() {
    try {
      const upload = {
        dateColumn: this.dateColumn,
        valueColumn: this.valueColumn,
        file: this.file,
        dateFormat: this.dateFormat,
        separator: this.separator,
      }
      const data = new FormData()
      const keys = Object.keys(upload)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        data.append(key, upload[key])
      }
      const response = await axios.post(
        '/snapshots/' + this.snapshotId + '/data',
        data
      )
      snapshots.editSnapshot({ data: response.data }, this.snapshotId)
      return response.data
    } catch (error) {
      alert(error.message)
    }
  }
}

const importData = new ImportData()

export default importData
