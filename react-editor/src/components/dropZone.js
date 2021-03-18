import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        props.addTab(binaryStr, file.name, false)
      }
      reader.readAsText(file)

      
    })

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Open File</p>
    </div>
  )
}
