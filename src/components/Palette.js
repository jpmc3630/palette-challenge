import React, { useEffect, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { drawPalette, hslSort } from '../helpers'

export const Palette = ({ 
  colours,
  segmentSize,
  drawWidth,
  drawHeight,
  sort,
  border,
  responseData
}) => {

	const canvasRef = useRef()
	const [context, setContext] = useState()
  const responder = useCallback((data) => {
    responseData(data)
  }, [responseData])

	useEffect(() => {
		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext('2d')
			if (renderCtx) {
				setContext(renderCtx)
			}
		}
		if (context) {
      let colourCount = drawPalette(hslSort(colours, sort), context, segmentSize, drawWidth)
      responder(colourCount)
		}
	}, [context, segmentSize, colours, drawWidth, sort, responder])

	return (
		<div
			style={{
				textAlign: 'center',
			}}>
			<canvas
				id="canvas"
				ref={canvasRef}
				width={drawWidth}
				height={drawHeight}
				style={{
					border: (border === true ? '2px solid black' : ''),
					marginTop: 20,
				}}
			></canvas>
		</div>
	)
}

Palette.propTypes = {
	colours: PropTypes.array.isRequired,
  segmentSize: PropTypes.number.isRequired,
	drawWidth: PropTypes.number.isRequired,
	drawHeight: PropTypes.number.isRequired,
	sort: PropTypes.number.isRequired,
	border: PropTypes.bool.isRequired,
	responseData: PropTypes.func.isRequired,
}