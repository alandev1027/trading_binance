var rp = require('request-promise').defaults({json: true})

const api_root = 'https://api.binance.com'
const history = {}

export default {
	history: history,

    getBars: function(symbolInfo, interval, from, to, first, limit) {						
			const comps = symbolInfo.split(':')
			var symbolName = (comps.length > 1 ? comps[1] : symbolInfo).toUpperCase();
			const url = "/api/v3/klines"; 
			const qs = {
				symbol: symbolName,
				interval: interval,
				startTime: from * 1000,
				endTime: to * 1000,
				limit: limit
			}
        return rp({
                url: `${api_root}${url}`,
                qs,
            })
            .then(data => {
                console.log({data});
				if (data.Response && data.Response === 'Error') {
					console.log('Binance API error:',data.Message)
					return []
				}
				if (data.length) {
					var bars = data.map(kline => {
						return {
							time: kline[0],
							low: parseFloat(kline[3]),
							high: parseFloat(kline[2]),
							open: parseFloat(kline[1]),
							close: parseFloat(kline[4]),
							volume: parseFloat(kline[5]),
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
			}).catch(err => {
				console.log({err});
				return []
			})
}
}
