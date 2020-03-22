export class Posts {

  id: number;
  description: string;
  location: string;
  types: [string];
  files: [string];

  constructor(description: string,
              location: string,
              types: [string]) {
    this.description = description;
    this.location = location;
    this.types = types;
  }
}
