import { UniqueEntityId } from "@/backend/__shared__/domain/unique-entity-id";
import { Entity } from "./entity";

export abstract class AggregateRoot<T, U extends UniqueEntityId> extends Entity<
  T,
  U
> {}
