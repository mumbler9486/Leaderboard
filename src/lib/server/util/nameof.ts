/**
 * Used to get the property names of a property based on
 * type inference. Simular in usage for C#'s nameof.
 * https://stackoverflow.com/a/63891494
 * @returns An object with the property names of a type
 */
export function fields<T>() {
	return new Proxy(
		{},
		{
			get: function (_target, prop, _receiver) {
				return prop;
			}
		}
	) as {
		[P in keyof T]: P;
	};
}
