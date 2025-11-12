import FoodTable from '@/components/custom/FoodTable';

const proteinFoods = [
  {
    name: 'Frango (Peito)',
    emoji: '🍗',
    portion: '100g',
    nutrient: 31,
    calories: 165
  },
  {
    name: 'Salmão',
    emoji: '🐟',
    portion: '100g',
    nutrient: 25,
    calories: 208
  },
  {
    name: 'Ovos',
    emoji: '🥚',
    portion: '2 unidades',
    nutrient: 13,
    calories: 155
  },
  {
    name: 'Iogurte Grego',
    emoji: '🥛',
    portion: '170g',
    nutrient: 17,
    calories: 100
  },
  {
    name: 'Lentilhas',
    emoji: '🫘',
    portion: '100g (cozida)',
    nutrient: 9,
    calories: 116
  },
  {
    name: 'Atum',
    emoji: '🐟',
    portion: '100g',
    nutrient: 30,
    calories: 132
  },
  {
    name: 'Tofu',
    emoji: '🧈',
    portion: '100g',
    nutrient: 8,
    calories: 76
  },
  {
    name: 'Queijo Cottage',
    emoji: '🧀',
    portion: '100g',
    nutrient: 11,
    calories: 98
  }
];

export default function ProteinasPage() {
  return (
    <FoodTable
      title="Alimentos Ricos em Proteína"
      nutrientName="Proteína (g)"
      foods={proteinFoods}
      color="from-red-400 to-red-600"
    />
  );
}
