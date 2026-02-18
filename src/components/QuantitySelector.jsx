const QuantitySelector = ({ value, onDecrease, onIncrease, min = 1, max = 99 }) => {
  return (
    <div className="qty-control" aria-label="Quantity selector">
      <button type="button" onClick={onDecrease} disabled={value <= min} aria-label="Decrease quantity">
        -
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={onIncrease} disabled={value >= max} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
