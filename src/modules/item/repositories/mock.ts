import { isEmpty, uniqBy } from 'lodash';

import { InvalidInputError, DuplicateInputError, ItemNotFoundError } from '../../common/error';
import { Item } from '../types/item';
import { Output } from '../../common/types/output';
import { ItemRepository } from '../types/repository';
import { Validator } from '../../common/types/validator';
import { ItemValidator } from '../validations/item';

class MockItemRepository implements ItemRepository {
  #database: Item[];
  #validator: Validator<Item>;

  constructor() {
    this.#database = [] as Item[];
    this.#validator = new ItemValidator();
  }

  selectOne(sku: string): Output<Item> {
    const output: Output<Item> = {};
    try {
      if (!sku) {
        output.error = new InvalidInputError();
        return output;
      }

      const itemFound = this.#database.find((item) => {
        if (item.sku === sku) {
          return item.sku;
        }
      });

      if (isEmpty(itemFound)) {
        output.error = new ItemNotFoundError();
        return output;
      }

      output.data = itemFound;
    } catch (error) {
      output.error = error;
    }

    return output;
  }

  insertMany(itemsInput: Item[]): Output<boolean> {
    const output: Output<boolean> = {
      data: false,
    };

    try {
      if (
        isEmpty(itemsInput) ||
        !itemsInput.every((item) => {
          return this.#validator.isValid(item);
        }) ||
        !isInputSKUUniqueFunction(itemsInput)
      ) {
        output.error = new InvalidInputError();
        return output;
      }

      // Atomicity: We want to failed the whole transaction
      // when one of the items is not valid
      if (
        itemsInput.every((item) => {
          return isSKUDBUniqueFunction(item, this.#database);
        })
      ) {
        output.error = new DuplicateInputError();
        return output;
      }

      this.#database.push(...itemsInput);
      output.data = true;
    } catch (error) {
      output.error = error;
    }

    return output;
  }
}

// Private methods mainly for utilities
const isInputSKUUniqueFunction = function checkForDuplicateSKUInItemsFunction(
  itemsInput: Item[]
): boolean {
  let isUnique = false;
  try {
    if (uniqBy(itemsInput, 'sku').length === itemsInput.length) {
      isUnique = true;
    }
  } catch (error) {
    console.error('Failed checking unique SKU, Error:', error);
  }

  return isUnique;
};

const isSKUDBUniqueFunction = function checkForDuplicateSKUInDatabaseFunction(
  item: Item,
  database: Item[]
): boolean {
  const found = database.find((d) => d.sku === item.sku);
  return !isEmpty(found);
};

export { MockItemRepository };
