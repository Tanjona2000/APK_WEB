import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser, getUserRequests } = useContext(AppContext);
  const userRequests = getUserRequests();

  if (!currentUser) {
    return <div style={{ padding: 20 }}>Non authentifié. <a href="/login">Se connecter</a></div>;
  }

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Mes demandes</h2>
          <Link to="/create-request">
            <Button variant="success" size="md">+ Nouvelle demande</Button>
          </Link>
        </div>

        {userRequests.length === 0 ? (
          <Card>
            <p className="empty-state">Aucune demande. <Link to="/create-request">Créer une demande</Link></p>
          </Card>
        ) : (
          <div className="requests-grid">
            {userRequests.map((req) => (
              <Card key={req.id} title={req.title}>
                <div className="request-item">
                  <div className="request-meta">
                    <span className={`badge badge-${req.type.toLowerCase()}`}>{req.type}</span>
                    <span className={`status status-${req.status.toLowerCase()}`}>{req.status}</span>
                  </div>
                  <p className="request-description">{req.description.substring(0, 100)}...</p>
                  <div className="request-dates">
                    <small>Créée: {req.createdAt}</small>
                  </div>
                  <Link to={`/request/${req.id}`} className="btn-link">
                    <Button variant="primary" size="sm">Voir détails</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
