export class Product {
  readonly name;
  readonly description;

  constructor({ name, description }: { name: string; description: string }) {
    this.name = name;
    this.description = description;
  }

  // Podemos definir reglas de negocio muy fácilmente
  // por ejemplo, dos productos son iguales si tienen el mismo nombre
  // isProductEqual(product: Product): boolean {
  //   return this.name === product.name;
  // }
}
