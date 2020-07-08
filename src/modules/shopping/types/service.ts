import { Output } from '../../common/types/output';

interface CheckoutService {
  clear(): void;
  scan(itemSKU: string): Output<boolean>;
  summary(): Output<string>;
  total(): void;
}

export { CheckoutService };
