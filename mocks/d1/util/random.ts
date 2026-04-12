import { Faker, Randomizer } from '@faker-js/faker';

export class RandomUtil {
	private readonly randomizer: Randomizer;
	public readonly faker: Faker;

	constructor(faker: Faker, randomizer: Randomizer) {
		this.randomizer = randomizer;
		this.faker = faker;
	}

	public randomFromList<T>(chooseList: T[]) {
		if (!chooseList || chooseList.length === 0) {
			throw new Error('Cannot choose from empty list');
		}

		return chooseList[this.randomInt(0, chooseList.length - 1)];
	}

	public randomInt(min: number, max: number) {
		return Math.floor(this.randomizer.next() * (max - min + 1) + min);
	}

	public randomYoutubeUrl() {
		return `https://www.youtube.com/watch?v=${this.faker.string.uuid()}`;
	}
}
