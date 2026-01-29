// Podemos crear una entidad Entity que es común al resto de clases de entidad que tienen id y createdAt
class Entity {
  readonly id: string;
  readonly createdAt: Date;

  constructor(id: string, createdAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
  }
}

export class User extends Entity {
  readonly email: string;
  readonly password: string;
  // podemos definir todo lo que queramos a la hora de crear un usuario
  constructor({
    email,
    password,
    id,
    createdAt,
  }: {
    email: string;
    password: string;
    id: string;
    createdAt: Date;
  }) {
    super(id, createdAt);
    this.email = email;
    this.password = password;
  }
}
