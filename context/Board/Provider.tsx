import { useState, useEffect } from 'react'
import { Tool, TOOLS } from 'utils/tools'
import INITIAL_COLORS from 'utils/initialColors'
import createSocket, { SocketResult, Message } from 'utils/createSocket'
import BoardContext from './context'

interface BoardProviderProps {
  children: React.ReactNode
}

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [tool, setTool] = useState<Tool>(TOOLS.PENCIL)
  const [color, setColor] = useState('#000000')
  const [colors, setColors] = useState(INITIAL_COLORS)
  const [usersCount, setUsersCount] = useState(1)
  const [width, setWidth] = useState(10)
  const [socket, setSocket] = useState<SocketResult>()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const socket = createSocket()
    socket.addChangeUsers(setUsersCount)
    socket.addNewUsername(setUsername, setUsernameError)
    socket.addGetMessages(setMessages)

    const addNewMessage = (message: Message) => {
      setMessages((messages) => [...messages, message])
    }

    socket.addNewMessage(addNewMessage)

    setSocket(socket)

    return () => {
      socket!.isConnected() && socket!.disconnect()
    }
  }, [])

  useEffect(() => {
    if (colors.includes(color)) return

    const newColors = [color, ...colors.slice(0, -1)]
    setColors(newColors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color])

  return (
    <BoardContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        colors,
        setColors,
        usersCount,
        setUsersCount,
        width,
        setWidth,
        socket,
        username,
        setUsername,
        usernameError,
        setUsernameError,
        messages,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
