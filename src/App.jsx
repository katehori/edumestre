import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardProfessor from './pages/Professor/DashboardProfessor';
import DashboardAluno from './pages/Aluno/DashboardAluno';
import DashboardPai from './pages/Pai/DashboardPai';
import Turmas from './pages/Professor/Turmas';
import Publicacoes from './pages/Professor/Publicacoes';
import Atividades from './pages/Professor/Atividades';
import MinhasTurmas from './pages/Aluno/MinhasTurmas';
import Acompanhamento from './pages/Pai/Acompanhamento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/professor" element={<DashboardProfessor />} />
        <Route path="/professor/turmas" element={<Turmas />} />
        <Route path="/professor/publicacoes" element={<Publicacoes />} />
        <Route path="/professor/atividades" element={<Atividades />} />
        <Route path="/aluno" element={<DashboardAluno />} />
        <Route path="/aluno/turmas" element={<MinhasTurmas />} />
        <Route path="/pai" element={<DashboardPai />} />
        <Route path="/pai/filho/:id" element={<Acompanhamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;