import { Item } from './item';
import { Output } from '../../common/types/output';

interface ItemRepository {
  selectOne(sku: string): Output<Item>;
  insertMany(items: Item[]): Output<boolean>;
}

export { ItemRepository };
