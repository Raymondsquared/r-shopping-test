// DuplicateInputError represents the error when
// Item SKU exists in the repository
class DuplicateInputError extends Error {
  constructor(message?: string) {
    super(`DuplicateInputError: ${message}`);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

// InvalidInputError represents the error when
// customer is trying to put invalid input
class InvalidInputError extends Error {
  constructor(message?: string) {
    super(`InvalidInputError: ${message}`);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

// ItemNotFoundError represents the error when
// item is not found
class ItemNotFoundError extends Error {
  constructor(message?: string) {
    super(`ItemNotFoundError: ${message}`);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

export { DuplicateInputError, InvalidInputError, ItemNotFoundError };
