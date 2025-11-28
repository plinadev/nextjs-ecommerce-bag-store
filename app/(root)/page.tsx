import ProductList from "@/components/shared/product/product-list";
import { Button } from "@/components/ui/button";
import sampleData from "@/db/sample-data";
export const metadata = {
  title: "Home",
};
async function Homepage() {
  return (
    <div>
      <ProductList data={sampleData.products} title="Winter Collection" limit={4}/>
    </div>
  );
}

export default Homepage;
