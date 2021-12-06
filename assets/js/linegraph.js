// chart data
let gasChart;
/**
 * Config for the chart
 * @type {{datasets: [{borderColor: string, data: *, label: string, yAxisId: string},{borderColor: string, data: *, label: string, yAxisId: string},{borderColor: string, data: *, label: string, yAxisID: string},{borderColor: string, data: *, label: string, yAxisID: string}], labels: *}}
 */
const data = {
	labels: [],
	datasets: [
		/** slow gas */
		{
			label: 'Slow Gas Price',
			data: [],
			borderColor: `#C52233`,
			//backgroundColor: transparentize(CHART_COLORS.red, 0.5),
			yAxisId: 'gas'
		},
		/** average gas */
		{
			label: 'Average Gas Price',
			data: [],
			borderColor: `#256EFF`,
			//backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
			yAxisId: 'gas'
		},
		/** fast gas */
		{
			label: 'Fast Gas Price',
			data: [],
			borderColor: '#3BC14A',
			//backgroundColor: transparentize(CHART_COLORS.green, 0.5),
			yAxisID: 'gas'
		},
		/** block utils */
		{
			label: "Block Gas Utilization",
			data: [],
			borderColor: "rgb(153, 102, 255)",
			//backgroundColor: transparentize(CHART_COLORS.purple, 0.5),
			yAxisID: 'blockUtilization'
		}
	]
}

// chart config
// The chart config
const config = {
	type: 'line',
	data: data,
	options: {
		responsive: true,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		stacked: false,
		plugins: {
			legend: true,
			title: {
				display: true,
				text: 'Ethereum Gas Prices & Block Gas Utilization '
			}
		},
		scales: {
			gas: {
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					align: 'start',
					text: 'Gas price'
				}
			},
			blockUtilization: {
				type: 'linear',
				display: true,
				position: 'right',

				// grid line settings
				grid: {
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				},
				title: {
					display: true,
					align: 'start',
					text: 'Block Utilization %'
				}
			},
			x: {
				display: false,
				title: {
					display: true,
					align: 'start',
					text: 'Current Block'
				}
			}
		}
	},
};

gasChart = new Chart(
	document.getElementById('gasChart'),
	config
)

