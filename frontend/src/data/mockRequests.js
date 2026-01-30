const mockRequests = [
  {
    id: 1,
    title: 'Accès réseau étagé 4',
    description: 'Installation d\'un port Ethernet supplémentaire',
    type: 'INFRASTRUCTURE',
    status: 'SUBMITTED',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    comments: [],
    history: [{ status: 'SUBMITTED', date: '2024-01-15', author: 'System' }]
  },
  {
    id: 2,
    title: 'Licence VS Code Enterprise',
    description: 'Renouvellement de licence pour 10 développeurs',
    type: 'SOFTWARE',
    status: 'IN_PROGRESS',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20',
    comments: [
      { author: 'Gestionnaire', content: 'Validation en cours', date: '2024-01-20' }
    ],
    history: [
      { status: 'SUBMITTED', date: '2024-01-10', author: 'System' },
      { status: 'IN_PROGRESS', date: '2024-01-20', author: 'Gestionnaire' }
    ]
  },
  {
    id: 3,
    title: 'Remplacement écran 27 pouces',
    description: 'Bureau 305 - écran défectueux',
    type: 'HARDWARE',
    status: 'COMPLETED',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18',
    comments: [
      { author: 'Gestionnaire', content: 'Commande passée', date: '2024-01-15' },
      { author: 'Gestionnaire', content: 'Reçu et installé', date: '2024-01-18' }
    ],
    history: [
      { status: 'SUBMITTED', date: '2024-01-05', author: 'System' },
      { status: 'IN_PROGRESS', date: '2024-01-15', author: 'Gestionnaire' },
      { status: 'COMPLETED', date: '2024-01-18', author: 'Gestionnaire' }
    ]
  }
];

export default mockRequests;
