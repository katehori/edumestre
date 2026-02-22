// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas existentes
import Login from './pages/Login';
import DashboardProfessor from './pages/Professor/DashboardProfessor';
import Turmas from './pages/Professor/Turmas';
import TurmaDetalhes from './pages/Professor/TurmaDetalhes';
import TurmasProfessores from './pages/Professor/TurmasProfessores';
import Publicacoes from './pages/Professor/Publicacoes';
import Atividades from './pages/Professor/Atividades';
import CalendarioProfessor from './pages/Professor/Calendario';
import PerfilProfessor from './pages/Professor/PerfilProfessor'; // NOVA

import DashboardAluno from './pages/Aluno/DashboardAluno';
import MinhasTurmas from './pages/Aluno/MinhasTurmas';
import TurmaDetalhesAluno from './pages/Aluno/TurmaDetalhesAluno';
import PublicacoesAluno from './pages/Aluno/PublicacoesAluno';
import AtividadesAluno from './pages/Aluno/AtividadesAluno';
import AtividadeDetalhes from './pages/Aluno/AtividadeDetalhes';
import CalendarioAluno from './pages/Aluno/CalendarioAluno';
import RankingAluno from './pages/Aluno/RankingAluno';
import ConquistasAluno from './pages/Aluno/ConquistasAluno';
import PerfilAluno from './pages/Aluno/PerfilAluno'; // NOVA

import DashboardPai from './pages/Pai/DashboardPai';
import PublicacoesPai from './pages/Pai/PublicacoesPai';
import AtividadesPai from './pages/Pai/AtividadesPai';
import CalendarioPai from './pages/Pai/CalendarioPai';
import DesempenhoPai from './pages/Pai/DesempenhoPai';
import PerfilPai from './pages/Pai/PerfilPai'; // NOVA

// Cadastros
import ProfessorCadastro from './pages/Cadastro/ProfessorCadastro';
import AlunoCadastro from './pages/Cadastro/AlunoCadastro';
import ResponsavelCadastro from './pages/Cadastro/ResponsavelCadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Professor */}
        <Route path="/professor" element={<DashboardProfessor />} />
        <Route path="/professor/turmas" element={<Turmas />} />
        <Route path="/professor/turma/:id" element={<TurmaDetalhes />} />
        <Route path="/professor/comunidade" element={<TurmasProfessores />} />
        <Route path="/professor/publicacoes" element={<Publicacoes />} />
        <Route path="/professor/atividades" element={<Atividades />} />
        <Route path="/professor/calendario" element={<CalendarioProfessor />} />
        <Route path="/professor/perfil" element={<PerfilProfessor />} /> {/* NOVA */}
        
        {/* Aluno */}
        <Route path="/aluno" element={<DashboardAluno />} />
        <Route path="/aluno/turmas" element={<MinhasTurmas />} />
        <Route path="/aluno/turma/:id" element={<TurmaDetalhesAluno />} />
        <Route path="/aluno/publicacoes" element={<PublicacoesAluno />} />
        <Route path="/aluno/atividades" element={<AtividadesAluno />} />
        <Route path="/aluno/atividade/:id" element={<AtividadeDetalhes />} />
        <Route path="/aluno/atividade/:id/entregar" element={<AtividadeDetalhes />} />
        <Route path="/aluno/calendario" element={<CalendarioAluno />} />
        <Route path="/aluno/ranking" element={<RankingAluno />} />
        <Route path="/aluno/conquistas" element={<ConquistasAluno />} />
        <Route path="/aluno/perfil" element={<PerfilAluno />} /> {/* NOVA */}
        
        {/* Pai */}
        <Route path="/pai" element={<DashboardPai />} />
        <Route path="/pai/publicacoes" element={<PublicacoesPai />} />
        <Route path="/pai/atividades" element={<AtividadesPai />} />
        <Route path="/pai/calendario" element={<CalendarioPai />} />
        <Route path="/pai/desempenho" element={<DesempenhoPai />} />
        <Route path="/pai/perfil" element={<PerfilPai />} /> {/* NOVA */}
        
        {/* Cadastros */}
        <Route path="/cadastro/professor" element={<ProfessorCadastro />} />
        <Route path="/cadastro/aluno" element={<AlunoCadastro />} />
        <Route path="/cadastro/responsavel" element={<ResponsavelCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;