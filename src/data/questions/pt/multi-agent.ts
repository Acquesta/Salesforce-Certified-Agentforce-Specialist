import type { ExplanationTranslations } from '../../../types/quiz'

export const multiAgentPt: ExplanationTranslations = {
  'MA-001': {
    a: 'Mover as actions para o agent principal desfaz o design de especialistas e deixa o agent principal mais pesado, sem corrigir o motivo do handoff (repasse) errado.',
    b: 'Juntar os agents pode esconder o sintoma, mas descarta uma separação que pode ser proposital. O primeiro passo é deixar claros os critérios de handoff.',
    c: 'Uma temperature mais alta deixa as escolhas mais aleatórias, o que tornaria os handoffs menos confiáveis, e não mais.',
    d: 'O agent principal escolhe um especialista com base na descrição, nas instructions e nas capacidades dele. Descrições claras e com limites definidos ("cuida de devoluções, não de status de envio") reduzem a sobreposição e corrigem o handoff.',
  },
  'MA-002': {
    a: 'O A2A serve para um agent repassar tarefas a outro agent. Aqui o agent precisa usar ferramentas e dados, não conversar com outro agent.',
    b: 'O MCP é o padrão aberto para conectar agents a tools, resources e prompts expostos por MCP servers. O Agentforce pode atuar como MCP client, então essas tools ficam disponíveis para o agent.',
    c: 'A Agent API permite que um app externo converse com um agent do Agentforce. Ela funciona no sentido oposto e não é um padrão aberto para dar tools a um agent.',
    d: 'Platform Events são um recurso de mensageria de eventos da Salesforce. Não são um padrão aberto de agents para descobrir e chamar tools.',
  },
  'MA-003': {
    a: 'O A2A é o padrão aberto para que agents de plataformas diferentes conversem entre si. O agent remoto anuncia suas skills em um Agent Card, e o agent cliente envia tarefas a ele e recebe os resultados de volta.',
    b: 'O MCP conecta um agent a tools e dados. Repassar uma tarefa com estado (stateful) para outro agent independente é exatamente para o que o A2A foi projetado.',
    c: 'A Agent API permite que apps externos conversem com um agent do Agentforce. Ela não permite que o Service agent repasse tarefas para um agent de terceiros.',
    d: 'O AgentExchange é um marketplace para encontrar componentes de parceiros. Ele não fornece um protocolo para conversar com um agent que roda em outra plataforma.',
  },
  'MA-004': {
    a: 'Um caso de uso pequeno em um único domínio é mais bem atendido por um só agent. Adicionar mais agents só aumenta latência, custo e complexidade.',
    b: 'Responsabilidade clara por domínio e necessidades de segurança diferentes são motivos fortes para usar agents especialistas separados, com um agent principal na frente.',
    c: 'Uma única integração extra pode ser adicionada como action (ou via MCP) no agent existente. Isso não justifica outro agent.',
    d: 'Repassar trabalho entre agents adiciona etapas e geralmente mais latência. Velocidade, sozinha, não é motivo para adotar múltiplos agents.',
    e: 'Quando capacidades demais e sobrepostas prejudicam o roteamento em um único agent, dividi-las em agents especialistas e focados pode recuperar a precisão.',
  },
  'MA-005': {
    a: 'O A2A serve para conversar com outro agent. O assistente externo precisa de acesso a tools e dados, e é isso que o MCP oferece.',
    b: 'A Agent API permite que o assistente converse com um agent do Agentforce. Ela não expõe dados e Flows da Salesforce como MCP tools.',
    c: 'Os Salesforce Hosted MCP Servers expõem capacidades da Salesforce, como dados, Flows e Apex, como MCP tools que MCP clients externos podem usar, com a Salesforce hospedando e protegendo o servidor.',
    d: 'Componentes do AgentExchange são instalados em orgs Salesforce. Um prompt template não daria a um assistente externo acesso a dados ou Flows da Salesforce.',
  },
  'MA-006': {
    a: 'O Testing Center executa batch tests em agents. Não é um lugar para encontrar componentes de parceiros.',
    b: 'O A2A é um padrão de comunicação entre agents, não um marketplace da Salesforce para actions e templates instaláveis.',
    c: 'O AgentExchange é o marketplace da Salesforce para componentes do Agentforce criados por parceiros, como actions, templates de subagent e de prompt, e integrações com MCP servers.',
    d: 'O Agent Analytics gera relatórios sobre o desempenho dos agents. Ele não oferece componentes para instalar.',
  },
}
