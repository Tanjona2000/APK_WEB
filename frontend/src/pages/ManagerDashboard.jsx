import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import './ManagerDashboard.css';

export default function ManagerDashboard() {
  const { currentUser, getAllRequests, updateRequestStatus } = useContext(AppContext);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [comment, setComment] = useState('');
  
  const allRequests = getAllRequests();

  if (!currentUser || currentUser.role !== 'manager') {
    return <div style={{ padding: 20 }}>Accès refusé. Connectez-vous en tant que gestionnaire.</div>;
  }

  const handleStatusChange = (requestId) => {
    if (newStatus) {
      updateRequestStatus(requestId, newStatus, comment);
      setSelectedRequest(null);
      setNewStatus('');
      setComment('');
    }
  };

  const getStatusOptions = (currentStatus) => {
    const options = {
      'SUBMITTED': ['IN_PROGRESS', 'REJECTED'],
      'IN_PROGRESS': ['COMPLETED', 'REJECTED'],
      'COMPLETED': [],
      'REJECTED': []
    };
    return options[currentStatus] || [];
  };

  return (
    <Layout>
      <div className="manager-dashboard">
        <h2>Tableau de bord gestionnaire</h2>
        
        {selectedRequest ? (
          <Card title={selectedRequest.title}>
            <div className="manager-detail">
              <div className="detail-section">
                <h4>Informations</h4>
                <div className="info-grid">
                  <div><strong>Type:</strong> {selectedRequest.type}</div>
                  <div><strong>Statut actuel:</strong> <span className={`status status-${selectedRequest.status.toLowerCase()}`}>{selectedRequest.status}</span></div>
                  <div><strong>Créée:</strong> {selectedRequest.createdAt}</div>
                  <div><strong>Description:</strong></div>
                </div>
                <p className="description">{selectedRequest.description}</p>
              </div>

              <div className="detail-section">
                <h4>Changer le statut</h4>
                {getStatusOptions(selectedRequest.status).length > 0 ? (
                  <div>
                    <select 
                      value={newStatus} 
                      onChange={(e) => setNewStatus(e.target.value)}
                      style={{ marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
                    >
                      <option value="">-- Sélectionner un statut --</option>
                      {getStatusOptions(selectedRequest.status).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label>Commentaire (optionnel)</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        rows={4}
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div className="action-buttons">
                      <Button 
                        variant="success" 
                        size="md"
                        onClick={() => handleStatusChange(selectedRequest.id)}
                      >
                        Appliquer le changement
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="md"
                        onClick={() => {
                          setSelectedRequest(null);
                          setNewStatus('');
                          setComment('');
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: '#999' }}>Ce statut ne peut pas être modifié.</p>
                )}
              </div>

              {selectedRequest.comments.length > 0 && (
                <div className="detail-section">
                  <h4>Commentaires</h4>
                  <div className="comments-list">
                    {selectedRequest.comments.map((c, i) => (
                      <div key={i} className="comment-item">
                        <div className="comment-header">
                          <strong>{c.author}</strong>
                          <small>{c.date}</small>
                        </div>
                        <p>{c.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="requests-list">
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Créée</th>
                  <th>Modifiée</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRequests.map((req) => (
                  <tr key={req.id} className="table-row">
                    <td>{req.title}</td>
                    <td><span className={`badge badge-${req.type.toLowerCase()}`}>{req.type}</span></td>
                    <td><span className={`status status-${req.status.toLowerCase()}`}>{req.status}</span></td>
                    <td>{req.createdAt}</td>
                    <td>{req.updatedAt}</td>
                    <td>
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        style={{
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        Traiter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
