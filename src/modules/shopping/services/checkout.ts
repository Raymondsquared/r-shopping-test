import { isEmpty } from 'lodash';

import { EmptyCartError, InvalidInputError, ItemNotFoundError } from '../../common/error';
import { Output } from '../../common/types/output';
import { CheckoutService } from '../types/service';
import { Item } from '../../item/types/item';
import { ItemRepository } from '../../item/types/repository';

class MainCheckoutService implements CheckoutService {
  #items: Item[];
  #itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.#items = [] as Item[];
    this.#itemRepository = itemRepository;
  }

  clear(): Output<boolean> {
    const output: Output<boolean> = {
      data: false,
    };

    try {
      this.#items = [] as Item[];
      output.data = true;
    } catch (error) {
      console.error('Failed clearing items, Error:', error);
    }

    return output;
  }

  scan(itemSKU: string): Output<boolean> {
    const output: Output<boolean> = {
      data: false,
    };

    try {
      if (!itemSKU) {
        output.error = new InvalidInputError();
        return output;
      }

      const selectItemOutput = this.#itemRepository.selectOne(itemSKU);
      if (!isEmpty(selectItemOutput.error)) {
        output.error = selectItemOutput.error;
        return output;
      } else if (isEmpty(selectItemOutput?.data)) {
        output.error = new ItemNotFoundError();
        return output;
      }

      this.#items.push(selectItemOutput.data);
      output.data = true;
    } catch (error) {
      console.error('Failed scanning item, Error:', error);
    }

    return output;
  }

  total(): Output<string> {
    const output: Output<string> = {};
    try {
      if (isEmpty(this.#items)) {
        output.error = new EmptyCartError();
        return output;
      }

      const itemSKUs = this.#items
        .map((item) => {
          return item.sku;
        })
        .join(', ');
      const itemsReducer = (priceAccumulator: number, currentItem: Item) => {
        return priceAccumulator + currentItem.price;
      };
      const totalPrice = this.#items.reduce(itemsReducer, 0);

      const scannedItems = `SKUs Scanned: ${itemSKUs}`;
      const total = `Total expected: $${totalPrice}`;

      output.data = `${scannedItems}\n${total}`;
    } catch (error) {
      console.error('Failed calculating total, Error:', error);
    }
    return output;
  }
}

export { MainCheckoutService };
