export interface ICrudInterface<T> {
  findByEmail(email: string): Promise<T | null>;
  create(data: T): Promise<T>;
}
