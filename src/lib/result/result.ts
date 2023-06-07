// https://dev.classmethod.jp/articles/error-handling-practice-of-typescript/

/**
 * @public
 */
export type Result<T, E extends Error> = Success<T, E> | Failure<T, E>;

/**
 * @public
 */
export class Success<T, E> {
  constructor(readonly value: T) {}
  type = "success" as const; // ここを追加
  isSuccess(): this is Success<T, E> {
    return true;
  }
  isFailure(): this is Failure<T, E> {
    return false;
  }
}

/**
 * @public
 */
export class Failure<T, E> {
  constructor(readonly value: E) {}
  type = "failure" as const; // ここを追加
  isSuccess(): this is Success<T, E> {
    return false;
  }
  isFailure(): this is Failure<T, E> {
    return true;
  }
}
