import FoodTable from '@/components/custom/FoodTable';

const fiberFoods = [
  {
    name: 'Aveia',
    emoji: '🥣',
    portion: '100g',
    nutrient: 10,
    calories: 389
  },
  {
    name: 'Brócolis',
    emoji: '🥦',
    portion: '100g',
    nutrient: 2.6,
    calories: 34
  },
  {
    name: 'Maçã',
    emoji: '🍎',
    portion: '1 unidade média',
    nutrient: 4.4,
    calories: 95
  },
  {
    name: 'Feijão Preto',
    emoji: '🫘',
    portion: '100g (cozido)',
    nutrient: 8.7,
    calories: 132
  },
  {
    name: 'Amêndoas',
    emoji: '🌰',
    portion: '30g',
    nutrient: 3.5,
    calories: 170
  },
  {
    name: 'Pera',
    emoji: '🍐',
    portion: '1 unidade média',
    nutrient: 5.5,
    calories: 101
  },
  {
    name: 'Cenoura',
    emoji: '🥕',
    portion: '100g',
    nutrient: 2.8,
    calories: 41
  },
  {
    name: 'Chia',
    emoji: '🌾',
    portion: '2 colheres (sopa)',
    nutrient: 10,
    calories: 138
  }
];

export default function FibrasPage() {
  return (
    <FoodTable
      title="Alimentos Ricos em Fibra"
      nutrientName="Fibra (g)"
      foods={fiberFoods}
      color="from-green-400 to-green-600"
    />
  );
}
