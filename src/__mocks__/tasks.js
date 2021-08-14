import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    address: {
      state: 'Santa Catarina',
      city: 'Nova Trento',
      street: 'Rua Madre Paulina'
    },
    avatarUrl: '',
    createdAt: 1555016400000,
    email: 'pfagundesw@gmail.com',
    name: 'Pablo Fagundes Wachsmann',
    phone: '(47) 98402-1080'
  },
  {
    id: uuid(),
    address: {
      state: 'Santa Catarina',
      city: 'Nova Trento',
      street: 'Rua Madre Paulina'
    },
    avatarUrl: '',
    createdAt: 1555016400000,
    email: 'iago.s@dimyoficial.com',
    name: 'Iago Carlos',
    phone: '(47) 99101-2808'
  },
  {
    id: uuid(),
    address: {
      state: 'Santa Catarina',
      city: 'Brusque',
      street: 'Alguma Rua Do Guarani'
    },
    avatarUrl: '',
    createdAt: 1555016400000,
    email: 'anderson@headssolutions.com.br',
    name: 'Anderson Deichmann',
    phone: '(47) 99196-9360'
  }
];
