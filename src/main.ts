import { BulkPromotionService } from './modules/promotion/services/bulk';
import { BundlePromotionService } from './modules/promotion/services/bundle';
import { MainCheckoutService } from './modules/shopping/services/checkout';
import { PromotionRuleItem } from './modules/promotion/types/promotion';
import { CheckoutService } from './modules/shopping/types/service';
import { PromotionService } from './modules/promotion/types/service';
import { iPad, vgaAdapter, appleTV, macBook } from './modules/item/demo';
import { GetOneFreePromotionService } from './modules/promotion/services/free';

console.log('Starting app...');

// We're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
const getOneFreePromotionService: PromotionService = new GetOneFreePromotionService([
  {
    ...appleTV,
    minimumQuantity: 3,
  },
] as PromotionRuleItem[]);

// The brand new Super iPad will have a bulk discounted applied, where the price will drop to \$499.99 each, if someone buys more than 4
const bulkPromotionService: PromotionService = new BulkPromotionService([
  {
    ...iPad,
    discountAmount: 50,
    minimumQuantity: 4,
  },
] as PromotionRuleItem[]);

// We will bundle in a free VGA adapter free of charge with every MacBook Pro sold
const bundlePromotionService: PromotionService = new BundlePromotionService([
  {
    ...macBook,
    bundleItems: [
      {
        ...vgaAdapter,
        // free on bundle
        price: 0,
      },
    ],
    minimumQuantity: 1,
  },
] as PromotionRuleItem[]);

// Pricing Rules
const pricingRules: PromotionService[] = [
  getOneFreePromotionService,
  bulkPromotionService,
  bundlePromotionService,
];

// The interface to our checkout looks like this (shown in java):
// ```java
//   Checkout co = new Checkout(pricingRules);
//   co.scan(item1);
//   co.scan(item2);
//   co.summary();
// ```
const co: CheckoutService = new MainCheckoutService(pricingRules);
co.total();

//  Example scenarios

// ---------------------------------
// SKUs Scanned: atv, atv, atv, vga
// Total expected: \$249.00

// co.clear();
// co.scan('atv');
// co.scan('atv');
// co.scan('atv');
// co.scan('vga');
// co.total();

// -----------------------------------------------
// SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
// Total expected: \$2718.95

// co.clear();
// co.scan('atv');
// co.scan('ipd');
// co.scan('ipd');
// co.scan('atv');
// co.scan('ipd');
// co.scan('ipd');
// co.scan('ipd');
// co.total();

// ---------------------------
// SKUs Scanned: mbp, vga, ipd
// Total expected: \$1949.98
// `vga` does not need to be scanned manually here since it's a bundle with `mpd`

// co.clear();
// co.scan('mbp');
// co.scan('ipd');
// co.total();
