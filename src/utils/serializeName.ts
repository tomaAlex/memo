/**
 * The upper case letters are converted to lower
 * case and the spaces are replaced with dashes.
 *
 * @param name The name to serialize.
 * @returns The serialized name.
 */
export const serializeName = (name: string) => {
	return name.toLowerCase().replace(/ /g, "-");
};
