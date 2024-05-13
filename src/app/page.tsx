'use client'

import { useState } from 'react';
import axios from 'axios';

const CNPJ: React.FC = () => {
  const [cnpj, setCNPJ] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`);
      setResult(response.data);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Erro ao buscar CNPJ. Por favor, verifique o CNPJ e tente novamente.');
    }
  };

  return (
    <div style={{textAlign: 'center'}} className='App'>
        <h1>Consulta CNPJ (Atividade da faculdade)</h1>
        <h2>Feito com TypeScript & Next.js</h2> <br /><br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCNPJ(e.target.value)}
          placeholder="Digite o CNPJ"
        />
        <button type="submit">Consultar</button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CNPJ;
