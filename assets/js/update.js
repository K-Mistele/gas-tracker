let lastBlock = null;

// check for new blocks on a 5 second interval
async function updateData() {
	console.log(`Checking for new block`)
	const response = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken');
	try {
		const data = (await response.json()).result;
		if (data['LastBlock'] !== lastBlock && !!(data['LastBlock'])) {
			console.log(`New block received: ${data['LastBlock']}`);
			//console.log(data);

			// if we are at 1,000 then shift one from each
			if (gasChart.data.datasets[0].length > 1000) {
				gasChart.data.datasets.forEach(dataset => {
					dataset.data.shift();
				})
				gasChart.labels.shift();
			}

			// slow
			gasChart.data.datasets[0].data.push(Number(data['SafeGasPrice']));
			// moderate
			gasChart.data.datasets[1].data.push(Number(data['ProposeGasPrice']));
			// fast
			gasChart.data.datasets[2].data.push(Number(data['FastGasPrice']));

			// parse and set block util
			const utilStrings = data['gasUsedRatio'].split(',');
			//console.log(utilStrings)
			const blockUtilization = utilStrings[utilStrings.length-1];
			//console.log(blockUtilization);
			gasChart.data.datasets[3].data.push(Number(blockUtilization));

			// set block number
			gasChart.data.labels.push(Number(data['LastBlock']))

			// track last block
			lastBlock = data['LastBlock'];

			// update the chart
			gasChart.update();

			// update other dom features
			[...document.getElementsByClassName('blockGasUtilization')].forEach(element => {
				element.innerText = `${Math.floor(Number(blockUtilization) * 100)}%`;
			});

			[...document.getElementsByClassName('slowGas')].forEach(element => {
				element.innerText = Number(data['SafeGasPrice']);
			});

			[...document.getElementsByClassName('moderateGas')].forEach(element => {
				element.innerText = Number(data['ProposeGasPrice']);
			});
			[...document.getElementsByClassName('fastGas')].forEach(element => {
				element.innerText = Number(data['FastGasPrice']);
			});

			// send notifications if applicable, then cancel
			await sendNotificationIfApplicable(
				Number(data['SafeGasPrice']),
				Number(data['ProposeGasPrice']),
				Number(data['FastGasPrice'])
			);

		} else if (data['LastBlock'] !== lastBlock) {
			console.log(`no new block - got old block of ${data['LastBlock']}`);
		}
	}
	catch (err) {
		console.error(`Error: ${err.message}`)
	}

	// Schedule next udpate to check for new block in 5 seconds
	setTimeout(updateData, 5500);
}

updateData();
