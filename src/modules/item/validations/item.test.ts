import { Item } from '../types/item';
import { ItemValidator } from './item';
import { Validator } from '../../common/types/validator';

const itemValidator: Validator<Item> = new ItemValidator();

describe('GIVEN `isValid` method in `ItemValidator` module', () => {
  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return false, for empty objects', async () => {
      expect(itemValidator.isValid(undefined)).toBeFalsy();
      expect(itemValidator.isValid(null)).toBeFalsy();
      expect(itemValidator.isValid({} as Item)).toBeFalsy();
    });

    it('THEN it should return false, for missing properties', async () => {
      expect(itemValidator.isValid({ sku: 'sku' } as Item)).toBeFalsy();
      expect(itemValidator.isValid({ name: 'invalid-name' } as Item)).toBeFalsy();
      expect(itemValidator.isValid({ price: 0 } as Item)).toBeFalsy();

      expect(itemValidator.isValid({ sku: 'sku', name: 'invalid-name' } as Item)).toBeFalsy();
      expect(itemValidator.isValid({ sku: 'sku', price: 0 } as Item)).toBeFalsy();
      expect(itemValidator.isValid({ name: 'invalid-name', price: 0 } as Item)).toBeFalsy();
    });

    it('THEN it should return false, for invalid SKU', async () => {
      expect(
        itemValidator.isValid({ sku: 'id', name: 'valid-name', price: 1 } as Item)
      ).toBeFalsy();
      expect(
        itemValidator.isValid({ sku: 'invalid-sku', name: 'valid-name', price: 1 } as Item)
      ).toBeFalsy();
    });

    it('THEN it should return false, for invalid price', async () => {
      expect(
        itemValidator.isValid({ sku: 'sku', name: 'valid-name', price: 0 } as Item)
      ).toBeFalsy();
      expect(
        itemValidator.isValid({ sku: 'sku', name: 'valid-name', price: -1 } as Item)
      ).toBeFalsy();
      expect(
        itemValidator.isValid({ sku: 'sku', name: 'valid-name', price: Infinity } as Item)
      ).toBeFalsy();
    });
  });

  describe('WHEN it is invoked with valid input', () => {
    it('THEN it should return true', async () => {
      expect(
        itemValidator.isValid({ sku: 'sku', name: 'valid-name', price: 0.99 } as Item)
      ).toBeTruthy();
    });
  });
});
