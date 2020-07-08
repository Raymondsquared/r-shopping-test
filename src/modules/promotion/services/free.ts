import { intersectionBy, isEmpty, isEqual } from 'lodash';
import { Item } from '../../item/types/item';
import { Promotion, PromotionItem } from '../types/promotion';
import { PromotionService } from '../types/service';

class GetOneFreePromotionService implements PromotionService {
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

        if (!isEmpty(matchingItems)) {
          for (let x = 0; x < Math.floor(matchingItems.length / item.minimumQuantity); x++) {
            output.push({
              name: `Buy ${item.minimumQuantity} get one free: ${item.name}`,
              discount: item.price,
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed applying three for two promotion, Error:', error);
    }

    return output;
  }
}

export { GetOneFreePromotionService };
