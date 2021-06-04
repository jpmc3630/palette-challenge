/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Palette } from './components/Palette'
import { generateColoursArray } from './helpers'

function App() {

	const [segmentSize, setSegmentSize] = useState(4)
	const [sort, setSort] = useState(-1)
	const [drawWidth, setDrawWidth] = useState(1024)
  const [drawHeight, setDrawHeight] = useState(512)
  const [border, setBorder] = useState(true)
	const colours = generateColoursArray()
  const [totalColours, setTotalColours] = useState('')

  const handleSlider = (event) => {
    if (event.target.name === 'segmentSize') {
      setSegmentSize(parseInt(event.target.value))
    } else if (event.target.name === 'drawWidth') {
      setDrawWidth(parseInt(event.target.value))
    }
  }

  const handleSort = (event) => {
    setSort(parseInt(event.target.dataset.sort))
  }
  const toggleBorder = (event) => {
    setBorder(event.target.checked)
  }
  
  useEffect(() => {
    let calculatedHeight = Math.floor((32768 / Math.floor(drawWidth / segmentSize)) * segmentSize)
    if (calculatedHeight > 20000) calculatedHeight = 20000 // set a max size to prevent killing browser
    setDrawHeight(calculatedHeight)
  }, [drawWidth, segmentSize])

	return (
		<div className="App">
      <div
        className="header"
      >
        <h4>
          Palette Challenge
        </h4>
        <div
          className="controls-status-wrapper"
        >
          <div
            className="controls"
          >
            <label
              htmlFor="segmentSize"
              className="sliderLabel"
            >
              Size of Colour Segments
            </label>
            <input
              type="range"
              name="segmentSize"
              id="segmentSize"
              onChange={handleSlider}
              value={segmentSize}
              min="1"
              max="50"
              style={{width: 400}}
            />
            <label 
              htmlFor="segmentSize"
              className="sliderValueLabel"
            >
              {segmentSize} px²
            </label>
            
            <br />

            <label 
              htmlFor="drawWidth"
              className="sliderLabel"
            >
              Canvas Width Limits
            </label>
            <input
              type="range"
              name="drawWidth"
              id="drawWidth"
              onChange={handleSlider}
              value={drawWidth}
              min="0"
              max="2048"
              style={{width: 400}}
              />
            <label 
              htmlFor="drawWidth"
              className="sliderValueLabel"
            >
              {drawWidth} px
            </label>
            <br />

            <label
              className="optionsLabel"
            >
              Sorting 
            </label>
            <input
              type="radio"
              name="sortNone"
              id="sortNone"
              onChange={handleSort}
              checked={sort === -1 }
              data-sort={-1}
            />
            <label htmlFor="sortNone">
              None
            </label>
            
            <input
              type="radio"
              name="sortHue"
              id="sortHue"
              onChange={handleSort}
              checked={sort === 0 }
              data-sort={0}
            />
            <label htmlFor="sortHue">
              Hue
            </label>
            
            <input
              type="radio"
              name="sortSaturation"
              id="sortSaturation"
              onChange={handleSort}
              checked={sort === 1 }
              data-sort={1}
            />
            <label htmlFor="sortSaturation">
              Saturation
            </label>
            
            <input
              type="radio"
              name="sortLuminosity"
              id="sortLuminosity"
              onChange={handleSort}
              checked={sort === 2 }
              data-sort={2}
            />
            <label htmlFor="sortLuminosity">
              Luminosity
            </label>

            <div
              className="borderDiv"
            >
              <label
                htmlFor="border"
                className="optionsLabel"
              >
                Border
              </label>
              <input
                type="checkbox"
                name="border"
                id="border"
                onChange={toggleBorder}
                checked={border}
              />
              <label
                htmlFor="border"
              >
                On
              </label>
            </div>


          </div>

          <div
            className="status"
          >
            {drawWidth} wide x {drawHeight} high
            <br />
            {totalColours} colours<br />
            { drawHeight === 20000 ? 'Max height reached!' : ''}
          </div>
        </div>
      </div>

      <Palette
        colours={colours}
        segmentSize={segmentSize}
        drawWidth={drawWidth}
        drawHeight={drawHeight}
        sort={sort}
        border={border}
        responseData={setTotalColours}
      />

      { drawHeight === 20000 ? 'Sorry, we have to draw the line somewhere!' : ''}
		</div>
	)
}

export default App
