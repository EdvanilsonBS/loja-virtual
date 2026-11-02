import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const API_URL = "https://fakestoreapi.com/products";


export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  // A Fake Store API não persiste dados; por isso, o produto novo
  // é guardado apenas no estado local, com o id devolvido pela API.
  const addProduct = async (product) => {
    try {
      const res = await axios.post(API_URL, product);
      setProducts((prev) => [{ ...product, id: res.data.id }, ...prev]);
    } catch {
      setProducts((prev) => [{ ...product, id: Date.now() }, ...prev]);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="app-header py-4 px-4 md:px-6 shadow-2">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-shopping-bag text-2xl" />
          <h1 className="m-0 text-2xl">Loja dev Virtual</h1>
        </div>
      </header>

      <main className="grid m-0 p-3 md:p-5">
        <section className="col-12 lg:col-4 xl:col-3">
          <ProductForm onAdd={addProduct} />
        </section>

        <section className="col-12 lg:col-8 xl:col-9">
          {loading && (
            <div className="flex justify-content-center p-6">
              <i className="pi pi-spin pi-spinner text-4xl text-teal-700" />
            </div>
          )}
          {error && (
            <div className="error-box p-3 border-round">{error}</div>
          )}
          {!loading && !error && <ProductList products={products} />}
        </section>
      </main>
    </div>
  );
}
