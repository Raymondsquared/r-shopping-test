import { BundlePromotionService } from './bundle';
import { InvalidInputError } from '../../common/error';
import { Item } from '../../item/types/item';
import { Output } from '../../common/types/output';
import { PromotionItem, PromotionRuleItem } from '../types/promotion';
import { PromotionService } from '../types/service';

describe('GIVEN `scan` method in `PromotionService` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return null', async () => {
      const promotionService: PromotionService = new BundlePromotionService([]);

      const expectedOutput: Output<PromotionItem[]> = {
        error: new InvalidInputError(),
      };

      expect(promotionService.apply(undefined)).toEqual(expectedOutput);
      expect(promotionService.apply(null)).toEqual(expectedOutput);
      expect(promotionService.apply([])).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with non-promotion items', () => {
    it('THEN it should return null', async () => {
      const validItem1: PromotionRuleItem = {
        sku: 'a01',
        name: 'valid-name',
        price: 1,
        bundleItems: [
          {
            sku: 'a11',
            name: 'valid-name',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const validItem2: PromotionRuleItem = {
        sku: 'a02',
        name: 'valid-name',
        price: 1,
        bundleItems: [
          {
            sku: 'a12',
            name: 'valid-name',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const validItem3: PromotionRuleItem = {
        sku: 'a03',
        name: 'valid-name',
        price: 1,
        bundleItems: [
          {
            sku: 'a13',
            name: 'valid-name',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };

      const expectedOutput: Output<PromotionItem[]> = {};

      const promotionService: PromotionService = new BundlePromotionService([validItem3]);

      expect(
        promotionService.apply([
          validItem1,
          validItem1,
          validItem1,
          validItem2,
          validItem2,
          validItem2,
        ])
      ).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with less than minimum required items', () => {
    it('THEN it should return null', async () => {
      const validItem1: PromotionRuleItem = {
        sku: 'a04',
        name: 'valid-name',
        price: 1,
        bundleItems: [
          {
            sku: 'a14',
            name: 'valid-name',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 3,
      };
      const expectedOutput: Output<PromotionItem[]> = {
        data: [],
      };

      const promotionService: PromotionService = new BundlePromotionService([validItem1]);

      expect(promotionService.apply([validItem1, validItem1])).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const validItem1: PromotionRuleItem = {
        sku: 'a05',
        name: 'valid-name-5',
        price: 5,
        bundleItems: [
          {
            sku: 'a15',
            name: 'valid-name-15',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const validItem2: PromotionRuleItem = {
        sku: 'a06',
        name: 'valid-name-6',
        price: 6,
        bundleItems: [
          {
            sku: 'a16',
            name: 'valid-name-16',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };

      const expectedOutput: Output<PromotionItem[]> = {
        data: [
          {
            name: 'Bundle item: valid-name-15',
            price: 0,
            sku: 'a15',
          } as PromotionItem,
        ],
      };

      const promotionService: PromotionService = new BundlePromotionService([
        validItem1,
        validItem2,
      ]);
      expect(promotionService.apply([validItem1])).toEqual(expectedOutput);
    });

    it('THEN it should return valid output with multiple items', async () => {
      const validItem1: PromotionRuleItem = {
        sku: 'a05',
        name: 'valid-name-5',
        price: 5,
        bundleItems: [
          {
            sku: 'a15',
            name: 'valid-name-15',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const validItem2: PromotionRuleItem = {
        sku: 'a06',
        name: 'valid-name-6',
        price: 6,
        bundleItems: [
          {
            sku: 'a16',
            name: 'valid-name-16',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const expectedOutput: Output<PromotionItem[]> = {
        data: [
          {
            name: 'Bundle item: valid-name-15',
            price: 0,
            sku: 'a15',
          } as PromotionItem,
          {
            name: 'Bundle item: valid-name-15',
            price: 0,
            sku: 'a15',
          } as PromotionItem,
        ],
      };

      const promotionService: PromotionService = new BundlePromotionService([
        validItem1,
        validItem2,
      ]);
      expect(promotionService.apply([validItem1, validItem1])).toEqual(expectedOutput);
    });

    it('THEN it should return valid output with multiple different items', async () => {
      const validItem1: PromotionRuleItem = {
        sku: 'a05',
        name: 'valid-name-5',
        price: 5,
        bundleItems: [
          {
            sku: 'a15',
            name: 'valid-name-15',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 1,
      };
      const validItem2: PromotionRuleItem = {
        sku: 'a06',
        name: 'valid-name-6',
        price: 6,
        bundleItems: [
          {
            sku: 'a16',
            name: 'valid-name-16',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 2,
      };
      const validItem3: PromotionRuleItem = {
        sku: 'a07',
        name: 'valid-name-7',
        price: 7,
        bundleItems: [
          {
            sku: 'a17',
            name: 'valid-name-17',
            price: 0,
          } as Item,
        ],
        minimumQuantity: 3,
      };
      const expectedOutput: Output<PromotionItem[]> = {
        data: [
          {
            name: 'Bundle item: valid-name-15',
            price: 0,
            sku: 'a15',
          } as PromotionItem,
          {
            name: 'Bundle item: valid-name-15',
            price: 0,
            sku: 'a15',
          } as PromotionItem,
          {
            name: 'Bundle item: valid-name-16',
            price: 0,
            sku: 'a16',
          } as PromotionItem,
        ],
      };

      const promotionService: PromotionService = new BundlePromotionService([
        validItem1,
        validItem2,
      ]);
      expect(
        promotionService.apply([validItem1, validItem1, validItem2, validItem2, validItem3])
      ).toEqual(expectedOutput);
    });
  });
});
