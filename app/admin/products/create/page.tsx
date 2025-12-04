import ProductForm from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};
async function AdminProductCreatePage() {
  await requireAdmin();

  return (
    <div>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="create"/>
      </div>
    </div>
  );
}

export default AdminProductCreatePage;
