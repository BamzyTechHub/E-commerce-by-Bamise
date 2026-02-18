import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="container page-stack">
      <h1>404 - Page Not Found</h1>
      <p className="state-card">The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </section>
  );
};

export default NotFound;
