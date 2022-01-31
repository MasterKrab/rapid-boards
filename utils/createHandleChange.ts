import type { Dispatch, SetStateAction, ChangeEvent } from 'react'

const isString = (value: any): value is string => typeof value === 'string'

const isNumber = (value: any): value is number => typeof value === 'number'

const createHandleChange =
  <Type extends string | number>(
    setValue: Dispatch<SetStateAction<Type>>,
    convertToNumber?: boolean
  ) =>
  (value: string | number | ChangeEvent<HTMLInputElement>) => {
    if (isString(value) || isNumber(value)) {
      const newValue = convertToNumber ? Number(value) : value
      setValue(newValue as Type)
      return
    }

    if (!value.target) return

    const target = value.target as HTMLInputElement
    setValue(target.value as Type)
  }

export default createHandleChange
