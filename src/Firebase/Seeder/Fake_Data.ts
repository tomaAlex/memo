import { faker } from "@faker-js/faker";
import { User } from "../../../Models/User/user_model";
import { Gender } from "../../../Models/User/Gender";
import { Orientation } from "../../../Models/User/Orientation";
export class Fake_Data {
	constructor() {}

	public static get_first_name(): string {
		return faker.name.firstName();
	}

	public static get_last_name(): string {
		return faker.name.lastName();
	}

	public static get_gemder(): Gender {
		//generate a random number between 0 and 2
		let random_number = Math.floor(Math.random() * 3);
		switch (random_number) {
			case 0:
				return Gender.Male;
			case 1:
				return Gender.Female;
			case 2:
				return Gender.Other;
			default:
				return Gender.Male;
		}
	}

	public static get_DOB(): Date {
		return faker.date.birthdate();
	}

	public static get_occupation(): string {
		return faker.name.jobTitle();
	}

	public static get_education(): string {
		return faker.name.jobTitle();
	}

	public static get_bio(): string {
		return faker.lorem.paragraph();
	}

	public static get_location(): string {
		return faker.address.city();
	}

	public static get_height(): number {
		return Math.floor(Math.random() * 220);
	}

	public static get_sexual_orientation(): Orientation {
		let random_number = Math.floor(Math.random() * 4);
		switch (random_number) {
			case 0:
				return Orientation.Heterosexual;
			case 1:
				return Orientation.Homosexual;
			case 2:
				return Orientation.Bisexual;
			case 3:
				return Orientation.Other;
			default:
				return Orientation.Heterosexual;
		}
	}

	public static get_images(): string[] {
		let images: string[] = [];
		for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
			images.push(faker.image.avatar());
		}
		return images;
	}

	public static get_user(): User {
		return {
			firstName: this.get_first_name(),
			lastName: this.get_last_name(),
			gender: this.get_gemder(),
			dateOfBirth: this.get_DOB(),
			occupation: this.get_occupation(),
			education: this.get_education(),
			bio: this.get_bio(),
			location: this.get_location(),
			height: this.get_height(),
			sexualOrientation: this.get_sexual_orientation(),
			images: this.get_images(),
		};
	}

	public static get_users(count: number): User[] {
		let users: User[] = [];
		for (let i = 0; i < count; i++) {
			users.push(this.get_user());
		}
		return users;
	}

	public static get_email(): string {
		return faker.internet.email();
	}

	public static get_password(): string {
		return faker.internet.password();
	}
}
