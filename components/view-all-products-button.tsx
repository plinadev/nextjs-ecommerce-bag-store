import Link from "next/link";
import { Button } from "./ui/button";

function ViewAllProductsButton() {
  return (
    <Button asChild className="w-full">
      <Link href="/search">View All Products</Link>
    </Button>
  );
}

export default ViewAllProductsButton;
