import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validação rigorosa - não criar cliente com valores inválidos
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('❌ Supabase não configurado. Configure as variáveis de ambiente.');
  }
  throw new Error('Supabase não configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nas variáveis de ambiente.');
}

// Validação adicional - verificar se não são valores placeholder
if (supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
  throw new Error('Supabase configurado com valores placeholder. Use suas credenciais reais do Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
