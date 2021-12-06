/**
 * The configuration for
 * @property {boolean} enabled - is a notification configured?
 * @property {'slow' | 'moderate' | 'fast' | null} gasCategory - the category of gas to notify on
 * @property {number} gasPrice - the gas price in gwei to notify on
 */
const notificationConfig = {
	enabled: false,
	gasCategory: null,
	gasPrice: null
}

/**
 * Send a notification to the user
 * @param {string} title - the name of the notification
 * @param {string} message - the notification text
 * @returns {Promise<boolean>} - indicates if notification was successfully sent
 */
async function sendNotification(title, message) {
	console.log(`Sending notification '${title}'`)

	// Check if we're in a browser window - if so, we need to request permission first
	if (!isElectron()) {

		// verify browser support for notifications - some don't
		if (!('Notification' in window)) {
			console.error('Notifications are not supported in this browser!');
			return false;
		}

		// for web browsers, we also need to make sure that notifications are enabled since they require permission.
		//  only ask if 'default' - if denied, then ignore
		if (Notification.permission === 'default') {

			// ask permission for notifications
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				console.error(`User rejected permission for notifications!`);
				return false;
			}
		}
		else if (Notification.permission === 'denied') {
			console.error('User has rejected permission for notifications!')
			return false;
		}

	}

	// At this point we know notifications are enabled
	const options = {
		body: message,
		icon: './assets/img/icons/gas.png'
	}
	new Notification(title, options);

}

/**
 * Configure notifications
 */
function configureNotifications() {
	console.log(`configuring notifications!`);

	const enabled = true;
	const gasCategory = document.getElementById('gas-category').value;
	const gasPrice = Number(document.getElementById('gas-price').value);
	if (!gasPrice) {
		alert("Missing gas price!");
		return;
	}
	notificationConfig.enabled = enabled;
	notificationConfig.gasCategory = gasCategory;
	notificationConfig.gasPrice = gasPrice;
	console.log(notificationConfig);
	alert("Notification set!");
}

/**
 * Cancel notifications
 */
function cancelNotifications() {
	console.log(`cancelling notifications!`);
	notificationConfig.enabled = false;
}

/**
 * Send a notification if applicable based on the current gas price
 * @param slowGas
 * @param moderateGas
 * @param fastGas
 */
async function sendNotificationIfApplicable(slowGas, moderateGas, fastGas) {
	console.log(
		slowGas,
		moderateGas,
		fastGas
	)
	console.log(notificationConfig.gasCategory);
	if (!notificationConfig.enabled) return;
	switch (notificationConfig.gasCategory) {
		case 'slow':
			if (slowGas < notificationConfig.gasPrice) {
				await sendNotification(
					`Gas Price Update`,
					`The ${notificationConfig.gasCategory} gas price has dropped below your setting of ${notificationConfig.gasPrice} to ${slowGas}! Now is a great time to send a transaction.`
				)
			} else {
				return
			}
			break;
		case 'moderate':
			if (moderateGas < notificationConfig.gasPrice) {
				await sendNotification(
					`Gas Price Update`,
					`The ${notificationConfig.gasCategory} gas price has dropped below your setting of ${notificationConfig.gasPrice} to ${moderateGas}! Now is a great time to send a transaction.`
				)
			} else {
				return
			}
			break;
		case 'fast':
			if (fastGas < notificationConfig.gasPrice) {
				await sendNotification(
					`GasPriceUpdate`,
					`The ${notificationConfig.gasCategory} gas price has dropped below your setting of ${notificationConfig.gasPrice} to ${fastGas}! Now is a great time to send a transaction.`
				)
			} else { return }
			break;
		default:
			console.error(`Invalid notification config gas category ${notificationConfig.gasCategory}!`);
			return;
	}
	cancelNotifications();
}