import type { ExplanationTranslations } from '../../../types/quiz'

export const governanceObservabilityPt: ExplanationTranslations = {
  'GO-001': {
    a: 'O Agent Analytics mostra totais e tendências de muitas sessões. Ele não mostra as etapas de raciocínio de uma única conversa.',
    b: 'O Health Monitoring foca em erros e latência quase em tempo real. Ele não explica por que o agent escolheu uma action específica.',
    c: 'O Agent Optimization, construído sobre o Session Tracing, dá um trace passo a passo de cada sessão: entradas, escolha do subagent, actions e respostas. É assim que você encontra a causa raiz de uma única decisão errada.',
    d: 'Um toxicity score sinaliza linguagem prejudicial. Ele não diz nada sobre como um subagent ou uma action foi escolhido.',
  },
  'GO-002': {
    a: 'O Agent Analytics oferece dashboards e tendências de KPIs de uso e efetividade ao longo do tempo, como sessões, escalonamentos, abandono e feedback.',
    b: 'O trace do preview mostra uma conversa de teste enquanto você constrói. Ele não fornece tendências do tráfego de produção.',
    c: 'O Testing Center verifica o agent em relação a resultados esperados. Ele não mede o uso real nem o feedback dos clientes.',
    d: 'O Setup Audit Trail registra mudanças de configuração feitas por admins. Ele não acompanha KPIs de conversas.',
  },
  'GO-003': {
    a: 'O Utterance Analysis mostra o que os usuários perguntam e como o agent responde, e é atualizado semanalmente. Ele não foi feito para alertas rápidos.',
    b: 'O Agent Optimization agrupa pedidos parecidos e ajuda a melhorar a qualidade ao longo do tempo. Não é uma ferramenta de alertas quase em tempo real para erros e latência.',
    c: 'Testes agendados usam test cases predefinidos. Eles não observam o tráfego ao vivo em busca de picos repentinos de erros ou latência.',
    d: 'O Agent Health Monitoring acompanha métricas de saúde quase em tempo real, como erros e latência, e gera alertas em picos ou falhas silenciosas.',
  },
  'GO-004': {
    a: 'Os traces são armazenados no Data 360 para análise. A falta de dados se explica pelo momento em que o tracing foi ligado, não por um limite de 24 horas.',
    b: 'O tracing começa a coletar a partir do momento em que é ligado. As conversas anteriores nunca foram registradas, então não podem aparecer.',
    c: 'Fazer o deploy do agent de novo não cria dados de trace para conversas passadas.',
    d: 'O Testing Center executa novas conversas de teste. Ele não reconstrói traces de sessões de produção passadas.',
  },
  'GO-005': {
    a: 'Quando a coleta de auditoria e feedback está habilitada, esses dados são armazenados no Data 360, onde podem alimentar relatórios e dashboards.',
    b: 'Com zero data retention, o provedor do LLM não guarda prompts nem respostas. O audit trail é armazenado na Salesforce, não pelo provedor.',
    c: 'O Setup Audit Trail registra mudanças no Setup. Ele não guarda dados de prompts, respostas ou feedback.',
    d: 'Debug logs são logs temporários para solucionar problemas em código e automações. Não são o armazenamento governado para dados de auditoria e feedback de IA.',
  },
  'GO-006': {
    a: 'O AiEvaluationDefinition guarda definições de teste do Testing Center. Ele não é necessário para coletar traces de sessão.',
    b: 'O Session Tracing grava seu modelo de dados no Data 360, então o Data 360 precisa estar disponível antes que os recursos de observabilidade funcionem.',
    c: 'Debug logs não são a forma de capturar as etapas de raciocínio. O Session Tracing as registra no Data 360.',
    d: 'O Session Tracing é ligado no Setup, em Einstein Audit, Analytics, and Monitoring Setup. Os recursos de analytics e otimização dependem desses dados.',
    e: 'O objetivo do tracing é capturar sessões reais. Desativar os agents significaria que não haveria nada para rastrear.',
  },
  'GO-007': {
    a: 'O dashboard cobre as entradas dos usuários e os tipos de resposta de forma geral, não apenas conversas com feedback negativo.',
    b: 'O Prompt Template Manager controla a criação e edição de prompt templates. Ele não decide quão atualizados estão os dados do dashboard.',
    c: 'O Utterance Analysis é atualizado em uma programação semanal. Ele serve para analisar tendências, não para ver conversas das últimas horas.',
    d: 'O masking protege dados sensíveis enviados ao LLM. Ele não impede que as conversas cheguem ao analytics.',
  },
  'GO-008': {
    a: 'Editar a configuração ao vivo diretamente pula os testes e coloca um comportamento não testado na frente dos clientes.',
    b: 'Um agent duplicado traz configuração de canal duplicada e mais trabalho de governança. O versionamento é a forma nativa de alterar um agent com segurança.',
    c: 'Desativar o agent durante toda a mudança é exatamente a interrupção que a empresa quer evitar.',
    d: 'Uma nova versão pode ser construída e testada enquanto a versão atual continua atendendo os clientes. Só uma versão fica ativa por vez, então ativar a nova faz a troca de forma limpa, e as versões antigas continuam disponíveis.',
  },
  'GO-009': {
    a: 'Excluir remove a configuração e o histórico de que a equipe precisa para investigar e corrigir o problema. Vai muito além do necessário.',
    b: 'Desativar, ou voltar para uma versão anterior, interrompe rapidamente o comportamento ruim e mantém a configuração para a análise de causa raiz.',
    c: 'O Trust Layer não é a causa das respostas erradas sobre garantia, e desligar suas proteções aumentaria o risco.',
    d: 'Esperar uma semana deixa os clientes expostos a informações incorretas. A situação exige ação imediata.',
  },
  'GO-010': {
    a: 'O Agent Optimization agrupa pedidos parecidos e mostra os traces das sessões, para que a equipe veja o padrão e a causa raiz, como descrições de subagents que se sobrepõem.',
    b: 'Uma temperature mais alta deixa a saída mais aleatória, e não o roteamento mais preciso. O roteamento errado se corrige com descrições de subagents mais claras e com menos sobreposição.',
    c: 'Alterar a versão ao vivo sem testar arrisca criar novos problemas. As mudanças devem ir primeiro para uma nova versão.',
    d: 'Desligar o tracing só esconde as evidências e remove os dados necessários para confirmar a correção.',
    e: 'Refinar as descrições de classificação, testar em lote contra os subagents esperados e só então ativar fecha o ciclo com segurança.',
  },
  'GO-011': {
    a: 'O Agent Analytics resume sessões reais ao longo do tempo. Ele não tem dados de um subagent que ainda não foi lançado.',
    b: 'Relatórios de auditoria servem para revisar atividades passadas. Não são a forma rápida e interativa de inspecionar uma conversa de teste durante a construção.',
    c: 'O preview do builder permite testar uma utterance e ver o reasoning trace (rastro do raciocínio), incluindo o subagent escolhido, as actions chamadas e suas entradas e saídas, enquanto você constrói.',
    d: 'O Health Monitoring acompanha erros e latência em todo o tráfego. Ele não mostra o raciocínio de uma única utterance de teste.',
  },
  'GO-012': {
    a: 'Acesso amplo de admin viola o princípio de least privilege (menor privilégio) e poderia expor ou alterar dados que o agent nunca deveria tocar.',
    b: 'Instructions orientam o LLM, mas não são garantidas. Regras sensíveis precisam de controles determinísticos.',
    c: 'O agent roda como o agent user, então permissões de least privilege limitam o que o agent pode ler ou alterar, independentemente do que o LLM decidir.',
    d: 'Os dados de auditoria e feedback são uma fonte essencial de monitoramento. Desligá-los remove a visibilidade da qual a governança depende.',
    e: 'Filters (ou condições no Agent Script) aplicam bloqueios determinísticos, então a action só fica disponível quando as condições forem atendidas.',
  },
}
