module.exports.residentData = (residentInfo) => {
	const data = residentInfo.map((item) => {
		return item.dataValues;
	});
	const nationalities = [];
	const languagues = [];
	const religions = [];
	data.forEach((item) => {
		const { infoId, info } = item;
		switch (infoId) {
			case 1:
				nationalities.push(info);
				break;
			case 2:
				languagues.push(info);
				break;
			case 3:
				religions.push(info);
				break;
			default:
				console.log("ERROR");
				break;
		}
	});
	return { nationalities, languagues, religions };
};
