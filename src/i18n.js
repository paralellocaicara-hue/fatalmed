export const LANGS = [
  { id: 'pt', label: 'PT', html: 'pt-BR' },
  { id: 'en', label: 'EN', html: 'en' },
  { id: 'es', label: 'ES', html: 'es' },
]

export const UI = {
  pt: {
    gateEyebrow: 'Conteúdo adulto · 18+',
    gateCopy:
      'Acompanhantes top em Ciudad del Este, Foz do Iguaçu e região. Novinhas 18+, caras e safadas. Só maiores.',
    gateEnter: 'Tenho 18 ou mais',
    gateExit: 'Sair',
    navProfiles: 'Meninas',
    navCities: 'Cidades',
    navNotice: 'Aviso',
    heroKicker: 'Tríplice fronteira · BR / PY / AR',
    heroLeadBefore: 'As mais pedidas em',
    heroLeadAfter: 'Preço alto. Contato direto no WhatsApp.',
    metaProfiles: 'online',
    metaUpdated: 'Atualizado hoje',
    searchPlaceholder: 'Buscar nome, cidade…',
    gridTitle: 'Disponíveis agora',
    results: 'resultado',
    resultsPlural: 'resultados',
    empty: 'Nenhuma nessa cidade. Tenta outro filtro.',
    waCta: 'Chamar no WhatsApp',
    waMsg: (name, city) =>
      `Oi, vi a ${name} no FatalMed (${city}). Quero saber se tá livre e o valor.`,
    noticeTitle: 'Antes de chamar',
    noticeItems: [
      'Site 18+. Perfis de demonstração nesta versão.',
      'Valores em dólar, guarani e real — confirme no WhatsApp.',
      'Respeito e discrição. Sem frescura, sem atraso.',
    ],
    hour: '1h',
    footRegion: 'CDE · Foz · Fronteira',
    cities: {
      todas: 'Todas',
      cde: 'Ciudad del Este',
      foz: 'Foz do Iguaçu',
      puerto: 'Puerto Iguazú',
      hernandarias: 'Hernandarias',
    },
  },
  en: {
    gateEyebrow: 'Adult content · 18+',
    gateCopy:
      'Top escorts in Ciudad del Este, Foz do Iguaçu and the border. Hot girls 18+, high rates. Adults only.',
    gateEnter: "I'm 18 or older",
    gateExit: 'Leave',
    navProfiles: 'Girls',
    navCities: 'Cities',
    navNotice: 'Notice',
    heroKicker: 'Triple border · BR / PY / AR',
    heroLeadBefore: 'Most requested in',
    heroLeadAfter: 'Premium rates. Direct WhatsApp.',
    metaProfiles: 'online',
    metaUpdated: 'Updated today',
    searchPlaceholder: 'Search name, city…',
    gridTitle: 'Available now',
    results: 'result',
    resultsPlural: 'results',
    empty: 'None in this city. Try another filter.',
    waCta: 'Message on WhatsApp',
    waMsg: (name, city) =>
      `Hi, I saw ${name} on FatalMed (${city}). Is she free and what's the rate?`,
    noticeTitle: 'Before you message',
    noticeItems: [
      '18+ site. Demo profiles in this version.',
      'Prices in USD, guarani and reais — confirm on WhatsApp.',
      'Respect and discretion.',
    ],
    hour: '1h',
    footRegion: 'CDE · Foz · Border',
    cities: {
      todas: 'All',
      cde: 'Ciudad del Este',
      foz: 'Foz do Iguaçu',
      puerto: 'Puerto Iguazú',
      hernandarias: 'Hernandarias',
    },
  },
  es: {
    gateEyebrow: 'Contenido adulto · 18+',
    gateCopy:
      'Acompañantes top en Ciudad del Este, Foz do Iguaçu y región. Chicas 18+, caras y calientes. Solo mayores.',
    gateEnter: 'Tengo 18 o más',
    gateExit: 'Salir',
    navProfiles: 'Chicas',
    navCities: 'Ciudades',
    navNotice: 'Aviso',
    heroKicker: 'Triple frontera · BR / PY / AR',
    heroLeadBefore: 'Las más pedidas en',
    heroLeadAfter: 'Tarifa alta. WhatsApp directo.',
    metaProfiles: 'online',
    metaUpdated: 'Actualizado hoy',
    searchPlaceholder: 'Buscar nombre, ciudad…',
    gridTitle: 'Disponibles ahora',
    results: 'resultado',
    resultsPlural: 'resultados',
    empty: 'Ninguna en esta ciudad. Prueba otro filtro.',
    waCta: 'Escribir por WhatsApp',
    waMsg: (name, city) =>
      `Hola, vi a ${name} en FatalMed (${city}). ¿Está libre y cuál es el valor?`,
    noticeTitle: 'Antes de escribir',
    noticeItems: [
      'Sitio 18+. Perfiles de demostración en esta versión.',
      'Precios en dólar, guaraní y reales — confirma por WhatsApp.',
      'Respeto y discreción.',
    ],
    hour: '1h',
    footRegion: 'CDE · Foz · Frontera',
    cities: {
      todas: 'Todas',
      cde: 'Ciudad del Este',
      foz: 'Foz do Iguaçu',
      puerto: 'Puerto Iguazú',
      hernandarias: 'Hernandarias',
    },
  },
}

export const CITY_IDS = ['todas', 'cde', 'foz', 'puerto', 'hernandarias']

/** Conversão aproximada pra exibição (USD base) */
export const FX = { brl: 5.6, pyg: 7800 }

export function formatPrices(usd) {
  const brl = Math.round(usd * FX.brl)
  const pyg = Math.round(usd * FX.pyg)
  return {
    usd: `US$ ${usd.toLocaleString('en-US')}`,
    brl: `R$ ${brl.toLocaleString('pt-BR')}`,
    pyg: `₲ ${pyg.toLocaleString('es-PY')}`,
  }
}
