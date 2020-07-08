import { Promotion, PromotionItem } from '../types/promotion';
import { PromotionService } from '../types/service';
import { GetOneFreePromotionService } from './free';

describe('GIVEN `scan` method in `PromotionService` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return null', async () => {
      const promotionService: PromotionService = new GetOneFreePromotionService([]);

      expect(promotionService.apply(undefined)).toEqual([]);
      expect(promotionService.apply(null)).toEqual([]);
      expect(promotionService.apply([])).toEqual([]);
    });
  });

  describe('WHEN it is invoked with non-promotion items', () => {
    it('THEN it should return null', async () => {
      const validItem1: PromotionItem = {
        sku: 'a01',
        name: 'valid-name',
        price: 1,
        minimumQuantity: 3,
      };
      const validItem2: PromotionItem = {
        sku: 'a02',
        name: 'valid-name',
        price: 1,
        minimumQuantity: 3,
      };
      const validItem3: PromotionItem = {
        sku: 'a03',
        name: 'valid-name',
        price: 1,
        minimumQuantity: 3,
      };
      const expectedOutput: Promotion[] = [];

      const promotionService: PromotionService = new GetOneFreePromotionService([validItem3]);

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
      const validItem1: PromotionItem = {
        sku: 'a04',
        name: 'valid-name',
        price: 1,
        minimumQuantity: 3,
      };
      const expectedOutput: Promotion[] = [];

      const promotionService: PromotionService = new GetOneFreePromotionService([validItem1]);

      expect(promotionService.apply([validItem1, validItem1])).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const validItem1: PromotionItem = {
        sku: 'a05',
        name: 'valid-name-5',
        price: 5,
        minimumQuantity: 3,
      };
      const validItem2: PromotionItem = {
        sku: 'a06',
        name: 'valid-name-6',
        price: 6,
        minimumQuantity: 3,
      };
      const expectedOutput: Promotion[] = [
        {
          name: 'Buy 3 get one free: valid-name-5',
          discount: 5,
        } as Promotion,
      ];
      const promotionService: PromotionService = new GetOneFreePromotionService([
        validItem1,
        validItem2,
      ]);
      expect(promotionService.apply([validItem1, validItem1, validItem1])).toEqual(expectedOutput);
      expect(
        promotionService.apply([validItem1, validItem1, validItem1, validItem1, validItem1])
      ).toEqual(expectedOutput);
    });
    it('THEN it should return valid output with multiple different items', async () => {
      const validItem1: PromotionItem = {
        sku: 'a05',
        name: 'valid-name-5',
        price: 5,
        minimumQuantity: 3,
      };
      const validItem2: PromotionItem = {
        sku: 'a06',
        name: 'valid-name-6',
        price: 6,
        minimumQuantity: 3,
      };
      const validItem3: PromotionItem = {
        sku: 'a07',
        name: 'valid-name-7',
        price: 7,
        minimumQuantity: 3,
      };
      const expectedOutput: Promotion[] = [
        {
          name: 'Buy 3 get one free: valid-name-5',
          discount: 5,
        } as Promotion,
        {
          name: 'Buy 3 get one free: valid-name-5',
          discount: 5,
        } as Promotion,
        {
          name: 'Buy 3 get one free: valid-name-6',
          discount: 6,
        } as Promotion,
      ];

      const promotionService: PromotionService = new GetOneFreePromotionService([
        validItem1,
        validItem2,
      ]);
      expect(
        promotionService.apply([
          validItem1,
          validItem1,
          validItem1,
          validItem1,
          validItem1,
          validItem1,
          validItem2,
          validItem2,
          validItem2,
          validItem3,
          validItem3,
          validItem3,
        ])
      ).toEqual(expectedOutput);
    });
  });
});
