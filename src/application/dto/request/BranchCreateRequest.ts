export class BranchCreateRequest {
  private id?: string;
  private franchiseId?: string;
  private name?: string;

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setFranchiseId(franchiseId: string): void {
    this.franchiseId = franchiseId;
  }

  public getFranchiseId(): string | undefined {
    return this.franchiseId;
  }
}
