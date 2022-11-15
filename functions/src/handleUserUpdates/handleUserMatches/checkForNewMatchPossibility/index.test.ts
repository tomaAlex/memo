import checkForNewMatchPossibility from ".";

describe("checkForNewMatchPossibility", () => {
	const beforeChangeUserData: User = {
		firstName: "John",
		lastName: "Doe",
		gender: "MALE",
		birthDate: "1990-01-01",
		orientation: "HETERO",
		photos: [],
		likes: ["1", "2", "3"],
		dislikes: [],
		matches: [],
		coordinates: {
			latitude: 0,
			longitude: 0,
		},
	};

	it("should return true if the likes field has changed", () => {
		const afterChangeUserData: User = {
			...beforeChangeUserData,
			likes: ["1", "2", "3", "4"],
		};
		const result = checkForNewMatchPossibility(beforeChangeUserData, afterChangeUserData);
		expect(result).toBe(true);
	});

	it("should return false if the likes field has not changed", () => {
		const afterChangeUserData: User = {
			...beforeChangeUserData,
			likes: ["1", "2", "3"],
			matches: ["1"],
		};
		const result = checkForNewMatchPossibility(beforeChangeUserData, afterChangeUserData);
		expect(result).toBe(false);
	});
});
