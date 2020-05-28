import React, { useRef, useState, useCallback, useLayoutEffect } from 'react'

const VIDEO_RATIO = 9 / 16

const EggheadEmbed = ({ lessonLink, lessonTitle }) => {
  const [iframeWidth, setIframeWidth] = useState(0)
  const iframeRef = useRef()

  const handleResize = useCallback(
    () => setIframeWidth(iframeRef.current.clientWidth),
    [iframeRef.current]
  )

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener(`resize`, handleResize)

    return () => {
      window.removeEventListener(`resize`, handleResize)
    }
  }, [iframeRef.current])
  return (
    <div className="p-4 flex justify-center">
      <div className="relative mb-10">
        <iframe
          width={600}
          height={iframeWidth * VIDEO_RATIO}
          src={`${lessonLink}/embed`}
          title={lessonTitle}
          frameBorder="0"
          ref={iframeRef}
          allowFullScreen
        />
      </div>
    </div>
  )
}
export default EggheadEmbed
