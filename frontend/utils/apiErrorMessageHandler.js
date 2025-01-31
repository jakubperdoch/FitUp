const apiErrorMessageHandler = (error) => {
	const status = error.status
	const response = error.response

	switch (status) {
		case 422: {
			const errorValues = Object.values(response._data?.errors ?? {})

			const errorMap = errorValues.flatMap((error) => error)

			return errorMap.join('\n')
		}
		default: {
			return response._data?.message
		}
	}
}

export default apiErrorMessageHandler
