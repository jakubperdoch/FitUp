/**
 * Converts an object to a query string, filters out empty values and returns a string
 * @param {Object} obj
 * @param {string} parentKey
 * @returns {string}
 */
function objectToQueryString(obj, parentKey = '') {
	const queryString = Object.keys(obj)
		.map((key) => {
			const fullKey = parentKey ? `${parentKey}[${key}]` : key
			const value = obj[key]

			if ([undefined, null].includes(value)) {
				return ''
			}

			if (typeof value === 'object' && !Array.isArray(value)) {
				return objectToQueryString(value, fullKey)
			} else if (Array.isArray(value)) {
				return value
					.map((item, index) => {
						if (typeof item === 'object') {
							return objectToQueryString(item, `${fullKey}[${index}]`)
						}
						return `${fullKey}[${index}]=${encodeURIComponent(item)}`
					})
					.join('&')
			} else {
				return `${fullKey}=${encodeURIComponent(value)}`
			}
		})
		.filter(Boolean)
		.join('&')

	return queryString
}

export default objectToQueryString
