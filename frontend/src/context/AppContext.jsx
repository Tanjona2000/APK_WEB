import { createContext, useState } from 'react';
import mockRequests from '../data/mockRequests';

export const AppContext = createContext();

const mockUsers = [
  { id: 1, fullName: 'Jean Dupont', email: 'jean@uqo.ca', password: 'password123', role: 'user' },
  { id: 2, fullName: 'Marie Martin', email: 'marie@uqo.ca', password: 'password123', role: 'user' }
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState(mockRequests.map((r, i) => ({ ...r, userId: i % 2 === 0 ? 1 : 2 })));
  const [users, setUsers] = useState(mockUsers);

  const login = (email, role = 'user') => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser({ id: user.id, email: user.email, fullName: user.fullName, role });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (fullName, email, password) => {
    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      password,
      role: 'user'
    };
    setUsers([...users, newUser]);
  };

  const validateRequest = (data) => {
    const errors = [];
    
    if (!data.title || !data.title.trim()) {
      errors.push('Le titre est requis');
    } else if (data.title.trim().length < 5) {
      errors.push('Le titre doit contenir au moins 5 caractères');
    } else if (data.title.trim().length > 100) {
      errors.push('Le titre ne doit pas dépasser 100 caractères');
    }
    
    if (!data.description || !data.description.trim()) {
      errors.push('La description est requise');
    } else if (data.description.trim().length < 10) {
      errors.push('La description doit contenir au moins 10 caractères');
    }
    
    if (!data.type) {
      errors.push('Le type de demande est requis');
    } else if (!['INFRASTRUCTURE', 'SOFTWARE', 'HARDWARE', 'OTHER'].includes(data.type)) {
      errors.push('Type de demande invalide');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const createRequest = (newRequest) => {
    const validation = validateRequest(newRequest);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' | '));
    }

    const request = {
      ...newRequest,
      id: Math.max(...requests.map(r => r.id), 0) + 1,
      userId: currentUser?.id,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      comments: [],
      history: [{ status: 'SUBMITTED', date: new Date().toISOString().split('T')[0], author: currentUser?.email }]
    };
    setRequests([...requests, request]);
    return request;
  };

  const updateRequest = (id, updates) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : r
    ));
  };

  const updateRequestStatus = (id, newStatus, comment = null) => {
    setRequests(requests.map(r => {
      if (r.id === id) {
        const updated = { ...r, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] };
        updated.history = [...r.history, { status: newStatus, date: new Date().toISOString().split('T')[0], author: currentUser?.email }];
        if (comment) {
          updated.comments = [...r.comments, { author: currentUser?.email, content: comment, date: new Date().toISOString().split('T')[0] }];
        }
        return updated;
      }
      return r;
    }));
  };

  const getRequest = (id) => requests.find(r => r.id === id);

  const getUserRequests = () => requests.filter(r => r.userId === currentUser?.id);

  const getAllRequests = () => requests;

  return (
    <AppContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      registerUser,
      requests, 
      createRequest, 
      updateRequest, 
      updateRequestStatus,
      getRequest, 
      getUserRequests, 
      getAllRequests,
      validateRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};
