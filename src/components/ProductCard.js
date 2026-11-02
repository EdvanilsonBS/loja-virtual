import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";



export default function ProductCard({ product }) {
  const { title, price, category, image, description } = product;

  const header = (
    <img
      className="product-image w-full"
      alt={title}
      src={image || "https://placehold.co/300x200?text=Sem+imagem"}
    />
  );
  
  const footer = (
    <div className="flex align-items-center justify-content-between">
      <span className="product-price text-xl font-bold">
        {Number(price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
      <Button label="Comprar" icon="pi pi-shopping-cart" size="small" />
    </div>
  );

  return (
    <Card
      title={title}
      header={header}
      footer={footer}
      className="product-card h-full shadow-2"
    >
      <Tag value={category} severity="info" className="mb-2" />
      <p className="m-0 text-600 text-sm line-height-3">
        {description?.length > 90 ? description.slice(0, 90) + "…" : description}
      </p>
    </Card>
  );
}
