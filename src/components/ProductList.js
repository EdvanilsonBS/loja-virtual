import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p>Nenhum produto cadastrado. Use o formulário para adicionar o primeiro.</p>;
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="col-12 sm:col-6 xl:col-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
