import {Gender} from './Gender';
import {Orientation} from './Orientation';

export interface User {
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Date;
  occupation?: string;
  education?: string;
  bio?: string;
  location: string;
  height?: number;
  sexualOrientation: Orientation;
  images: string[];
}
