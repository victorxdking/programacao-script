'use client'

export default function PastelCard({ sabor, imagem, preco }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h3>{sabor}</h3>
      <img src={imagem} alt={`Pastel de ${sabor}`} style={{ width: '60px', margin: '0.5rem auto' }} />
      <p>R$: {preco}</p>
    </div>
  );
}
