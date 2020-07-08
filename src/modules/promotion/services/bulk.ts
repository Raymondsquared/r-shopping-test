import { intersectionBy, isEmpty, isEqual } from 'lodash';
import { Item } from '../../item/types/item';
import { Promotion, PromotionItem } from '../types/promotion';
import { PromotionService } from '../types/service';

class BulkPromotionService implements PromotionService {
  #promotionItems: PromotionItem[];

  constructor(promotionItems: PromotionItem[]) {
    this.#promotionItems = promotionItems;
  }

  apply(itemsInput: Item[]): Promotion[] {
    const output: Promotion[] = [];

    try {
      if (isEmpty(this.#promotionItems) || isEmpty(itemsInput)) {
        return output;
      }

      const itemsWithPromotion: PromotionItem[] = intersectionBy(
        this.#promotionItems,
        itemsInput,
        'sku'
      );
      if (isEmpty(itemsWithPromotion)) {
        return output;
      }

      for (const item of itemsWithPromotion) {
        const matchingItems = itemsInput.filter((i) => {
          return i.sku === item.sku;
        });

        if (!isEmpty(matchingItems) && matchingItems.length >= item.minimumQuantity) {
          for (const matchingItem of matchingItems) {
            output.push({
              name: `Bulk discount for: ${item.name}`,
              discount: item.discountAmount,
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed applying bulk promotion, Error:', error);
    }

    return output;
  }
}

export { BulkPromotionService };
