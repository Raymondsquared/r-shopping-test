import { Item } from '../../item/types/item';
import { Promotion } from '../types/promotion';

interface PromotionService {
  apply(itemsInput: Item[]): Promotion[];
}

export { PromotionService };
