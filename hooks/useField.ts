import { useState, ChangeEvent } from 'react'

interface Parameters {
  initialValue?: string
  type?: string
  name: string
}

const useField = ({ initialValue = '', type = 'text', name }: Parameters) => {
  const [value, setValue] = useState<string>(initialValue)

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValue(target.value)

  return { type, name, value, onChange }
}

export default useField
