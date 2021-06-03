/* eslint-disable indent */
import React, { useState } from 'react'
import './App.css'
import { Palette } from './components/Palette'
import { generateColoursArray } from './helpers'

function App() {

	const [colourSize, setColourSize] = useState(4)
	const [sort, setSort] = useState(-1)
	const [drawWidth, setDrawWidth] = useState(1024)
	const colours = generateColoursArray()

  const handleSlider = (event) => {
    if (event.target.name === 'colourSize') {
      setColourSize(parseInt(event.target.value))
    } else if (event.target.name === 'drawWidth') {
      setDrawWidth(parseInt(event.target.value))
    }
  }

  const handleSort = (event) => {
    if (event.target.name === 'sortNone') {
      setSort(-1)
    } else if (event.target.name === 'sortHue') {
      setSort(0)
    } else if (event.target.name === 'sortSaturation') {
      setSort(1)
    } else if (event.target.name === 'sortLuminosity') {
      setSort(2)
    } 
  }

	return (
		<div className="App">
			<p>
        Palette Challenge
			</p>

      <div
        className="controls"
      >
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
          defaultValue="1024"
          min="0"
          max="2048"
          style={{width: 400}}
        />
        Width Limit:
        {drawWidth} in px

        <br />

        None
        <input
          type="radio"
          name="sortNone"
          onChange={handleSort}
          checked={sort === -1 }
        />
        Hue
        <input
          type="radio"
          name="sortHue"
          onChange={handleSort}
          checked={sort === 0 }
        />
        Saturation
        <input
          type="radio"
          name="sortSaturation"
          onChange={handleSort}
          checked={sort === 1 }
        />
        Luminosity
        <input
          type="radio"
          name="sortLuminosity"
          onChange={handleSort}
          checked={sort === 2 }
        />

      </div>

			<Palette
        key={colourSize + drawWidth + sort}
        colours={colours}
        colourSize={colourSize}
        drawWidth={drawWidth}
        sort={sort}
      />

		</div>
	)
}

export default App
