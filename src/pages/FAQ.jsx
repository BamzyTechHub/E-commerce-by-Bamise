const faqItems = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days in the U.S. Express options are available at checkout.'
  },
  {
    question: 'Can I return a product?',
    answer: 'Yes. Returns are accepted within 14 days if the item is unused and in original packaging.'
  },
  {
    question: 'How do promo codes work?',
    answer: 'Apply your promo code in the Cart page before checkout. Eligible discounts are reflected instantly.'
  },
  {
    question: 'Do you restock sold-out products?',
    answer: 'Popular products are restocked regularly. Join our email updates to receive restock alerts.'
  },
  {
    question: 'Is my payment information stored?',
    answer: 'This demo is frontend-only. No real payment processing or payment data storage is performed.'
  }
];

const FAQ = () => {
  return (
    <section className="container page-stack">
      <div className="section-head">
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers about shipping, returns, and ordering.</p>
      </div>

      <div className="faq-list">
        {faqItems.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
