import { Item } from '../../item/types/item';

// PromotionItem represents the promotion we have in store at the moment.
interface PromotionItem extends Item {
  discount?: number;
}

// PromotionRuleItem extends Item to specify promotion details
interface PromotionRuleItem extends Item {
  discountAmount?: number;
  bundleItems?: Item[];
  minimumQuantity?: number;
}

export { PromotionItem, PromotionRuleItem };
