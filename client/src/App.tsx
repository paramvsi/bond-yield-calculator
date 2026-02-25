import { Routes, Route } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-5xl text-center mb-10 animate-fade-in">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Bond Yield Calculator
        </h1>
        <p className="mt-3 text-text-secondary text-lg">
          Calculate current yield, YTM, and cash flow schedules
        </p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
    </div>
  );
}
