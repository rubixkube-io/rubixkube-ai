import { ImageResponse } from 'next/og'
import { client, urlFor } from '@/lib/sanity.client'


export const alt = 'Blog Post - RubixKube'
export const size = {
  width: 600,
  height: 315,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Fetch the blog post data
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      image,
      excerpt,
      publishedAt,
      "author": author->name
    }`,
    { slug }
  )

  if (!post) {
    // Fallback to default OG image if post not found
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
          }}
        >
          <img
            src="https://rubixkube.ai/og.jpg"
            alt="RubixKube Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              color: 'white',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '20px',
              borderRadius: '12px',
              maxWidth: '400px',
            }}
          >
            <div
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                lineHeight: 1.1,
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Blog Post Not Found
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#d1d5db',
                lineHeight: 1.4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              The requested blog post could not be found
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  // Use the blog post's cover image if available
  let coverImageUrl = null
  if (post.image) {
    try {
      // Use the urlFor function to generate optimized image URL
      const imageBuilder = urlFor(post.image)
      if (imageBuilder) {
        // Use optimized source image size (500x263, quality 20)
        coverImageUrl = imageBuilder.width(500).height(263).quality(20).url()
      }
    } catch (error) {
      console.error('Error generating cover image URL:', error)
    }
  }

  if (coverImageUrl) {
    // Return the cover image directly without any overlay
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        >
          <img
            src={coverImageUrl}
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ),
      {
        width: 600,
        height: 315,
        // Add compression for smaller file size
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    )
  }

  // Fallback to default OG image when no cover image is available
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        <img
          src="https://rubixkube.ai/og.jpg"
          alt="RubixKube Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            color: 'white',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              lineHeight: 1.1,
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#d1d5db',
              lineHeight: 1.4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            {post.excerpt || 'Read more on RubixKube Blog'}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
