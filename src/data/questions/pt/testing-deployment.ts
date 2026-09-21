import type { ExplanationTranslations } from '../../../types/quiz'

export const testingDeploymentPt: ExplanationTranslations = {
  'TD-001': {
    a: 'O preview do builder serve para verificações rápidas e interativas de conversas individuais. Ele não escala para centenas de utterances (frases do usuário), não compara os resultados com valores esperados e, se usado em produção, corre o risco de alterar dados reais.',
    b: 'O Testing Center foi feito para batch testing (testes em lote) em escala, comparando com subagents (topics), actions e respostas esperados. Os testes executam actions reais que podem alterar dados do CRM, por isso a Salesforce recomenda rodá-los em um sandbox.',
    c: 'O Testing Center executa actions reais, então um teste em produção poderia criar ou atualizar registros de Case reais. O lugar recomendado para batch tests é um sandbox.',
    d: 'O Utterance Analysis olha para o uso real depois do lançamento. Ele não valida uma mudança antes de os clientes serem expostos a ela e não tem valores esperados para comparar.',
  },
  'TD-002': {
    a: 'As colunas de expected topic e expected actions precisam conter API names. Labels como "Order Status" não batem com o que o agent realmente selecionou, então as verificações falham mesmo quando o agent se comporta corretamente.',
    b: 'O upload de CSV usando o template de teste disponível para download é uma forma suportada de criar test cases, junto com os test cases gerados por IA.',
    c: 'Desativar o agent não mudaria a forma como os valores esperados são comparados. As falhas vêm do conteúdo do CSV, não do estado de ativação.',
    d: 'Cada coluna de valor esperado é avaliada separadamente. Um valor esperado vazio conta como falha naquela verificação, mas não desliga as verificações de topic e de action.',
  },
  'TD-003': {
    a: 'A resposta esperada é avaliada pelo significado (um LLM compara a resposta real com a esperada), e não pelo texto exato. Escrever uma frase precisa não transforma isso em uma verificação de string exata.',
    b: 'Coherence e completeness são métricas gerais de qualidade. Elas não verificam se um número específico aparece na resposta.',
    c: 'Uma expected action confirma que a action foi executada. Ela não verifica o valor na saída nem se a resposta mostra o valor correto.',
    d: 'Custom evaluations verificam se as respostas ou as saídas das actions contêm strings ou números específicos. Isso cobre a lacuna deixada pela avaliação de resposta baseada em significado.',
  },
  'TD-004': {
    a: 'O upload de CSV com o template disponível para download é uma forma padrão de trazer test cases, com uma utterance mais o subagent, as actions e/ou a resposta esperados.',
    b: 'O Agent Health Monitoring acompanha erros e latência quase em tempo real no tráfego ao vivo. Ele não é uma fonte de test cases para o Testing Center.',
    c: 'O Testing Center pode gerar test cases com IA a partir dos subagents (topics) e actions que você selecionar e de uma descrição do que deve ser testado.',
    d: 'O Utterance Analysis é um dashboard de análise. Não existe sincronização automática dele para o Testing Center.',
    e: 'Debug logs registram a execução de Apex e Flow para solução de problemas. Eles não criam test cases no Testing Center.',
  },
  'TD-005': {
    a: 'Remover o filtro significa que você deixa de testar o agent que vai rodar em produção, e é fácil esquecer de colocá-lo de volta. Em vez disso, os testes devem reproduzir as condições reais.',
    b: 'Instructions não sobrepõem um filtro determinístico, e uma instrução para execuções de teste mudaria o comportamento do agent para os usuários reais.',
    c: 'Os testes do agent podem incluir valores de context variables, para que a sessão se pareça com uma conversa real já verificada. Assim o filtro é atendido e a action pode ser avaliada.',
    d: 'Não existe uma configuração opcional que ignore falhas. Esconder as falhas também esconderia problemas reais no fluxo de cancelamento.',
  },
  'TD-006': {
    a: 'Dados de auditoria descrevem atividades passadas. Eles não executam testes nem impedem que uma mudança ruim seja implantada.',
    b: 'O Agentforce DX gera uma test spec que é armazenada como metadata AiEvaluationDefinition. Os comandos agent test da CLI podem então executá-la em um pipeline.',
    c: 'BotVersion faz parte da definição do agent. Implantá-lo não inicia nenhuma execução de testes.',
    d: 'Testes manuais no preview não podem ser automatizados em um pipeline e não geram resultados repetíveis de aprovado/reprovado em relação a valores esperados.',
  },
  'TD-007': {
    a: 'As configurações do Trust Layer controlam como prompts e respostas são protegidos. Elas não decidem se um agent fica visível depois do deploy.',
    b: 'Agents são compostos de metadata e podem ser implantados com change sets, Metadata API ou Salesforce CLI, DevOps Center ou packages.',
    c: 'Resultados de testes não são obrigatórios para que um agent exista na org de destino. As definições de teste (AiEvaluationDefinition) são metadata opcional.',
    d: 'Bot e BotVersion são o contêiner do agent. Sem eles, os subagents, as actions e o planner chegam, mas não há nenhum agent para exibir.',
  },
  'TD-008': {
    a: 'A ativação não depende de resultados de testes de outra org. Os testes podem ser executados novamente em produção se necessário, mas os resultados não são copiados.',
    b: 'Usuários e atribuições de permission set são específicos de cada org e não são levados pelo deploy de metadata. O agent roda como esse usuário, então o acesso dele precisa ser configurado em produção.',
    c: 'O Trust Layer não bloqueia actions implantadas, e desligar suas proteções enfraqueceria a governança.',
    d: 'Subagents são implantados como metadata GenAiPlugin. Eles não precisam ser recriados manualmente.',
    e: 'O estado de ativação e a publicação em canais não são levados pelo deploy. O agent precisa ser ativado e conectado ao seu canal na org de destino.',
  },
  'TD-009': {
    a: 'Packages, como unlocked ou managed packages, movem metadata entre orgs que não são relacionadas, que é o caso típico de parceiros ou ISVs. A Metadata API ou a CLI também funcionariam, mas change sets não.',
    b: 'Change sets só funcionam entre orgs relacionadas, como uma org de produção e seus sandboxes, ligadas por uma deployment connection. Duas orgs separadas não podem usá-los.',
    c: 'Data kits empacotam configurações do Data 360, como data streams e mapeamentos. Eles não são a ferramenta para implantar agents, actions e flows.',
    d: 'Agents podem ser movidos entre orgs não relacionadas com packages ou ferramentas de deploy de metadata. Recriar tudo manualmente é lento e fácil de errar.',
  },
  'TD-010': {
    a: 'Fazer o deploy de novo não ativa nada. Uma versão publicada que já existe é ignorada no deploy, então uma segunda execução não muda nada.',
    b: 'Uma versão de template ativa (publicada) não pode ser editada diretamente. As mudanças vão para uma nova versão, que depois é ativada.',
    c: 'A menos que a org de destino esteja configurada para ativar templates implantados, uma versão implantada não é ativada automaticamente. Ela precisa ser ativada depois do deploy, assim como na org de origem.',
    d: 'A action já aponta para o template. O problema é qual versão do template está ativa, não a action.',
  },
  'TD-011': {
    a: 'Prompt templates podem ser implantados com change sets, Metadata API ou CLI e packages. A ferramenta não é o problema.',
    b: 'O estado de ativação na org de origem não causa falha no deploy. O que causa é a referência ao modelo que está faltando.',
    c: 'O Trust Layer protege prompts e respostas em tempo de execução. Ele não impede que templates sejam implantados.',
    d: 'Quando um template referencia um modelo personalizado (custom model), a org de destino precisa já ter um modelo com o mesmo nome. Caso contrário, o deploy falha.',
  },
  'TD-012': {
    a: 'Registros de User são dados específicos de cada org, não metadata implantável. O usuário do agent é configurado separadamente em produção.',
    b: 'Os dados de analytics dos testes no sandbox não são dependências do agent. O agent funciona sem eles.',
    c: 'Uma action não pode referenciar um Flow ou uma classe Apex que ainda não esteja na org de destino ou no mesmo deploy. Se estiverem faltando, o deploy falha.',
    d: 'Dados de trace são armazenados como dados para monitoramento. Não são metadata da qual o agent depende.',
    e: 'A action de prompt template depende do template. Ele precisa existir na org de destino ou estar no mesmo deploy, e depois precisa ser ativado.',
  },
}
