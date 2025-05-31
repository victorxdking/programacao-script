// app/Character.js
export default function Character({ character }) {
    const lifePercentage = (character.health / character.maxHealth) * 100;
  
    return (
      <div className="w-1/3 text-center">
        <img src={character.image} alt={character.name} className="w-32 h-32 mx-auto mb-2" />
        <h2 className="text-xl font-semibold">{character.name}</h2>
        <div className="w-full bg-gray-700 h-5 rounded overflow-hidden mt-2">
          <div
            className="bg-green-500 h-full transition-all duration-300"
            style={{ width: `${lifePercentage}%` }}
          />
        </div>
        <p className="mt-1 text-sm">{character.health} / {character.maxHealth} HP</p>
      </div>
    );
  }
  