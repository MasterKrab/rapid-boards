import Head from 'next/head'

interface PreloadImagesProps {
  images: string[]
}

const PreloadImages = ({ images }: PreloadImagesProps) => (
  <Head>
    {images.map((image) => (
      <link key={`preload-${image}`} rel="preload" href={image} as="image" />
    ))}
  </Head>
)

export default PreloadImages
