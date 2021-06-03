
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

