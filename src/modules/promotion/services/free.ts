import { intersectionBy, isEmpty } from 'lodash';

import { InvalidInputError } from '../../common/error';
import { Item } from '../../item/types/item';
import { Output } from '../../common/types/output';
import { PromotionItem, PromotionRuleItem } from '../types/promotion';
import { PromotionService } from '../types/service';

class GetOneFreePromotionService implements PromotionService {
  #promotionRuleItems: PromotionRuleItem[];

  constructor(promotionRuleItems: PromotionRuleItem[]) {
    this.#promotionRuleItems = promotionRuleItems;
  }

  apply(itemsInput: Item[]): Output<PromotionItem[]> {
    const output: Output<PromotionItem[]> = {};

    try {
      if (isEmpty(this.#promotionRuleItems) || isEmpty(itemsInput)) {
        output.error = new InvalidInputError();
        return output;
      }

      const itemsWithPromotion: PromotionRuleItem[] = intersectionBy(
        this.#promotionRuleItems,
        itemsInput,
        'sku'
      );

      if (isEmpty(itemsWithPromotion)) {
        return output;
      }

      output.data = [] as PromotionItem[];
      for (const item of itemsWithPromotion) {
        const matchingItems = itemsInput.filter((i) => {
          return i.sku === item.sku;
        });

        if (!isEmpty(matchingItems)) {
          for (let x = 0; x < Math.floor(matchingItems.length / item.minimumQuantity); x++) {
            output.data.push({
              name: `Buy ${item.minimumQuantity} get one free: ${item.name}`,
              discount: item.price,
            } as PromotionItem);
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
