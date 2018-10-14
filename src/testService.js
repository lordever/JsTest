module.exports = {
	getText: () => {
		window.getText = async function (name) {
			const service = await window.MUI.getService();
			return await service.testService.getMsgAfterWait(name);
		}
	},
	saveToStorage: () => {
		window.saveToStorage = async function (name, data) {
			const service = await window.MUI.getService();
			service.testService.saveToStorage(name, data);
		}
	},
	removeFromStorage: () => {
		window.removeFromStorage = async function (name, data) {
			const service = await window.MUI.getService();
			service.testService.removeFromStorage(name);
		}
	}
};



