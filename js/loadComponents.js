document.addEventListener('DOMContentLoaded', async () => {
	const footerSlot = document.getElementById('footer');

	if (!footerSlot) {
		return;
	}

	try {
		const response = await fetch('footer.html');

		if (!response.ok) {
			throw new Error(`Footer request failed: ${response.status}`);
		}

		footerSlot.innerHTML = await response.text();
		footerSlot.querySelectorAll('[data-year]').forEach((year) => {
			year.textContent = new Date().getFullYear();
		});
	} catch (error) {
		console.error('Unable to load the shared footer.', error);
	}
});
