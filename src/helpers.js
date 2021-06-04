
export const generateColoursArray = () => {
	let colours = []
	for (let r = 0; r <= 255; r+=8) {
		for (let g = 0; g <= 255; g+=8) {
			for (let b = 0; b <= 255; b+=8) {
				colours.push([r, g, b])
			}
		}
	}
	return colours
}

export const drawPalette = (colours, context, segmentSize, drawWidth) => {
  let xpos = 0
  let ypos = 0
  let totalColours = 0
  colours.forEach((colour) => {
    const [r, g, b] = colour
    const rect = {
      x: xpos,
      y: ypos,
      width: segmentSize,
      height: segmentSize
    }
    context.fillStyle = `RGB(${r}, ${g}, ${b})` 
    context.fillRect(rect.x, rect.y, rect.width, rect.height)
    totalColours += 1
    xpos = xpos + segmentSize
    if (xpos >= drawWidth) {
      ypos += segmentSize
      xpos = 0
    }
  })
  return totalColours
}

// HSL code came from: https://stackoverflow.com/questions/11923659/javascript-sort-rgb-values
export function rgbToHsl(c) {
	var r = c[0]/255, g = c[1]/255, b = c[2]/255
	var max = Math.max(r, g, b), min = Math.min(r, g, b)
	var h, s, l = (max + min) / 2

	if(max === min) {
		h = s = 0 // achromatic
	} else {
		var d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch(max){
		case r: h = (g - b) / d + (g < b ? 6 : 0); break
		case g: h = (b - r) / d + 2; break
		default: h = (r - g) / d + 4; break
		}
		h /= 6
	}
	return [h * 360, s * 100, l * 100]
}

export const hslSort = (colours, sort) => {
  if (sort === -1) {
      return colours // no sort
    } else {
    return colours.map(function(c, i) {
      // Convert to HSL and keep track of original indices
      return {color: rgbToHsl(c), index: i}
    }).sort(function(c1, c2) {
      // Sort by hue, saturation or luminoscity value
      return c1.color[sort] - c2.color[sort]
    }).map(function(data) {
      // Retrieve original RGB color
      return colours[data.index]
    })
  }
} 


  