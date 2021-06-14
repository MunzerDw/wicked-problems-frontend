import Button from 'components/Button'
import Flex from 'components/Flex'
import Form from 'components/Form'
import Popup from 'components/Popup'
import Input from 'components/Input'
import { observer } from 'mobx-react'
import importData from 'models/ImportData'

const ImportData = observer(() => {
  const readFile = (e) => {
    e.preventDefault()
    const files = e.target?.files || e.dataTransfer?.files
    const file = files[0]
    if (
      file.name?.split('.')[1]?.toLowerCase() === 'csv' &&
      file.name?.split('.').length === 2
    ) {
      importData.setFile(file)
    } else {
      alert('file must be in csv format')
    }
  }
  return (
    <Popup state={importData.open} setState={importData.setOpen}>
      <Form
        className="bg-gray-200 dark:bg-gray-700 shadow-lg rounded p-6 max-h-full overflow-auto"
        onSubmit={async () => {
          await importData.uploadData()
          importData.setOpen(false)
        }}
      >
        <Flex.Col space="2">
          <div>CSV File</div>
          {!importData.file ? (
            <>
              <input
                type="file"
                onChange={readFile}
                style={{
                  display: 'none',
                }}
                id="data-upload"
              />
              <div
                style={{
                  maxWidth: '1000px',
                }}
                className={
                  'flex justify-center items-center h-32 w-full rounded border hover:bg-gray-300 dark:hover:bg-gray-800 trans '
                }
                onDragEnter={() => {
                  // setHighlighted(true)
                }}
                onDragLeave={() => {
                  // setHighlighted(false)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onMouseUp={() => {
                  // setHighlighted(false)
                }}
                onDrop={readFile}
                onClick={() => {
                  document.getElementById('data-upload').click()
                }}
              >
                <div className="w-full h-full border border-dashed rounded border-gray-400 flex items-center justify-center italic">
                  Drop file or click here
                </div>
              </div>
            </>
          ) : (
            <div className="h-32">
              <Flex.Row justify="between">
                <div>{importData?.file?.name}</div>
                <Button
                  icon="FaTimes"
                  iconColor="red"
                  onClick={() => {
                    importData.setFile('')
                  }}
                />
              </Flex.Row>
            </div>
          )}
        </Flex.Col>
        <Input
          label="Date format"
          placeholder="default is YYYY-MM-DD"
          value={importData.dateFormat}
          onChange={(e) => importData.setDateFormat(e.currentTarget.value)}
        />
        <Input
          required
          label="Date column name"
          value={importData.dateColumn}
          onChange={(e) => importData.setDateColumn(e.currentTarget.value)}
        />
        <Input
          required
          label="Value column name"
          value={importData.valueColumn}
          onChange={(e) => importData.setValueColumn(e.currentTarget.value)}
        />
        <Input
          label="Separator"
          placeholder="default is ' , '"
          value={importData.separator}
          onChange={(e) => importData.setSeparator(e.currentTarget.value)}
        />
        <Flex.Row space="2">
          <Button basic color="green" type="submit">
            Add
          </Button>
          <Button
            basic
            color="gray"
            onClick={() => {
              importData.setOpen(false)
            }}
          >
            Cancel
          </Button>
        </Flex.Row>
      </Form>
    </Popup>
  )
})
export default ImportData
