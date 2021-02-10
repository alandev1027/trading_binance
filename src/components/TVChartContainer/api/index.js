import historyProvider from './historyProvider'

const supportedResolutions = ['1', '3', '5', '15', '30', '60', '120', '240', '360', '480', '720', '1D', '3D', '1W', '1M']

const config = {
    supported_resolutions: supportedResolutions
}; 

export default {
	onReady: cb => {
	console.log('=====onReady running')	
		setTimeout(() => cb(config), 0)
		
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		console.log('=====searchSymbols running')
	},
	resolveSymbol: (symbolInfo, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		console.log('======resolveSymbol running')
		// console.log('resolveSymbol:',{symbolInfo})
		const comps = symbolInfo.split(':')
		var symbolName = (comps.length > 1 ? comps[1] : symbolInfo).toUpperCase();
		// console.log({symbolName})
		var symbol_stub = {
			name: symbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: 'Binance',
			minmov: 1,
			pricescale: 100000000,
			has_intraday: true,
			has_daily: true,
			has_weekly_and_monthly: true,			
		}

		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
			console.log('Resolving that symbol....', symbol_stub)
		}, 0)
		
		
		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		console.log('=====getBars running')
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		const interval = {
            '1': '1m',
            '3': '3m',
            '5': '5m',
            '15': '15m',
            '30': '30m',
            '60': '1h',
            '120': '2h',
            '240': '4h',
            '360': '6h',
            '480': '8h',
            '720': '12h',
            'D': '1d',
            '1D': '1d',
            '3D': '3d',
            'W': '1w',
            '1W': '1w',
            'M': '1M',
            '1M': '1M',
        }[resolution]

        if (!interval) {
            onErrorCallback('Invalid interval')
		}
		
		historyProvider.getBars(symbolInfo.name, interval, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		console.log('=====subscribeBars runnning')
	},
	unsubscribeBars: subscriberUID => {
		console.log('=====unsubscribeBars running')
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		console.log('=====getServerTime running')
	}
}
