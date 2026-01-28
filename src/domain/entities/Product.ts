export class Product {
  readonly name;
  readonly description;
  readonly id;
  readonly createdAt;

  constructor({
    name,
    description,
    id,
    createdAt,
  }: {
    name: string;
    description: string;

    id: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;

    this.description = description;
  }

  // Podemos definir reglas de negocio muy fácilmente
  // por ejemplo, dos productos son iguales si tienen el mismo nombre
  // isProductEqual(product: Product): boolean {
  //   return this.name === product.name;
  // }
}
