import { Item } from '../../item/types/item';
import { Output } from '../../common/types/output';
import { PromotionItem } from '../types/promotion';

interface PromotionService {
  apply(itemsInput: Item[]): Output<PromotionItem[]>;
}

export { PromotionService };
