// Dados fictícios para testes e desenvolvimento

export const mockUsers = [
  {
    id: 1,
    name: 'João Professor',
    role: 'professor',
    email: 'joao@example.com',
  },
  {
    id: 2,
    name: 'Maria Aluna',
    role: 'aluno',
    email: 'maria@example.com',
  },
  {
    id: 3,
    name: 'Pedro Pai',
    role: 'pai',
    email: 'pedro@example.com',
  },
];

export const mockClasses = [
  {
    id: 1,
    name: '6º Ano A',
    professor: 'João Professor',
    students: 30,
  },
  {
    id: 2,
    name: '6º Ano B',
    professor: 'João Professor',
    students: 28,
  },
];

export const mockActivities = [
  {
    id: 1,
    title: 'Atividade de Matemática',
    description: 'Resolva 10 exercícios de multiplicação',
    dueDate: '2026-02-28',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Leitura de Português',
    description: 'Leia um conto e responda as perguntas',
    dueDate: '2026-03-05',
    status: 'completed',
  },
];
