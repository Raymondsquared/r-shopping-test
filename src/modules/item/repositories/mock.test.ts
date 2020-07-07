import { DuplicateInputError, InvalidInputError, ItemNotFoundError } from '../../common/error';
import { Item } from '../types/item';
import { MockItemRepository } from './mock';
import { Output } from '../../common/types/output';
import { ItemRepository } from '../types/repository';

const itemRepository: ItemRepository = new MockItemRepository();

describe('GIVEN `selectOne` method in `ItemRepository` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return `InvalidInputError`', async () => {
      const expectedOutput: Output<Item> = {
        error: new InvalidInputError(),
      };

      expect(itemRepository.selectOne(undefined)).toEqual(expectedOutput);
      expect(itemRepository.selectOne(null)).toEqual(expectedOutput);
      expect(itemRepository.selectOne('')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with unknown item', () => {
    it('THEN it should return `ItemNotFoundError`', async () => {
      const expectedOutput: Output<Item> = {
        error: new ItemNotFoundError(),
      };
      expect(itemRepository.selectOne('s01')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const validItem: Item = {
        sku: 's02',
        name: 'valid-name',
        price: 1,
      };

      const expectedOutput1: Output<boolean> = {
        data: true,
      };
      const expectedOutput2: Output<Item> = {
        data: validItem,
      };

      expect(itemRepository.insertMany([validItem])).toEqual(expectedOutput1);
      expect(itemRepository.selectOne(validItem.sku)).toEqual(expectedOutput2);
    });
  });
});

describe('GIVEN `insertMany` method in `ItemRepository` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return `InvalidInputError`', async () => {
      const expectedOutput: Output<boolean> = {
        data: false,
        error: new InvalidInputError(),
      };

      expect(itemRepository.insertMany(undefined)).toEqual(expectedOutput);
      expect(itemRepository.insertMany(null)).toEqual(expectedOutput);
      expect(itemRepository.insertMany([])).toEqual(expectedOutput);
      expect(itemRepository.insertMany([{} as Item])).toEqual(expectedOutput);
      expect(
        itemRepository.insertMany([
          {} as Item,
          { sku: 'i01', name: 'valid-name', price: 1 } as Item,
        ])
      ).toEqual(expectedOutput);
      expect(
        itemRepository.insertMany([
          { sku: 'i02', name: 'valid-name', price: 1 } as Item,
          {} as Item,
        ])
      ).toEqual(expectedOutput);
      expect(
        itemRepository.insertMany([
          { sku: 'i03', name: 'valid-name', price: 1 } as Item,
          {} as Item,
          { sku: 'i04', name: 'valid-name', price: 1 } as Item,
        ])
      ).toEqual(expectedOutput);
      expect(
        itemRepository.insertMany([
          { sku: 'i05', name: 'valid-name', price: 1 } as Item,
          { sku: 'i05', name: 'valid-name', price: 1 } as Item,
        ])
      ).toEqual(expectedOutput);
      expect(
        itemRepository.insertMany([
          { sku: 'i06', name: 'valid-name', price: 1 } as Item,
          { sku: 'i07', name: 'valid-name', price: 1 } as Item,
          { sku: 'i06', name: 'valid-name', price: 1 } as Item,
        ])
      ).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with duplicate SKU', () => {
    it('THEN it should return `DuplicateInputError`', async () => {
      const expectedOutput1: Output<boolean> = {
        data: true,
      };
      const expectedOutput2: Output<boolean> = {
        data: false,
        error: new DuplicateInputError(),
      };

      expect(
        itemRepository.insertMany([{ sku: 'i10', name: 'valid-name', price: 1 } as Item])
      ).toEqual(expectedOutput1);
      expect(
        itemRepository.insertMany([{ sku: 'i10', name: 'valid-name', price: 1 } as Item])
      ).toEqual(expectedOutput2);
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return valid output', async () => {
      const expectedOutput: Output<boolean> = {
        data: true,
      };

      expect(
        itemRepository.insertMany([
          {
            sku: 'i20',
            name: 'valid-name',
            price: 1,
          } as Item,
        ])
      ).toEqual(expectedOutput);

      expect(
        itemRepository.insertMany([
          {
            sku: 'i21',
            name: 'valid-name',
            price: 1,
          } as Item,
          {
            sku: 'i22',
            name: 'valid-name',
            price: 1,
          } as Item,
        ])
      ).toEqual(expectedOutput);
    });
  });
});
