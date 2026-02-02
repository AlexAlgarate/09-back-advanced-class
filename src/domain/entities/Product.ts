export class Product {
  readonly name: string;
  readonly description: string;
  readonly id: string;
  readonly createdAt: Date;
  readonly ownerId: string;

  constructor({
    name,
    description,
    id,
    createdAt,
    ownerId,
  }: {
    name: string;
    description: string;

    id: string;
    createdAt: Date;
    ownerId: string;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.ownerId = ownerId;
    this.description = description;
  }

  // Podemos definir reglas de negocio muy fácilmente
  // por ejemplo, dos productos son iguales si tienen el mismo nombre
  // isProductEqual(product: Product): boolean {
  //   return this.name === product.name;
  // }
}
