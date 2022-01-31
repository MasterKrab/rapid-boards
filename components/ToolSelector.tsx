import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import { TOOLS_VALUES } from 'utils/tools'
import generateId from 'utils/generateId'
import ButtonTool from 'components/ButtonTool'

const ToolSelector = () => {
  const { tool } = useContext(BoardContext)
  return (
    <>
      <section className="tools" aria-label="Select tool">
        {TOOLS_VALUES.map((currentTool) => (
          <ButtonTool
            key={generateId()}
            checked={currentTool === tool}
            tool={currentTool}
          />
        ))}
      </section>
      <style jsx>{`
        .tools {
          display: flex;
          gap: 1rem;
          position: fixed;
          bottom: var(--element-separation);
          left: 50%;
          transform: translateX(-50%);
        }

        @media screen and (min-width: 768px) and (min-height: 480px) {
          .tools {
            flex-direction: column;
            top: 50%;
            left: var(--element-separation);
            transform: translateY(-50%);
          }
        }

        @media screen and (min-width: 768px) and (max-height: 480px) {
          .tools {
            left: var(--element-separation);
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}

export default ToolSelector
