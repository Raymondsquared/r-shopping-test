import { isEmpty } from 'lodash';

import { iPad, macBook, appleTV, vgaAdapter } from '../../item/demo';
import {
  DuplicateInputError,
  EmptyCartError,
  InvalidInputError,
  ItemNotFoundError,
} from '../../common/error';
import { MockItemRepository } from '../../item/repositories/mock';
import { Item } from '../../item/types/item';
import { Output } from '../../common/types/output';
import { PromotionItem } from '../../promotion/types/promotion';
import { ItemRepository } from '../../item/types/repository';
import { CheckoutService } from '../types/service';
import { PromotionService } from '../../promotion/types/service';

// Populate demo products
const testItemRepository: ItemRepository = new MockItemRepository();
testItemRepository.insertMany([iPad, macBook, appleTV, vgaAdapter]);

class MainCheckoutService implements CheckoutService {
  #items: Item[];
  #itemRepository: ItemRepository;
  #promotionServices: PromotionService[];

  constructor(promotionServices: PromotionService[], itemRepository?: ItemRepository) {
    this.#items = [] as Item[];
    this.#itemRepository = itemRepository || testItemRepository;
    this.#promotionServices = promotionServices;
  }

  clear(): void {
    try {
      this.#items = [] as Item[];
    } catch (error) {
      console.error('Failed clearing items, Error:', error);
    }
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
      if (selectItemOutput?.error) {
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

  summary(): Output<string> {
    const output: Output<string> = {};
    try {
      if (isEmpty(this.#items)) {
        output.error = new EmptyCartError();
        return output;
      }

      // Promotions
      if (!isEmpty(this.#promotionServices)) {
        for (const promotionService of this.#promotionServices) {
          const promotionItemsAppliedOutput = promotionService.apply(this.#items);
          if (!isEmpty(promotionItemsAppliedOutput?.error)) {
            console.error(
              'Failed applying promotion for items, Error:',
              promotionItemsAppliedOutput.error
            );
            continue;
          }

          if (!isEmpty(promotionItemsAppliedOutput?.data)) {
            this.#items.push(...promotionItemsAppliedOutput.data);
          }
        }
      }

      // SKUs
      const itemSKUs = this.#items
        .map((item) => {
          if (item?.sku) {
            return item.sku;
          }
        })
        .join(', ');

      // Price
      const itemsReducer = (priceAccumulator: number, currentItem: PromotionItem) => {
        let modifier = 0;
        if (currentItem.price) {
          modifier += currentItem.price;
        }
        if (currentItem.discount) {
          modifier -= currentItem.discount;
        }

        return priceAccumulator + modifier;
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

  total(): void {
    let output = '';
    try {
      const summaryOutput: Output<string> = this.summary();

      // Print known error friendly messsage on the application layer
      if (summaryOutput?.error) {
        switch (summaryOutput.error.constructor) {
          case EmptyCartError:
            console.log('Cart is empty!');
            break;
          case DuplicateInputError:
          case InvalidInputError:
          case ItemNotFoundError:
            console.log(summaryOutput.error.message);
            break;
          default:
            console.log('Failed totaling checkout, Error:', summaryOutput.error);
        }
      }

      if (summaryOutput?.data) {
        output = summaryOutput?.data;
      }
    } catch (error) {
      console.error('Unknown Error, please contact administrator, Error:', error);
    }

    console.log(output);
  }
}

export { MainCheckoutService };
