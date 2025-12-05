import {
  DollarSign,
  Headset,
  ShoppingBagIcon,
  WalletCards,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

function IconBoxes() {
  return (
    <div className="mt-10">
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4">
          <div className="space-y-2">
            <ShoppingBagIcon className="text-stone-400" />
            <div className="text-sm text-stone-500 font-bold">
              Free Shipping
            </div>
            <div className="text-xs text-muted-foreground">
              Free shipping on orders above 3000$
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign className="text-stone-400" />
            <div className="text-sm text-stone-500 font-bold">
              Money Back Guarantee
            </div>
            <div className="text-xs text-muted-foreground">
              Within 30 days of purchase
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards className="text-stone-400" />
            <div className="text-sm text-stone-500 font-bold">
              Flexible Payment
            </div>
            <div className="text-xs text-muted-foreground">
              Pay with creid card, PayPal or COD
            </div>
          </div>
          <div className="space-y-2">
            <Headset className="text-stone-400" />
            <div className="text-sm text-stone-500 font-bold">24/7 Support</div>
            <div className="text-xs text-muted-foreground">
              Get support at any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default IconBoxes;
