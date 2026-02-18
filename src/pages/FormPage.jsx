import { useState } from 'react';
import { useStore } from '../context/storeContext';

const initialState = {
  name: '',
  email: '',
  requestType: 'Product Inquiry',
  details: ''
};

const FormPage = () => {
  const { notify } = useStore();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.details.trim()) {
      notify('Fill all required fields with valid data', 'error');
      return;
    }

    notify('Request submitted successfully', 'success');
    setFormData(initialState);
  };

  return (
    <section className="container page-stack">
      <div className="section-head">
        <h1>Request Form</h1>
        <p>Submit partnership, bulk order, or product requests.</p>
      </div>

      <form className="summary-card" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="request-name">Full Name</label>
          <input
            id="request-name"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="request-email">Email</label>
          <input
            id="request-email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="request-type">Request Type</label>
          <select
            id="request-type"
            value={formData.requestType}
            onChange={(event) => setFormData((prev) => ({ ...prev, requestType: event.target.value }))}
          >
            <option>Product Inquiry</option>
            <option>Bulk Purchase</option>
            <option>Partnership</option>
            <option>Support</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="request-details">Details</label>
          <textarea
            id="request-details"
            rows="6"
            value={formData.details}
            onChange={(event) => setFormData((prev) => ({ ...prev, details: event.target.value }))}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>
    </section>
  );
};

export default FormPage;
