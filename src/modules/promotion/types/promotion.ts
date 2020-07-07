import { Item } from '../../item/types/item';

// Promotion represents the promotion we have in store at the moment.
interface Promotion extends Item {
  discount?: number;
}

// PromotionItem extends Item to specify promotion details
interface PromotionItem extends Item {
  discountAmount?: number;
  bundleItems?: Item[];
  minimumQuantity?: number;
}

export { Promotion, PromotionItem };
