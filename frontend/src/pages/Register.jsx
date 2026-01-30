import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Card from '../components/Card';
import './Register.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { currentUser, registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  if (currentUser) {
    navigate('/dashboard');
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) newErrors.fullName = 'Le nom complet est requis';
    if (!email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email invalide';
    
    if (!password) newErrors.password = 'Le mot de passe est requis';
    else if (password.length < 6) newErrors.password = 'Minimum 6 caractères';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Confirmation requise';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerUser(fullName, email, password);
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h1>UQO-Requests</h1>
          <p>Créer un compte</p>
        </div>
        <Card title="Inscription">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName">Nom complet *</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse email *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@uqo.ca"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe *</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 caractères"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
            <Button type="submit" variant="primary" size="lg">
              S'inscrire
            </Button>
          </form>
          <p className="login-link">
            Déjà inscrit? <a href="/login">Se connecter</a>
          </p>
        </Card>
      </div>
    </div>
  );
}
