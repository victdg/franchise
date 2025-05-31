export class Branch {
  private id!: string;
  private franchiseId!: string;
  private name!: string;

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getFranchiseId(): string {
    return this.franchiseId;
  }

  setFranchiseId(franchiseId: string): void {
    this.franchiseId = franchiseId;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
