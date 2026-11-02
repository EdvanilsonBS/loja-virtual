import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";


const EMPTY = { title: "", price: null, category: "", image: "", description: "" };

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));
  const invalid = !form.title.trim() || !form.price || !form.category.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (invalid) return;
    onAdd({ ...form, title: form.title.trim(), category: form.category.trim() });
    setForm(EMPTY);
    setSubmitted(false);
  };

  return (
    <Card title="Novo produto" className="shadow-2">
      <form onSubmit={handleSubmit} className="flex flex-column gap-3">
        <div className="flex flex-column gap-1">
          <label htmlFor="title">Nome</label>
          <InputText
            id="title"
            value={form.title}
            onChange={(e) => set("title")(e.target.value)}
            className={submitted && !form.title.trim() ? "p-invalid" : ""}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="price">Preço</label>
          <InputNumber
            inputId="price"
            value={form.price}
            onValueChange={(e) => set("price")(e.value)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            className={submitted && !form.price ? "p-invalid" : ""}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="category">Categoria</label>
          <InputText
            id="category"
            value={form.category}
            onChange={(e) => set("category")(e.target.value)}
            className={submitted && !form.category.trim() ? "p-invalid" : ""}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="image">URL da imagem</label>
          <InputText
            id="image"
            value={form.image}
            onChange={(e) => set("image")(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="description">Descrição</label>
          <InputTextarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
          />
        </div>

        {submitted && invalid && (
          <small className="p-error">Preencha nome, preço e categoria.</small>
        )}

        <Button type="submit" label="Adicionar produto" icon="pi pi-plus" />
      </form>
    </Card>
  );
}
