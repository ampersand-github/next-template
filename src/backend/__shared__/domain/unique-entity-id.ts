export abstract class UniqueEntityId {
  protected constructor(
    protected readonly value: string,
    // memo: 他のIDと別物と判定するために定義
    private readonly _klazzName: string
  ) {
    if (!value) {
      throw new Error("unique id must not to be empty.");
    }
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UniqueEntityId): boolean {
    return this.value === other.value;
  }
}
