var rp = require('request-promise').defaults({json: true})

const api_root = 'https://api.binance.com'
const history = {}

export default {
	history: history,

    getBars: function(symbolInfo, resolution, from, to, first, limit) {
			const url = "/api/v3/klines"; 
			const qs = {
				symbol: "LTCBTC",
				interval: "1d"
			}
        return rp({
                url: `${api_root}${url}`,
                qs,
            })
            .then(data => {
                console.log({data})
				if (data.Response && data.Response === 'Error') {
					console.log('CryptoCompare API error:',data.Message)
					return []
				}
				if (data.length) {
					var bars = data.map(el => {
						return {
							time: el[0],
							low: el[3],
							high: el[2],
							open: el[1],
							close: el[4],
							volume: el[5],
						}
					})
						if (first) {
							var lastBar = bars[bars.length - 1]
							history[symbolInfo.name] = {lastBar: lastBar}
						}
					return bars
				} else {
					return []
				}
			})
}
}
