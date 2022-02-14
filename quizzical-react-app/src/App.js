import './App.scss';
import QuizPage from './components/QuizPage/QuizPage';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="quizzical" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
