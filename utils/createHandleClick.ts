import type { Dispatch, SetStateAction } from 'react'

const createHandleClick =
  <Type>(setValue: Dispatch<SetStateAction<Type>>, value: Type) =>
  () =>
    setValue(value)

export default createHandleClick
