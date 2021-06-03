/* eslint-disable indent */
import React, { useState } from 'react'
import './App.css'
import { Palette } from './components/Palette'
import { generateColoursArray } from './helpers'

function App() {

	let [colourSize, setColourSize] = useState(1)
	const [drawWidth, setDrawWidth] = useState(256)
	const colours = generateColoursArray()

  const handleSlider = (event) => {
    if (event.target.name === 'colourSize') {
      setColourSize(parseInt(event.target.value))
    } else if (event.target.name === 'drawWidth') {
      setDrawWidth(parseInt(event.target.value))
    }
  }

	return (
		<div className="App">
			<p>
        Palette Challenge
			</p>
			<Palette
        key={colourSize + drawWidth}
        colours={colours}
        colourSize={colourSize}
        drawWidth={drawWidth}
      />



      <input
        type="range"
        name="colourSize"
        onChange={handleSlider}
        defaultValue="1"
        min="1"
        max="50"
        style={{width: 400}}
      />
      Size of colour segment:
      {colourSize} in px²

      <br />

      <input
        type="range"
        name="drawWidth"
        onChange={handleSlider}
        defaultValue="256"
        min="0"
        max="1024"
        style={{width: 400}}
      />
      Width Limit:
      {drawWidth} in px


		</div>
	)
}

export default App
