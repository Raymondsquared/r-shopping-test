import { MainCheckoutService } from './checkout';
import { EmptyCartError, InvalidInputError, ItemNotFoundError } from '../../common/error';
import { MockItemRepository } from '../../item/repositories/mock';
import { Output } from '../../common/types/output';
import { ItemRepository } from '../../item/types/repository';
import { CheckoutService } from '../types/service';
import { Item } from '../../item/types/item';

const itemRepository: ItemRepository = new MockItemRepository();
const checkoutService: CheckoutService = new MainCheckoutService(itemRepository);

beforeEach(() => {
  checkoutService.clear();
});

describe('GIVEN `scan` method in `CheckoutService` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return valid output', async () => {
      const expectedOutput: Output<boolean> = {
        data: true,
      };

      expect(checkoutService.clear()).toEqual(expectedOutput);
    });
  });
});

describe('GIVEN `scan` method in `CheckoutService` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return `InvalidInputError`', async () => {
      const expectedOutput: Output<boolean> = {
        data: false,
        error: new InvalidInputError(),
      };

      expect(checkoutService.scan(undefined)).toEqual(expectedOutput);
      expect(checkoutService.scan(null)).toEqual(expectedOutput);
      expect(checkoutService.scan('')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with unknown item', () => {
    it('THEN it should return `ItemNotFoundError`', async () => {
      const validItem1: Item = {
        sku: 's01',
        name: 'valid-name',
        price: 1,
      };
      const expectedOutput1: Output<boolean> = {
        data: true,
      };
      const expectedOutput2: Output<boolean> = {
        data: false,
        error: new ItemNotFoundError(),
      };

      expect(itemRepository.insertMany([validItem1])).toEqual(expectedOutput1);
      expect(checkoutService.scan('s02')).toEqual(expectedOutput2);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const validItem1: Item = {
        sku: 's03',
        name: 'valid-name',
        price: 1,
      };
      const validItem2: Item = {
        sku: 's04',
        name: 'valid-name',
        price: 1,
      };
      const expectedOutput: Output<boolean> = {
        data: true,
      };

      expect(itemRepository.insertMany([validItem1, validItem2])).toEqual(expectedOutput);
      expect(checkoutService.scan(validItem1.sku)).toEqual(expectedOutput);
      expect(checkoutService.scan(validItem2.sku)).toEqual(expectedOutput);
      expect(checkoutService.scan(validItem1.sku)).toEqual(expectedOutput);
    });
  });
});

describe('GIVEN `total` method in `CheckoutService` module', () => {
  describe('WHEN it is invoked with empty cart', () => {
    it('THEN it should return `EmptyItemError`', async () => {
      const expectedOutput: Output<boolean> = {
        error: new EmptyCartError(),
      };

      expect(checkoutService.total()).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const validItem1: Item = {
        sku: 't01',
        name: 'valid-name',
        price: 1.99,
      };
      const validItem2: Item = {
        sku: 't02',
        name: 'valid-name',
        price: 2,
      };
      const expectedOutput1: Output<boolean> = {
        data: true,
      };
      const expectedOutput2: Output<boolean> = {
        data: false,
        error: new ItemNotFoundError(),
      };
      const expectedOutput3: Output<string> = {
        data: `SKUs Scanned: t01, t02, t01\nTotal expected: $5.98`,
      };

      expect(itemRepository.insertMany([validItem1, validItem2])).toEqual(expectedOutput1);
      expect(checkoutService.scan(validItem1.sku)).toEqual(expectedOutput1);
      expect(checkoutService.scan(validItem2.sku)).toEqual(expectedOutput1);
      expect(checkoutService.scan(validItem1.sku)).toEqual(expectedOutput1);
      expect(checkoutService.scan('t03')).toEqual(expectedOutput2);
      expect(checkoutService.total()).toEqual(expectedOutput3);
    });
  });
});
