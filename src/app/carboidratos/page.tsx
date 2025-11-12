import FoodTable from '@/components/custom/FoodTable';

const carbFoods = [
  {
    name: 'Batata Doce',
    emoji: '🍠',
    portion: '100g',
    nutrient: 20,
    calories: 86
  },
  {
    name: 'Arroz Integral',
    emoji: '🍚',
    portion: '100g (cozido)',
    nutrient: 23,
    calories: 111
  },
  {
    name: 'Banana',
    emoji: '🍌',
    portion: '1 unidade média',
    nutrient: 27,
    calories: 105
  },
  {
    name: 'Quinoa',
    emoji: '🌾',
    portion: '100g (cozida)',
    nutrient: 21,
    calories: 120
  },
  {
    name: 'Pão Integral',
    emoji: '🍞',
    portion: '2 fatias',
    nutrient: 24,
    calories: 138
  },
  {
    name: 'Macarrão Integral',
    emoji: '🍝',
    portion: '100g (cozido)',
    nutrient: 26,
    calories: 124
  },
  {
    name: 'Mandioca',
    emoji: '🥔',
    portion: '100g',
    nutrient: 38,
    calories: 160
  },
  {
    name: 'Granola',
    emoji: '🥣',
    portion: '50g',
    nutrient: 32,
    calories: 223
  }
];

export default function CarboidratosPage() {
  return (
    <FoodTable
      title="Alimentos Ricos em Carboidratos"
      nutrientName="Carboidrato (g)"
      foods={carbFoods}
      color="from-amber-400 to-amber-600"
    />
  );
}
