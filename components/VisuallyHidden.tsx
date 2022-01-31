import visuallyHidden from 'styles/visuallyHidden'

interface VisuallyHiddenProps {
  tag?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  attributes?: React.HTMLAttributes<HTMLElement>
}

const VisuallyHidden = ({
  tag = 'span',
  attributes = {},
  children,
}: VisuallyHiddenProps) => {
  const Tag = tag

  return (
    <>
      <Tag className="visually-hidden" {...attributes}>
        {children}
      </Tag>
      <style jsx>{visuallyHidden}</style>
    </>
  )
}

export default VisuallyHidden
