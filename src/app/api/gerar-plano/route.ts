import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Obter usuário autenticado
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Construir o prompt detalhado para a IA
    const prompt = `
Crie um plano alimentar detalhado para 26 semanas (6 meses) com todas as refeições diárias para o objetivo selecionado pelo usuário. Siga as instruções e o formato de saída exatamente.

**DADOS DO USUÁRIO:**

Objetivo principal: ${formData.objetivo}
Início do plano: ${formData.inicioPlano}
Sexo: ${formData.sexo} | Idade: ${formData.idade} anos | Altura: ${formData.altura} cm | Peso: ${formData.peso} kg | % de gordura: ${formData.gordura || 'não informado'}
Nível de atividade (NEAT): ${formData.nivelAtividade}
Treinos por semana / tipo: ${formData.treinos || 'não informado'}
Restrições/alergias: ${formData.restricoes || 'nenhuma'}
Preferências: ${formData.preferencias || 'nenhuma'}
Orçamento diário aproximado: R$ ${formData.orcamento || 'não especificado'}
Tempo disponível para cozinhar por dia: ${formData.tempoCozinha || 'não especificado'} min
Equipamentos/cozinha disponíveis: ${formData.equipamentos || 'equipamentos básicos'}
Localidade/país: ${formData.localidade || 'Brasil'}
Dados clínicos relevantes e medicamentos: ${formData.dadosClinicos || 'nenhum'}
Horários de refeições preferidos: ${formData.horarios || 'horários flexíveis'}

**REGRAS DE CÁLCULO E NUTRIÇÃO:**

**Calorias e macros:**

Calcule TMB usando a fórmula de Mifflin-St Jeor e TDEE baseado no nível de atividade:
- TMB Homem = (10 × peso em kg) + (6,25 × altura em cm) - (5 × idade em anos) + 5
- TMB Mulher = (10 × peso em kg) + (6,25 × altura em cm) - (5 × idade em anos) - 161
- TDEE = TMB × fator de atividade (sedentário: 1.2, leve: 1.375, moderado: 1.55, alto: 1.725)

Defina metas baseadas no objetivo:
- Emagrecimento: déficit de 15%; proteína 2,0 g/kg, gordura 0,8 g/kg, resto em carboidratos
- Melhora da saúde: calorias de manutenção; proteína 1,6 g/kg; fibras 30 g/dia; sódio ≤ 2.000 mg/dia
- Ganho de massa muscular: superávit 10%; proteína 2,2 g/kg; carbo alto, gordura 0,8 g/kg

Distribuição diária: 5–6 refeições (café da manhã, lanche manhã, almoço, lanche tarde, jantar, ceia).

Pós e pré-treino: inclua 30 g de proteína e 0,8 g/kg de carboidratos ao redor do treino.

Hidratação: 35 ml/kg/dia.

Qualidade: alimentos in natura / minimamente processados, variedade de frutas, legumes, verduras e fontes proteicas.

Sazonalidade: priorize itens da estação e comuns no Brasil.

**ESTRUTURA DO PLANO:**

Retorne um JSON com a seguinte estrutura:

{
  "resumo": {
    "tmb": número,
    "tdee": número,
    "calorias": número (meta diária),
    "proteinas": número (gramas),
    "carboidratos": número (gramas),
    "gorduras": número (gramas),
    "hidratacao": número (ml)
  },
  "guiaUso": {
    "batchCooking": "texto explicativo sobre batch cooking",
    "armazenamento": "dicas de armazenamento",
    "aquecimento": "dicas de aquecimento"
  },
  "semanas": [
    {
      "numero": 1,
      "dias": [
        {
          "diaSemana": "Segunda-feira",
          "refeicoes": [
            {
              "tipo": "Café da manhã",
              "prato": "Nome do prato",
              "porcao": "quantidade",
              "preparo": "instruções breves",
              "tempo": "10 min",
              "kcal": número,
              "proteinas": número,
              "carboidratos": número,
              "gorduras": número
            }
          ],
          "totalKcal": número,
          "totalProteinas": número,
          "totalCarboidratos": número,
          "totalGorduras": número
        }
      ],
      "listaCompras": {
        "hortifruti": ["item 1", "item 2"],
        "proteinas": ["item 1", "item 2"],
        "laticínios": ["item 1", "item 2"],
        "grãos": ["item 1", "item 2"],
        "mercearia": ["item 1", "item 2"]
      },
      "batchCooking": ["preparo 1", "preparo 2"],
      "custoEstimado": "R$ XX,XX",
      "ajustes": "Como ajustar calorias se necessário"
    }
  ],
  "checkIns": [
    {
      "semana": 2,
      "criterios": ["peso", "medidas", "energia"],
      "ajustes": "orientações de ajuste"
    }
  ],
  "suplementacao": {
    "recomendacoes": ["suplemento 1", "suplemento 2"],
    "aviso": "Consulte profissional de saúde"
  },
  "notasSeguranca": "Texto de aviso importante"
}

Gere o plano COMPLETO com todas as 26 semanas, variando os alimentos e mantendo a qualidade nutricional.
`;

    // Chamar a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista especializado em criar planos alimentares detalhados e personalizados. Sempre retorne respostas em formato JSON estruturado válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const planoGerado = completion.choices[0].message.content;

    // Salvar no Supabase
    const { data: planoData, error } = await supabase
      .from('planos_alimentares')
      .insert({
        user_id: user.id,
        dados_usuario: formData,
        plano_completo: JSON.parse(planoGerado || '{}'),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar no Supabase:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      planoId: planoData.id,
      plano: JSON.parse(planoGerado || '{}'),
    });

  } catch (error) {
    console.error('Erro ao gerar plano:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar plano alimentar' },
      { status: 500 }
    );
  }
}
