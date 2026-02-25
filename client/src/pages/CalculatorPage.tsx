import { useNavigate } from 'react-router-dom';
import { BondForm } from '../components/BondForm';
import { useBondCalculatorContext } from '../context/BondCalculatorContext';

export default function CalculatorPage() {
  const { loading, error, calculate } = useBondCalculatorContext();
  const navigate = useNavigate();

  const handleSubmit = async (input: Parameters<typeof calculate>[0]) => {
    const result = await calculate(input);
    if (result) {
      navigate('/results');
    }
  };

  return (
    <div className="mx-auto max-w-xl animate-slide-up">
      <BondForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div className="mt-4 rounded-xl bg-danger-500/10 border border-danger-500/20 p-4 text-danger-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
