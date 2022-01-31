import type { NextPage } from 'next'
import BoardProvider from 'context/Board/Provider'
import Metadata from 'components/Metadata'
import ToolSelector from 'components/ToolSelector'
import ColorSelector from 'components/ColorSelector'
import Share from 'components/Share'
import UsersCount from 'components/UsersCount'
import HomeLink from 'components/HomeLink'
import WidthSelector from 'components/WidthSelector'
import Chat from 'components/Chat'
import Canvas from 'components/Canvas'

const Board: NextPage = () => {
  return (
    <BoardProvider>
      <Metadata title="Room" />
      <div className="toolbar">
        <ToolSelector />
        <ColorSelector />
        <div className="toolbar-top-right">
          <Share />
          <UsersCount />
          <HomeLink />
          <Chat />
        </div>
        <WidthSelector />
      </div>
      <Canvas />
      <style jsx>{`
        .toolbar,
        .toolbar-top-right {
          position: fixed;
          top: 0;
        }

        .toolbar {
          left: 0;
          z-index: 100;
        }

        .toolbar-top-right {
          display: flex;
          gap: 0.5rem;
          top: var(--element-separation);
          right: var(--element-separation);
          width: min-content;
          color: var(--primary-color);
        }
      `}</style>
    </BoardProvider>
  )
}

export default Board
