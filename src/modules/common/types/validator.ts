interface Validator<T> {
  isValid(input: T): boolean;
}

export { Validator };
