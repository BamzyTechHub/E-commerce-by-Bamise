const Filters = ({ categories, selectedCategory, sortBy, onCategoryChange, onSortChange }) => {
  return (
    <div className="filters-grid">
      <div className="field-group">
        <label htmlFor="category-filter">Category</label>
        <select id="category-filter" value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="sort-filter">Sort by price</label>
        <select id="sort-filter" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
