import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { SingIn } from './pages/SingIn';
import { SingUp } from './pages/SingUp';
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route exact path='/signin' element={<SingIn />} />
      <Route exact path="/" element={<Navigate to="/signin" />} />
      <Route exact path='/signup' element={<SingUp />} />
      <Route exact path='/main' element={<Main />} />
    </Routes>
  );
}

export default App;
