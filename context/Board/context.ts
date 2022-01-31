import { createContext, Dispatch, SetStateAction } from 'react'
import { Tool, TOOLS } from 'utils/tools'
import type { SocketResult, Message } from 'utils/createSocket'
import INITIAL_COLORS from 'utils/initialColors'

interface IBoardContext {
  tool: Tool
  setTool?: Dispatch<SetStateAction<Tool>>
  color: string
  setColor?: Dispatch<SetStateAction<string>>
  colors: string[]
  setColors?: Dispatch<SetStateAction<string[]>>
  usersCount: number
  setUsersCount?: Dispatch<SetStateAction<number>>
  width: number
  setWidth?: Dispatch<SetStateAction<number>>
  socket?: SocketResult
  username?: string
  setUsername?: Dispatch<SetStateAction<string>>
  usernameError?: string
  setUsernameError?: Dispatch<SetStateAction<string>>
  messages: Message[]
}

const defaultState = {
  tool: TOOLS.PENCIL,
  color: '#000000',
  colors: INITIAL_COLORS,
  usersCount: 0,
  width: 1,
  messages: [],
}

const BoardContext = createContext<IBoardContext>(defaultState)

export default BoardContext
