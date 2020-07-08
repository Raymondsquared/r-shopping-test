import { Output } from '../../common/types/output';

interface CheckoutService {
  clear(): Output<boolean>;
  scan(itemSKU: string): Output<boolean>;
  total(): Output<string>;
}

export { CheckoutService };
