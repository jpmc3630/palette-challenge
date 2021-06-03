import React, { useEffect } from 'react'
import PropTypes from 'prop-types'



export const Palette = ({ colours, colourSize, drawWidth }) => {

	const canvasRef = React.useRef()
	const [context, setContext] = React.useState()

	useEffect(() => {
		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext('2d')

			if (renderCtx) {
				setContext(renderCtx)
			}
		}

		if (context) {


      // draw the canvas
			let xpos = 0
			let ypos = 0
			let count = 0

			colours.forEach((colour, index) => {
				const [r, g, b] = colour
				const rect = {
					x: xpos,
					y: ypos,
					width: colourSize,
					height: colourSize
				}
				context.fillStyle = `RGB(${r}, ${g}, ${b})` 
				context.fillRect(rect.x, rect.y, rect.width, rect.height)

				count += 1
				xpos = xpos + colourSize

				if (xpos >= drawWidth) {
					ypos += colourSize
					xpos = 0
				}
			})
    
			console.log(count)
		}
	}, [context])

	return (
		<div
			style={{
				textAlign: 'center',
			}}>
			<canvas
				id="canvas"
				ref={canvasRef}
				width={500}
				height={500}
				style={{
					border: '2px solid black',
					marginTop: 10,
				}}
			></canvas>
		</div>
	)

}

Palette.propTypes = {
	colours: PropTypes.array.isRequired,
  colourSize: PropTypes.number.isRequired,
	drawWidth: PropTypes.number.isRequired,
}