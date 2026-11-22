// Estágio de desenvolvimento de cada produto.
// development: em construção | alpha: testes internos | beta: testes com usuários | stable: versão estável
export const STAGES = Object.freeze({
  development: 'Em desenvolvimento',
  alpha: 'Em testes · alpha',
  beta: 'Em testes · beta',
  stable: 'Estável',
});

export const statusLabel = project => `${STAGES[project.stage]} · v${project.version}`;

// Mesmo rótulo em HTML, com a versão fora da caixa-alta.
export const statusHtml = (project, escape) =>
  `${escape(STAGES[project.stage])} · <span class="stage-version">v${escape(project.version)}</span>`;

export const PROJECTS = Object.freeze([
  {
    id: 'databim',
    name: 'dataBIM',
    category: 'BIM e Dados',
    filter: 'bim',
    stage: 'alpha',
    version: '1.0.0',
    icon: 'assets/images/projects/databim/databim-icon.webp',
    screens: [
      {
        src: 'assets/images/projects/databim/screens/databim-analise.webp',
        width: 1600,
        height: 961,
        caption:
          'Análise dataBIM: montagem da entrega com modelos IFC, Design Review meta, análise inteligente e geração de BCF.',
      },
      {
        src: 'assets/images/projects/databim/screens/databim-extrair-ifc.webp',
        width: 1600,
        height: 961,
        caption: 'Extração de dados IFC com parâmetros por fase e disciplina e filtro semântico.',
      },
      {
        src: 'assets/images/projects/databim/screens/databim-dashboard.webp',
        width: 1600,
        height: 961,
        caption: 'Dashboard de avanço dos modelos por meta, fase, unidade e disciplina.',
      },
    ],
    page: 'projects/databim.html',
    accent: 'cyan',
    summary:
      'Plataforma desktop para extrair, verificar, organizar e analisar informações BIM, conectando modelos IFC, regras de qualidade, revisões e dashboards.',
    lead: 'Governança de dados BIM do modelo ao indicador.',
    problem:
      'Dados de modelos IFC costumam chegar fragmentados entre arquivos, planilhas e revisões, dificultando a verificação de parâmetros, a rastreabilidade e a leitura consolidada do avanço do projeto.',
    solution:
      'O dataBIM estabelece um fluxo integrado que extrai informações do IFC, estrutura os dados em Excel, aplica regras de qualidade e avanço, registra revisões em SQLite e consolida os resultados em dashboards.',
    features: [
      'Extração de atributos e parâmetros de modelos IFC',
      'Exportação estruturada para Excel sem sobrescrever a origem',
      'Análise de preenchimento, consistência e conteúdo dos parâmetros',
      'Regras de avanço orientadas por matrizes de projeto',
      'Relatórios de conformidade e itens esperados',
      'Persistência local de modelos, elementos e revisões em SQLite',
      'Comparação de revisões e histórico de alterações',
      'Dashboards com filtros por etapa, disciplina, modelo, revisão e status',
    ],
    architecture:
      'Monólito modular em Python, com limites explícitos entre aplicação, domínio, infraestrutura e interface desktop. Os fluxos de IFC, Excel, matrizes, banco de dados e dashboards permanecem separados por responsabilidades.',
    innovation:
      'Mais do que converter IFC para planilha, o produto mantém um encadeamento verificável entre modelo, requisitos, resultados de análise, histórico e indicadores.',
    tech: ['Python', 'PyQt6', 'IfcOpenShell', 'SQLite', 'pandas', 'openpyxl'],
  },
  {
    id: 'echoiq',
    name: 'EchoIQ',
    category: 'Inteligência Artificial',
    filter: 'ai',
    stage: 'beta',
    version: '0.16.1',
    icon: 'assets/images/projects/echoiq/echoiq-icon.webp',
    screens: [
      {
        src: 'assets/images/projects/echoiq/screens/echoiq-main.webp',
        width: 1282,
        height: 752,
        caption:
          'Tela principal: dados da reunião, dispositivos de áudio, níveis e controle da sessão.',
      },
      {
        src: 'assets/images/projects/echoiq/screens/echoiq-config.webp',
        width: 922,
        height: 682,
        caption:
          'Configurações do modelo de IA local (Qwen via llama.cpp) para processamento offline.',
      },
    ],
    page: 'projects/echoiq.html',
    accent: 'violet',
    summary:
      'Aplicativo para captura e transcrição de reuniões, com processamento local, análise estruturada por IA e geração auditável de resumos e atas.',
    lead: 'Da conversa ao registro técnico auditável.',
    problem:
      'O conteúdo de reuniões técnicas frequentemente se perde entre gravações, anotações incompletas e documentos produzidos manualmente depois do encontro.',
    solution:
      'O EchoIQ captura microfone e áudio do sistema, produz transcrições em tempo real e finais, executa análises locais ou pelo Google Gemini e organiza cada resultado em uma sessão rastreável.',
    features: [
      'Captura simultânea do microfone e do áudio do sistema',
      'Transcrição em tempo real com Sherpa-ONNX',
      'Transcrição final refinada com Faster-Whisper',
      'Análise local com Qwen por meio do llama.cpp',
      'Análise comercial opcional pelo Google Gemini',
      'Geração de resumo técnico e ata de reunião',
      'Manifesto auditável com estados, diagnósticos e artefatos',
      'Instalação separada do aplicativo, modelos e runtimes de IA',
    ],
    architecture:
      'Monólito modular com domínio independente de interface, sistema de arquivos, APIs e motores de IA. Provedores, transcrição, renderização, segurança e sessões são conectados por contratos explícitos.',
    innovation:
      'A IA faz parte de um pipeline controlado. Cada sessão registra o que foi solicitado, executado e produzido, preservando rastreabilidade e revisão humana.',
    tech: [
      'Python',
      'PyQt6',
      'Faster-Whisper',
      'Sherpa-ONNX',
      'Qwen',
      'llama.cpp',
      'Google Gemini',
      'CUDA',
    ],
  },
  {
    id: 'voae',
    name: 'Voaê!',
    category: 'Educação',
    filter: 'education',
    stage: 'development',
    version: '0.21.0',
    icon: 'assets/images/projects/voae/voae-icon.webp',
    page: 'projects/voae.html',
    accent: 'blue',
    screens: [
      {
        src: 'assets/images/projects/voae/screens/voae-home.webp',
        width: 1409,
        height: 862,
        caption: 'Página inicial com atalho para continuar os estudos e visão geral do curso.',
      },
      {
        src: 'assets/images/projects/voae/screens/voae-disciplina.webp',
        width: 1409,
        height: 862,
        caption: 'Mapa curricular da disciplina com progresso salvo no navegador.',
      },
      {
        src: 'assets/images/projects/voae/screens/voae-aula.webp',
        width: 1409,
        height: 862,
        caption: 'Página de aula com índice lateral, metadados e figuras explicativas.',
      },
    ],
    summary:
      'Plataforma web do curso teórico de Piloto Privado de Avião, com aulas autorais organizadas por disciplina e progresso salvo no navegador.',
    lead: 'Formação teórica de Piloto Privado, aula por aula.',
    problem:
      'O conteúdo teórico exigido na banca de Piloto Privado (ANAC) costuma estar espalhado entre vídeos, apostilas e transcrições, sem uma progressão clara e sem verificação técnica consolidada.',
    solution:
      'O Voaê! organiza as cinco disciplinas em um currículo de 108 aulas e publica conteúdo autoral, revisado e alinhado a fontes oficiais, com figuras, questões e acompanhamento de progresso.',
    features: [
      'Cinco disciplinas e 108 aulas mapeadas no currículo',
      'Aulas escritas em MDX com componentes e figuras próprias',
      'Índice lateral e navegação entre aulas e disciplinas',
      'Progresso de estudo salvo localmente no navegador',
      'Banco de questões opcional por aula',
      'Validação automática de todo o conteúdo antes do build',
      'Carregamento sob demanda de cada aula',
      'Política editorial: fontes oficiais prevalecem sobre transcrições',
    ],
    architecture:
      'Aplicação web em React, TypeScript e Vite. O texto fica em dados (JSON e MDX por aula) e o visual em componentes; um registro monta disciplinas e aulas a partir das pastas, e um validador com Zod impede o build quando algum conteúdo foge do formato.',
    innovation:
      'O conteúdo é tratado como dado versionado e validado: criar uma aula é adicionar uma pasta, sem alterar código, o que mantém a consistência editorial à medida que o curso cresce.',
    tech: ['React', 'TypeScript', 'Vite', 'MDX', 'Zod', 'React Router'],
  },
  {
    id: 'fxone-studio',
    name: 'FXone Studio',
    category: 'Áudio e DSP',
    filter: 'audio',
    stage: 'development',
    version: '0.23.0',
    icon: 'assets/images/projects/fxone-studio/fxone-studio-icon.webp',
    screens: [
      {
        src: 'assets/images/projects/fxone-studio/screens/fxone-studio-rig.webp',
        width: 1600,
        height: 1000,
        caption:
          'Tela RIG: biblioteca de equipamentos, pedal ativo na cadeia e medidores de entrada e saída.',
      },
      {
        src: 'assets/images/projects/fxone-studio/screens/fxone-studio-home.webp',
        width: 1280,
        height: 800,
        caption: 'Tela inicial com criação, abertura e lista de projetos recentes.',
      },
    ],
    page: 'projects/fxone-studio.html',
    accent: 'red',
    summary:
      'Ambiente desktop para criação de rigs virtuais, organização visual de equipamentos e processamento de áudio em tempo real.',
    lead: 'Equipamentos virtuais em uma cadeia de áudio extensível.',
    problem:
      'Soluções de áudio precisam equilibrar uma experiência visual intuitiva com processamento em tempo real, persistência de projetos e expansão segura do catálogo de equipamentos.',
    solution:
      'O FXone Studio organiza pedais, amplificadores, caixas e racks como equipamentos manipuláveis, enquanto módulos DSP independentes executam o processamento sem acoplar cada modelo ao núcleo do aplicativo.',
    features: [
      'Criação, abertura e persistência versionada de projetos',
      'Biblioteca visual de equipamentos',
      'Composição de rigs por arrastar e soltar',
      'Categorias para pedais, amplificadores, caixas e racks',
      'Parâmetros definidos por manifestos de equipamento',
      'Seleção de dispositivos e medidores de áudio',
      'Cadeia de processamento em tempo real',
      'Módulos DSP independentes e extensíveis',
      'Fundação preparada para gravação e novos equipamentos',
    ],
    architecture:
      'Aplicação C++20 baseada em JUCE e CMake, organizada como monólito modular. Bundles reúnem manifesto, arte, presets e binário DSP, enquanto a cadeia de áudio em tempo real utiliza snapshots preparados fora do callback crítico.',
    innovation:
      'Novos equipamentos podem evoluir como bundles autônomos. O host permanece genérico e a thread de áudio não depende de interface, arquivos ou renderização.',
    tech: ['C++20', 'JUCE', 'CMake', 'DSP', 'MSVC', 'JSON'],
  },
  {
    id: 'fxone-tracks',
    name: 'FXone Tracks',
    category: 'Áudio e DSP',
    filter: 'audio',
    stage: 'beta',
    version: '1.0.0-beta.1',
    icon: 'assets/images/projects/fxone-tracks/fxone-tracks-icon.webp',
    page: 'projects/fxone-tracks.html',
    accent: 'red',
    screens: [
      {
        src: 'assets/images/projects/fxone-tracks/screens/fxone-tracks-mixer.webp',
        width: 1280,
        height: 800,
        caption: 'Mixer multifaixa com as seis faixas separadas, canal Master e transporte.',
      },
    ],
    summary:
      'Aplicativo desktop que separa músicas em faixas individuais com inteligência artificial e as reúne em um mixer multifaixa em tempo real.',
    lead: 'Separação de faixas e mixagem para estudo musical.',
    problem:
      'Para estudar, tirar uma música ou ensaiar, músicos precisam isolar ou silenciar instrumentos de uma gravação pronta, algo que normalmente exige ferramentas profissionais e etapas manuais.',
    solution:
      'O FXone Tracks importa o áudio, separa vocais, guitarra, baixo, bateria, teclados e demais sons com o Demucs e abre o resultado em um mixer com volume, mute e solo por faixa, além da exportação da mixagem.',
    features: [
      'Separação em seis faixas: vocais, guitarra, baixo, bateria, teclados e outros',
      'Modelo de separação Demucs executado localmente com PyTorch',
      'Mixer multifaixa com volume, mute e solo por faixa',
      'Canal Master com medidor e indicador de clipping',
      'Reprodução em tempo real com transporte e linha do tempo',
      'Exportação da mixagem renderizada',
      'Biblioteca de mixers recentes',
      'Processamento em segundo plano, cancelável e sem travar a interface',
    ],
    architecture:
      'Aplicativo desktop em Python e PyQt5. Importação e separação rodam em workers fora da thread principal, com cancelamento e tratamento de erros dedicado; o motor de mixagem em tempo real e a renderização para exportação são componentes independentes.',
    innovation:
      'Transforma um modelo de IA de pesquisa em uma ferramenta de prática musical: a separação acontece no próprio computador e o resultado já chega como um mixer pronto para uso.',
    tech: ['Python', 'PyQt5', 'Demucs', 'PyTorch', 'NumPy', 'sounddevice'],
  },
  {
    id: 'vstick',
    name: 'vStick',
    category: 'Simulação',
    filter: 'simulation',
    stage: 'stable',
    version: '1.0.0',
    icon: 'assets/images/projects/vstick/vstick-icon.webp',
    screens: [
      {
        src: 'assets/images/projects/vstick/screens/vstick-main.webp',
        width: 326,
        height: 531,
        caption: 'Painel de controle: ativação, monitor, suavização e opções de eixos.',
      },
    ],
    page: 'projects/vstick.html',
    accent: 'purple',
    summary:
      'Aplicativo que transforma o movimento do mouse em dois eixos analógicos de um joystick virtual para simuladores de voo.',
    lead: 'Controle analógico acessível a partir do mouse.',
    problem:
      'O mouse oferece precisão e ampla disponibilidade, mas simuladores esperam eixos analógicos contínuos fornecidos por um dispositivo de joystick reconhecido pelo Windows.',
    solution:
      'O vStick converte a posição do mouse em comandos X e Y, utiliza o vJoy como dispositivo virtual e acrescenta controles de ativação, suavização, inversão e retorno seguro à última posição.',
    features: [
      'Controle dos eixos X e Y pela posição do mouse',
      'Tecla global para ativar ou desativar o controle',
      'Seleção do monitor usado como área de comando',
      'Overlay de centro, estado e posição atual',
      'Exibição opcional dos valores normalizados dos eixos',
      'Suavização configurável do movimento',
      'Restauração da última posição comandada',
      'Inversão independente dos eixos',
      'Configuração persistente, logs e diagnóstico',
      'Empacotamento como executável para Windows',
    ],
    architecture:
      'Aplicativo desktop Windows em Python e PyQt6, estruturado como monólito modular. A apresentação, as regras de mapeamento, a configuração e os adaptadores de mouse, monitor, teclado e vJoy possuem responsabilidades separadas e testáveis.',
    innovation:
      'O produto combina o mapeamento do mouse com comportamento operacional seguro, incluindo estado global, suavização, múltiplos monitores, persistência e diagnóstico.',
    tech: ['Python', 'PyQt6', 'vJoy', 'pynput', 'PyInstaller'],
  },
]);
