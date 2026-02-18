import { formatCurrency } from '../utils/formatCurrency';

const Price = ({ value, className = '' }) => {
  return <span className={className}>{formatCurrency(value)}</span>;
};

export default Price;
