import PastelCard from './components/PastelCard';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Comic Sans MS, cursive',
      backgroundColor: '#fcf9e6',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <header style={{
        backgroundColor: '#f7f3c7',
        border: '3px solid #f0e68c',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#555' }}>
          Pastelaria do seu Zé <span style={{ color: '#ff9966' }}>🥟</span>
        </h1>
      </header>

      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem'
      }}>
        <PastelCard sabor="Carne" imagem="/carne.png" preco="10,00" />
        <PastelCard sabor="Pizza" imagem="/pizza.png" preco="10,00" />
        <PastelCard sabor="Carne" imagem="/carne.png" preco="10,00" />
        <PastelCard sabor="Pizza" imagem="/pizza.png" preco="10,00" />
        <PastelCard sabor="Carne" imagem="/carne.png" preco="10,00" />
        <PastelCard sabor="Pizza" imagem="/pizza.png" preco="10,00" />
        <PastelCard sabor="Carne" imagem="/carne.png" preco="10,00" />
        <PastelCard sabor="Pizza" imagem="/pizza.png" preco="10,00" />
      </main>
    </div>
  );
}
