module.exports.attendenceData = () => {
	const randomGenerator = (number) => {
		return Math.floor(Math.random() * number + 1);
	};
	const data = [
		{
			id: "bingo",
			label: "bingo",
			value: randomGenerator(8),
			color: "hsl(104, 70%, 50%)",
		},
		{
			id: "painting",
			label: "painting",
			value: randomGenerator(8),
			color: "hsl(162, 70%, 50%)",
		},
		{
			id: "gardening",
			label: "gardening",
			value: randomGenerator(8),
			color: "hsl(291, 70%, 50%)",
		},
		{
			id: "bustrip",
			label: "bustrip",
			value: randomGenerator(8),
			color: "hsl(229, 70%, 50%)",
		},
		{
			id: "music",
			label: "music",
			value: randomGenerator(8),
			color: "hsl(344, 70%, 50%)",
		},
	];

	return data;
};
