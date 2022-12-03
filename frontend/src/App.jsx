import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Form } from './pages/Form';

import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route exact path='/form' element={<Form />} />
      <Route exact path="/" element={<Navigate to="/form" />} />
      <Route exact path='/main' element={<Main />} />
    </Routes>
  );
}

export default App;
