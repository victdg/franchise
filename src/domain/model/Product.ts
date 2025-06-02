export class Product {
  private id?: string;
  private branchId?: string;
  private name?: string;
  private stock?: number;

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getBranchId(): string | undefined {
    return this.branchId;
  }

  public setBranchId(branchId: string): void {
    this.branchId = branchId;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getStock(): number | undefined {
    return this.stock;
  }

  public setStock(stock: number): void {
    this.stock = stock;
  }
}
