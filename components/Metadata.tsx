import Head from 'next/head'

interface MetadataProps {
  title?: string
  description?: string
}

const Metadata = ({
  title,
  description = 'Create and share your own boards with friends!',
}: MetadataProps) => (
  <Head>
    <title>{title ? `${title} | Rapid Boards` : 'Rapid Boards'}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="twitter:url" content={process.env.NEXT_PUBLIC_URL} />
    <meta property="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Head>
)

export default Metadata
