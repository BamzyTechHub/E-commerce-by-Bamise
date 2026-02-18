import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useStore } from '../context/storeContext';

const PRODUCTS_PER_PAGE = 8;

const Shop = () => {
  const { products } = useStore();
  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const filteredProducts = useMemo(() => {
    let nextProducts = [...products];

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      nextProducts = nextProducts.filter((product) => product.title.toLowerCase().includes(term));
    }

    if (category !== 'All') {
      nextProducts = nextProducts.filter((product) => product.category === category);
    }

    if (sortBy === 'price-asc') {
      nextProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'price-desc') {
      nextProducts.sort((a, b) => b.price - a.price);
    }

    return nextProducts;
  }, [products, search, category, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);

  const onFiltersUpdate = (cb) => {
    cb();
    setCurrentPage(1);
  };

  return (
    <section className="container page-stack">
      <div className="section-head">
        <h1>Shop</h1>
        <p>Browse the full catalog with search, filters, and sorting.</p>
      </div>

      <div className="controls-panel">
        <SearchBar value={search} onChange={(value) => onFiltersUpdate(() => setSearch(value))} />
        <Filters
          categories={categories}
          selectedCategory={category}
          sortBy={sortBy}
          onCategoryChange={(value) => onFiltersUpdate(() => setCategory(value))}
          onSortChange={(value) => onFiltersUpdate(() => setSortBy(value))}
        />
      </div>

      {loading ? <p className="state-card">Loading products...</p> : null}

      {!loading && paginated.length === 0 ? <p className="state-card">No products found for your current filters.</p> : null}

      {!loading && paginated.length > 0 ? (
        <>
          <div className="product-grid">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : null}
    </section>
  );
};

export default Shop;
