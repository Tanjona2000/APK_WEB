import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Card from '../components/Card';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, role);
      setError('');
      navigate(role === 'manager' ? '/manager' : '/dashboard');
    } else {
      setError('Email et mot de passe requis');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>UQO-Requests</h1>
          <p>Système de gestion de demandes</p>
        </div>
        <Card title="Connexion">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@uqo.ca"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Utilisateur</option>
                <option value="manager">Gestionnaire</option>
              </select>
            </div>
            {error && <div style={{ color: '#dc3545', fontSize: '14px', fontWeight: 500 }}>{error}</div>}
            <Button type="submit" variant="primary" size="lg">
              Se connecter
            </Button>
          </form>
          <p className="signup-link">
            Pas de compte? <a href="/register">S'inscrire</a>
          </p>
          <div style={{ marginTop: 20, padding: 12, backgroundColor: '#e7f3ff', borderRadius: 4, fontSize: 12, color: '#004085' }}>
            <strong>Comptes de test :</strong><br/>
            jean@uqo.ca / password123<br/>
            marie@uqo.ca / password123
          </div>
        </Card>
      </div>
    </div>
  );
}
