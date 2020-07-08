import { isEmpty } from 'lodash';

import { Item } from '../types/item';
import { Validator } from '../../common/types/validator';

class ItemValidator implements Validator<Item> {
  isValid(itemInput: Item): boolean {
    const valid = true;
    try {
      if (
        isEmpty(itemInput) ||
        !itemInput.sku ||
        itemInput.sku.length !== 3 ||
        !itemInput.name ||
        !itemInput.price ||
        itemInput.price <= 0 ||
        !isFinite(itemInput.price)
      ) {
        return false;
      }
    } catch (error) {
      console.error('Failed validating item, Error:', error);
    }

    return valid;
  }
}

export { ItemValidator };
