import { intersectionBy, isEmpty } from 'lodash';
import { Item } from '../../item/types/item';
import { Promotion, PromotionItem } from '../types/promotion';
import { PromotionService } from '../types/service';

class BundlePromotionService implements PromotionService {
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
            for (const bundleItem of item.bundleItems) {
              output.push({
                sku: bundleItem.sku,
                name: `Bundle item: ${bundleItem.name}`,
                price: bundleItem.price,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed bundle promotion, Error:', error);
    }

    return output;
  }
}

export { BundlePromotionService };
