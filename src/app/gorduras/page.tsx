import FoodTable from '@/components/custom/FoodTable';

const fatFoods = [
  {
    name: 'Abacate',
    emoji: '🥑',
    portion: '100g',
    nutrient: 15,
    calories: 160
  },
  {
    name: 'Azeite de Oliva',
    emoji: '🫒',
    portion: '1 colher (sopa)',
    nutrient: 14,
    calories: 119
  },
  {
    name: 'Nozes',
    emoji: '🌰',
    portion: '30g',
    nutrient: 20,
    calories: 185
  },
  {
    name: 'Sementes de Chia',
    emoji: '🌾',
    portion: '2 colheres (sopa)',
    nutrient: 9,
    calories: 138
  },
  {
    name: 'Salmão',
    emoji: '🐟',
    portion: '100g',
    nutrient: 13,
    calories: 208
  },
  {
    name: 'Amendoim',
    emoji: '🥜',
    portion: '30g',
    nutrient: 14,
    calories: 166
  },
  {
    name: 'Castanha do Pará',
    emoji: '🌰',
    portion: '30g',
    nutrient: 19,
    calories: 196
  },
  {
    name: 'Óleo de Coco',
    emoji: '🥥',
    portion: '1 colher (sopa)',
    nutrient: 14,
    calories: 121
  }
];

export default function GordurasPage() {
  return (
    <FoodTable
      title="Alimentos Ricos em Gordura Boa"
      nutrientName="Gordura Boa (g)"
      foods={fatFoods}
      color="from-yellow-400 to-yellow-600"
    />
  );
}
