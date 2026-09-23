import type { Question } from '../../types/quiz'

const ADL_HELP = 'https://help.salesforce.com/s/articleView?id=ai.data_library_parent.htm&language=en_US&type=5'
const ADL_TRAILHEAD =
  'https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent'
const INDEX_TYPES =
  'https://trailhead.salesforce.com/content/learn/modules/search-index-types-data-cloud-quick-look/get-to-know-search-index-types-in-data-cloud'
const HYBRID = 'https://trailhead.salesforce.com/content/learn/modules/hybrid-search-for-rag-quick-look/optimize-hybrid-search-results-for-rag'
const CHUNKING = 'https://www.salesforce.com/blog/from-documents-to-context-designing-effective-chunking-in-data-360/'
const RETRIEVERS = 'https://help.salesforce.com/s/articleView?id=data.c360_a_ai_retriever_about.htm&language=en_US&type=5'
const GROUNDING =
  'https://trailhead.salesforce.com/content/learn/modules/grounding-an-agent-with-data/review-options-to-ground-an-agent-with-data'
const DC_AGENTFORCE = 'https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce'
const SEARCH_INDEX_PROJECT =
  'https://trailhead.salesforce.com/content/learn/projects/unstructured-data-in-data-cloud/create-a-search-index-configuration'

export const data360Questions: Question[] = [
  {
    id: 'DC-001',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers (UC) has a set of PDF product manuals and wants its Agentforce Service Agent to answer customer questions from them. The team has little Data 360 experience and wants the quickest setup with the least manual configuration. What should the Agentforce Specialist do?',
    options: [
      {
        id: 'a',
        text: 'Create a data stream, map it to a DMO, build a vector search index, and then create a custom retriever',
        explanation:
          'This manual pipeline works, but it takes the most effort. Agentforce Data Library performs these steps automatically, so it is not the quickest option.',
      },
      {
        id: 'b',
        text: 'Create an Agentforce Data Library, upload the PDF manuals, and assign the library to the agent',
        explanation:
          'Agentforce Data Library is the fastest way to ground an agent in unstructured content. On save it sets up the data stream, data objects, search index, and retriever for you.',
      },
      {
        id: 'c',
        text: 'Paste the text of the manuals into the instructions of a flex prompt template used by the agent',
        explanation:
          'Pasting large documents into a prompt is not RAG. It uses a lot of tokens, is hard to maintain, and does not retrieve only the relevant passages.',
      },
      {
        id: 'd',
        text: 'Attach the PDF manuals as Salesforce Files to the agent user record so the agent can read them',
        explanation:
          'Agents do not read files attached to their agent user record. The content must be indexed and retrieved, which a data library or a search index provides.',
      },
    ],
    correct: ['b'],
    reference: ADL_TRAILHEAD,
  },
  {
    id: 'DC-002',
    section: 'data-360',
    type: 'single',
    prompt:
      'An Agentforce Specialist saves a new file-based Agentforce Data Library. Which Data 360 assets does Salesforce create automatically as part of this process?',
    options: [
      {
        id: 'a',
        text: 'A new data space and an identity resolution ruleset for the uploaded content',
        explanation:
          'A data library does not create a data space or identity resolution rules. It works in an existing data space, usually the default one.',
      },
      {
        id: 'b',
        text: 'A calculated insight and a data graph that summarize the uploaded content',
        explanation:
          'Calculated insights and data graphs are for structured data and profile lookups. A data library does not create them for unstructured files.',
      },
      {
        id: 'c',
        text: 'A search index over the content and a retriever that queries that index',
        explanation:
          'On save, the library pushes the content into Data 360, creates and maps the data objects, builds a search index, and creates a retriever that grounds the agent.',
      },
      {
        id: 'd',
        text: 'A new custom agent action and a subagent that answers questions from the files',
        explanation:
          'The library does not generate custom actions or subagents. The agent uses the library through the standard Answer Questions with Knowledge action.',
      },
    ],
    correct: ['c'],
    reference: ADL_HELP,
  },
  {
    id: 'DC-003',
    section: 'data-360',
    type: 'single',
    prompt:
      'Cloud Kicks grounds an agent in troubleshooting guides. Customers ask long, natural-language questions that often include exact product codes such as "CK-RUN-4471" and error codes such as "E-209". Tests show a vector index often returns guides for the wrong product. Which search index type should the Agentforce Specialist use?',
    options: [
      {
        id: 'a',
        text: 'A vector search index with a larger chunk size',
        explanation:
          'Larger chunks do not fix the core weakness. Vector search matches by meaning and is weaker at matching exact codes, SKUs, and product names.',
      },
      {
        id: 'b',
        text: 'A vector search index using a different embedding model',
        explanation:
          'Changing the embedding model still leaves a semantic-only search. Exact codes like "E-209" need keyword matching as well.',
      },
      {
        id: 'c',
        text: 'Standard Salesforce global search on the Knowledge object',
        explanation:
          'Global search is not a Data 360 search index and cannot be used by a retriever for RAG grounding.',
      },
      {
        id: 'd',
        text: 'A hybrid search index that combines keyword and vector search',
        explanation:
          'Hybrid search runs keyword and vector search together and fuses the ranked results. It is best for natural-language questions that also contain domain terms, codes, and acronyms.',
      },
    ],
    correct: ['d'],
    reference: HYBRID,
  },
  {
    id: 'DC-004',
    section: 'data-360',
    type: 'multiple',
    prompt:
      'Universal Containers is planning its first Agentforce Data Library. Which content sources can the Agentforce Specialist choose when creating the library?',
    options: [
      {
        id: 'a',
        text: 'Salesforce Knowledge articles',
        explanation:
          'Knowledge is a supported library type. You pick identifying fields and content fields that the agent uses to find and answer from articles.',
      },
      {
        id: 'b',
        text: 'Chatter feed posts from selected groups',
        explanation: 'Chatter feeds are not a data library source. A library is built from Knowledge articles or uploaded files; other content reaches the agent through a custom retriever or an action.',
      },
      {
        id: 'c',
        text: 'Uploaded files such as PDFs and HTML documents',
        explanation:
          'Uploaded files are a supported library type, within size limits such as up to 100 MB for PDFs and up to 4 MB for text or HTML files.',
      },
      {
        id: 'd',
        text: 'Salesforce reports and dashboards',
        explanation:
          'Reports and dashboards are not library sources. Agents reach structured CRM data through actions such as flows, not through a data library.',
      },
      {
        id: 'e',
        text: 'Email-to-Case message threads',
        explanation:
          'Email-to-Case messages are not a selectable library source. They would need a separate Data 360 ingestion and indexing setup.',
      },
    ],
    correct: ['a', 'c'],
    reference: ADL_HELP,
  },
  {
    id: 'DC-005',
    section: 'data-360',
    type: 'single',
    prompt:
      'An Agentforce Specialist tries to add a 140 MB PDF catalog to a file-based Agentforce Data Library, but the upload is rejected. Smaller PDFs upload without problems. What is the most appropriate next step?',
    options: [
      {
        id: 'a',
        text: 'Split the catalog into smaller PDFs that are each within the supported PDF size limit',
        explanation:
          'Data library uploads support PDFs up to 100 MB. Splitting the catalog into smaller files lets it be ingested and indexed.',
      },
      {
        id: 'b',
        text: 'Convert the catalog into a single HTML file, because HTML files have a higher size limit',
        explanation:
          'HTML and text files have a lower limit (up to 4 MB) than PDFs, so converting to one large HTML file makes the problem worse.',
      },
      {
        id: 'c',
        text: 'Move the library to a new data space, because each data space has its own file size limit',
        explanation:
          'Data spaces separate data and permissions. They do not change the per-file size limit for data library uploads.',
      },
      {
        id: 'd',
        text: 'Change the library type from Files to Knowledge and upload the PDF again',
        explanation:
          'The library type cannot be changed after the library is saved, and a Knowledge library indexes Knowledge articles, not uploaded PDFs.',
      },
    ],
    correct: ['a'],
    reference: ADL_TRAILHEAD,
  },
  {
    id: 'DC-006',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers created and saved an Agentforce Data Library using uploaded files. The business now wants the agent to answer from Salesforce Knowledge articles instead. What should the Agentforce Specialist do?',
    options: [
      {
        id: 'a',
        text: 'Edit the existing library and switch its type from Files to Knowledge',
        explanation:
          'The library type is permanent once the library is saved, so it cannot be switched from Files to Knowledge.',
      },
      {
        id: 'b',
        text: 'Create a new data library with the Knowledge type and assign it to the agent',
        explanation:
          'Because the type cannot change after saving, the right approach is a new Knowledge-based library that is then assigned to the agent.',
      },
      {
        id: 'c',
        text: 'Export the Knowledge articles as PDFs and upload them to the existing file library',
        explanation:
          'This creates a copy that goes stale as articles change and loses Knowledge field selection. A Knowledge library indexes the articles directly.',
      },
      {
        id: 'd',
        text: 'Edit the default retriever of the existing library so it queries the Knowledge object',
        explanation:
          'Default retrievers query the search index they were created with. Editing a retriever does not turn a file library into a Knowledge library.',
      },
    ],
    correct: ['b'],
    reference: ADL_TRAILHEAD,
  },
  {
    id: 'DC-007',
    section: 'data-360',
    type: 'single',
    prompt:
      'Cloud Kicks support articles use formal wording such as "outsole adhesion failure," but customers write things like "the bottom of my shoe is peeling off." The questions rarely contain product codes. Which retrieval approach best matches these questions to the right articles?',
    options: [
      {
        id: 'a',
        text: 'Keyword search on article titles only',
        explanation:
          'Keyword search needs matching words. The customer wording shares almost no terms with the article wording, so relevant articles would be missed.',
      },
      {
        id: 'b',
        text: 'A retriever filter on the article category field',
        explanation:
          'Filters narrow results by field values. They do not help the system understand that two differently worded phrases mean the same thing.',
      },
      {
        id: 'c',
        text: 'A vector search index that compares embeddings',
        explanation:
          'Vector search compares the meaning of the question and the chunks, so it handles synonyms and paraphrasing well when exact terms do not match.',
      },
      {
        id: 'd',
        text: 'A higher number of results returned by the retriever',
        explanation:
          'Returning more results adds more loosely related content and more tokens. It does not fix the word mismatch between questions and articles.',
      },
    ],
    correct: ['c'],
    reference: INDEX_TYPES,
  },
  {
    id: 'DC-008',
    section: 'data-360',
    type: 'single',
    prompt: 'In the Data 360 retrieval-augmented generation (RAG) pipeline, what does chunking do?',
    options: [
      {
        id: 'a',
        text: 'It encrypts documents before they are sent to the LLM through the Einstein Trust Layer',
        explanation:
          'Chunking is not a security feature. Protection of prompt data is handled by the Einstein Trust Layer, not by chunking.',
      },
      {
        id: 'b',
        text: 'It converts each document into a numeric vector that represents its meaning',
        explanation:
          'That describes embedding (vectorization), which happens after chunking and runs on each chunk.',
      },
      {
        id: 'c',
        text: 'It merges related data lake objects into a single data model object',
        explanation: 'Mapping DLOs to DMOs is data modeling. Chunking works on the text inside unstructured content.',
      },
      {
        id: 'd',
        text: 'It splits content into smaller passages that can be embedded and added to prompts',
        explanation:
          'Chunking breaks documents into passages small enough to embed and fit in a prompt while keeping enough context to stay meaningful.',
      },
    ],
    correct: ['d'],
    reference: CHUNKING,
  },
  {
    id: 'DC-009',
    section: 'data-360',
    type: 'multiple',
    prompt:
      'An Agentforce Specialist notices that a custom retriever used for grounding returns many passages that are unrelated to the question, such as content for other product lines. The search index status is Ready. Which actions should the Specialist take to improve relevance?',
    options: [
      {
        id: 'a',
        text: 'Increase the temperature of the model used by the prompt template',
        explanation:
          'Temperature affects how creative the LLM response is. It has no effect on which passages the retriever returns.',
      },
      {
        id: 'b',
        text: 'Add filters to the retriever, such as a condition on a product line field',
        explanation:
          'Retriever filters limit results to chunks whose field values match the conditions, which removes content from other product lines.',
      },
      {
        id: 'c',
        text: 'Switch the prompt template to a larger LLM with a bigger context window',
        explanation:
          'A larger model can accept more text, but the retriever would still return the same unrelated passages.',
      },
      {
        id: 'd',
        text: 'Review the chunking strategy, for example chunk size, overlap, or section-aware chunking',
        explanation:
          'Chunks that are too large mix unrelated topics and dilute relevance. Tuning chunking helps each chunk focus on one idea.',
      },
      {
        id: 'e',
        text: 'Increase the number of results the retriever returns',
        explanation:
          'Returning more results usually adds more loosely related passages and uses more tokens. It does not make results more relevant.',
      },
    ],
    correct: ['b', 'd'],
    reference: RETRIEVERS,
  },
  {
    id: 'DC-010',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers needs a custom retriever that queries an existing search index and returns only specific fields. Where does the Agentforce Specialist create and configure this retriever?',
    options: [
      {
        id: 'a',
        text: 'In AI Models (formerly Einstein Studio) in Data 360',
        explanation:
          'Retrievers are created and managed in AI Models, formerly Einstein Studio. From there they can be referenced in Prompt Builder and agents.',
      },
      {
        id: 'b',
        text: 'In the Einstein Trust Layer settings in Setup',
        explanation:
          'Trust Layer settings manage data masking, audit, and similar protections. They do not define retrievers.',
      },
      {
        id: 'c',
        text: 'In Data Streams, on the stream that ingests the documents',
        explanation:
          'Data streams ingest data into data lake objects. Retrieval over a search index is set up separately.',
      },
      {
        id: 'd',
        text: 'In the agent user permission set in Setup',
        explanation:
          'Permission sets control what the agent user can access. They are not where retrievers are built.',
      },
    ],
    correct: ['a'],
    reference: RETRIEVERS,
  },
  {
    id: 'DC-011',
    section: 'data-360',
    type: 'single',
    prompt:
      'An Agentforce Specialist edits a custom retriever to add a filter and saves the change. When the prompt template is tested again, the results still include content that the new filter should exclude. What is the most likely cause?',
    options: [
      {
        id: 'a',
        text: 'The search index must be deleted and rebuilt after any retriever change',
        explanation:
          'Retriever filters are applied at query time. Changing a retriever does not require rebuilding the index.',
      },
      {
        id: 'b',
        text: 'Filters only work on retrievers that query a vector search index',
        explanation:
          'Custom retrievers support filters on both vector and hybrid indexes, so the index type is not the cause.',
      },
      {
        id: 'c',
        text: 'Saving the edit created a new retriever version that has not been activated',
        explanation:
          'Each edit to a retriever creates a new version. The version must be activated before prompt templates and agents use it.',
      },
      {
        id: 'd',
        text: 'The prompt template must be switched to a different LLM to pick up the filter',
        explanation: 'The model that generates the response does not control retrieval, so switching the model has no effect on filters.',
      },
    ],
    correct: ['c'],
    reference: RETRIEVERS,
  },
  {
    id: 'DC-012',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers assigned a Knowledge-based Agentforce Data Library to its service agent. The library finished processing, and Specialists see good results when previewing retrieval as an admin. In the live channel, however, the agent says it cannot find any information. What is the most likely root cause?',
    options: [
      {
        id: 'a',
        text: 'The data library must use a hybrid search index before live agents can query it',
        explanation:
          'The index type affects ranking quality, not whether the agent can read results at all. A vector index still returns results.',
      },
      {
        id: 'b',
        text: 'The agent user lacks access to the Knowledge articles or to the data space used by the library',
        explanation:
          'The agent runs as its agent user. Without Knowledge access and data space access, retrieval returns nothing even though it works for an admin.',
      },
      {
        id: 'c',
        text: 'LLM data masking in the Einstein Trust Layer is removing the retrieved article text',
        explanation:
          'Masking replaces detected sensitive values. It does not remove all retrieved content or make the agent report that nothing was found.',
      },
      {
        id: 'd',
        text: 'Data libraries only work in Employee agents, not in service agents on external channels',
        explanation:
          'Data libraries are commonly used to ground Agentforce Service Agents, so the agent type is not the problem.',
      },
    ],
    correct: ['b'],
    reference: ADL_HELP,
  },
  {
    id: 'DC-013',
    section: 'data-360',
    type: 'single',
    prompt:
      'Cloud Kicks stores years of order history in Snowflake. The data team does not want to copy this data into Salesforce, but agents must use it for grounding. Which Data 360 capability should the Agentforce Specialist recommend?',
    options: [
      {
        id: 'a',
        text: 'A nightly batch data stream that loads the full order history into a DLO',
        explanation:
          'A batch data stream copies the data into Data 360, which is exactly what the data team wants to avoid.',
      },
      {
        id: 'b',
        text: 'An Apex action that exports the order history to Salesforce Files',
        explanation:
          'Exporting to files duplicates data, adds custom code, and turns structured data into files that are harder to query.',
      },
      {
        id: 'c',
        text: 'A separate data space that stores a copy of the Snowflake tables',
        explanation:
          'Data spaces partition data and permissions inside Data 360. They are not a way to access external data without copying it.',
      },
      {
        id: 'd',
        text: 'Zero Copy data federation that queries the Snowflake data in place',
        explanation:
          'Zero Copy lets Data 360 access data in external platforms such as Snowflake, Databricks, BigQuery, and Redshift without duplicating it.',
      },
    ],
    correct: ['d'],
    reference: DC_AGENTFORCE,
  },
  {
    id: 'DC-014',
    section: 'data-360',
    type: 'multiple',
    prompt:
      'A new team member is confused about data lake objects (DLOs) and data model objects (DMOs) in Data 360. Which statements are accurate?',
    options: [
      {
        id: 'a',
        text: 'DMOs are created automatically by identity resolution and cannot be mapped manually',
        explanation:
          'Identity resolution creates unified objects such as Unified Individual, but most DMO mappings are configured from DLOs by an admin or by setup tools.',
      },
      {
        id: 'b',
        text: 'DLOs store embeddings, while DMOs store the original document text',
        explanation:
          'Embeddings are stored in objects created by the search index. DLOs and DMOs are not split between text and vectors this way.',
      },
      {
        id: 'c',
        text: 'Data streams ingest source data into DLOs, which keep the data in a source-like shape',
        explanation:
          'Data streams land ingested data in DLOs (or UDLOs for unstructured content) before it is mapped to the data model.',
      },
      {
        id: 'd',
        text: 'DLOs can be queried by retrievers, but DMOs cannot be used for grounding',
        explanation:
          'Grounding relies on the modeled layer. Search indexes are built on mapped objects, so DMOs are central to grounding.',
      },
      {
        id: 'e',
        text: 'DMOs provide a harmonized, canonical data model that DLO fields are mapped to',
        explanation:
          'DMOs such as Individual form a standard model. Mapping DLO fields to DMOs lets data from many sources be used consistently.',
      },
    ],
    correct: ['c', 'e'],
    reference: DC_AGENTFORCE,
  },
  {
    id: 'DC-015',
    section: 'data-360',
    type: 'single',
    prompt: 'What is an embedding in the context of a Data 360 vector search index?',
    options: [
      {
        id: 'a',
        text: 'A numeric vector that represents the meaning of a chunk so similar content can be found',
        explanation:
          'An embedding model turns each chunk (and the user query) into a vector. Chunks whose vectors are close to the query vector are semantically similar.',
      },
      {
        id: 'b',
        text: 'A merge field that inserts retriever results into a prompt template',
        explanation:
          'Merge fields reference retriever output in Prompt Builder, but that is a template feature, not an embedding.',
      },
      {
        id: 'c',
        text: 'A copy of a document stored inside an agent action definition',
        explanation: 'Documents are not stored in action definitions. Embeddings are vector representations stored with the search index.',
      },
      {
        id: 'd',
        text: 'A keyword list extracted from each document for exact matching',
        explanation:
          'Exact term matching is keyword search. Embeddings capture meaning rather than exact words.',
      },
    ],
    correct: ['a'],
    reference: INDEX_TYPES,
  },
  {
    id: 'DC-016',
    section: 'data-360',
    type: 'single',
    prompt:
      'Which sequence best describes how unstructured content is prepared and used to ground an agent response with RAG in Data 360?',
    options: [
      {
        id: 'a',
        text: 'Retriever, chunking, embedding, data stream, search index, LLM response',
        explanation:
          'A retriever cannot run before content is ingested and indexed. It queries an index that already exists.',
      },
      {
        id: 'b',
        text: 'Ingest and map data, chunk, embed, build search index, retrieve, augment prompt, LLM response',
        explanation:
          'Content is ingested and mapped, split into chunks, vectorized, and indexed. At run time a retriever finds relevant chunks that are added to the prompt sent to the LLM.',
      },
      {
        id: 'c',
        text: 'Ingest data, fine-tune the LLM on the content, build search index, LLM response',
        explanation:
          'RAG does not fine-tune the model. It adds retrieved content to the prompt at run time.',
      },
      {
        id: 'd',
        text: 'Build search index, ingest data, embed, chunk, retrieve, LLM response',
        explanation:
          'The order is wrong. Data must be ingested before indexing, and chunking happens before embedding.',
      },
    ],
    correct: ['b'],
    reference: GROUNDING,
  },
  {
    id: 'DC-017',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers runs two brands in one Data 360 org. Each brand must keep its own data, metadata, and user access separate, including the search indexes and retrievers used by its agents. Which Data 360 feature meets this need?',
    options: [
      {
        id: 'a',
        text: 'Separate data streams for each brand',
        explanation:
          'Data streams control ingestion only. They do not separate metadata and permissions for the resulting data.',
      },
      {
        id: 'b',
        text: 'Retriever filters on a Brand field',
        explanation:
          'Filters narrow query results but do not partition data, metadata, or user permissions across brands.',
      },
      {
        id: 'c',
        text: 'Data spaces for each brand',
        explanation:
          'Data spaces logically partition data, metadata, and permissions within one Data 360 org, and search indexes and retrievers belong to a data space.',
      },
      {
        id: 'd',
        text: 'Separate calculated insights for each brand',
        explanation:
          'Calculated insights compute metrics. They do not isolate data or control who can access it.',
      },
    ],
    correct: ['c'],
    reference: DC_AGENTFORCE,
  },
  {
    id: 'DC-018',
    section: 'data-360',
    type: 'single',
    prompt:
      'Cloud Kicks is planning several agent capabilities and wants to know which one actually depends on Data 360. Which capability requires Data 360?',
    options: [
      {
        id: 'a',
        text: 'An autolaunched flow action that updates the status of a Case record',
        explanation: 'Flow actions on CRM records run on the core platform and do not need Data 360.',
      },
      {
        id: 'b',
        text: 'An Apex invocable action that calculates a shipping estimate',
        explanation: 'Apex actions run on the core platform and do not require Data 360.',
      },
      {
        id: 'c',
        text: 'A standard action that looks up a Contact record by email address',
        explanation: 'Querying standard CRM records does not require Data 360.',
      },
      {
        id: 'd',
        text: 'Grounding answers in uploaded PDFs through an Agentforce Data Library',
        explanation:
          'Data libraries rely on Data 360 for ingestion, search indexes, and retrievers, so Data 360 must be provisioned.',
      },
    ],
    correct: ['d'],
    reference: GROUNDING,
  },
  {
    id: 'DC-019',
    section: 'data-360',
    type: 'multiple',
    prompt:
      'An Agentforce Specialist is comparing default retrievers with custom retrievers in Data 360. Which statements are correct?',
    options: [
      {
        id: 'a',
        text: 'A default retriever is created automatically when a search index is created',
        explanation:
          'Each search index gets a default retriever, so grounding can be tested right away without extra configuration.',
      },
      {
        id: 'b',
        text: 'A default retriever is the only type that can be used in Prompt Builder',
        explanation:
          'Custom retrievers can also be referenced in prompt templates. Using a custom retriever is the usual way to control results.',
      },
      {
        id: 'c',
        text: 'A custom retriever is required before a search index can finish building',
        explanation:
          'A search index builds on its own. Custom retrievers are optional and are created afterward to query a ready index.',
      },
      {
        id: 'd',
        text: 'A custom retriever lets you set filters and choose the fields and number of results returned',
        explanation:
          'Custom retrievers are for fine control: filter conditions, fields to return, number of results, and other options.',
      },
      {
        id: 'e',
        text: 'A default retriever can be edited to add filters, so custom retrievers are rarely needed',
        explanation:
          'Default retrievers are not the place to tune filters. To restrict results, create a custom retriever.',
      },
    ],
    correct: ['a', 'd'],
    reference: RETRIEVERS,
  },
  {
    id: 'DC-020',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers indexes long policy documents. Test answers are often incomplete because key details start at the end of one passage and continue in the next, and retrieved passages lack the section heading that gives them context. What should the Agentforce Specialist adjust first?',
    options: [
      {
        id: 'a',
        text: 'The chunking configuration, such as adding overlap or using section-aware chunking',
        explanation:
          'Overlap keeps information that crosses chunk boundaries, and section-aware chunking keeps document sections and titles together.',
      },
      {
        id: 'b',
        text: 'The LLM temperature, so the model fills in the missing details',
        explanation:
          'Raising temperature makes responses more variable and increases the risk of made-up details. It does not fix retrieval.',
      },
      {
        id: 'c',
        text: 'The data space assignment, so the index is in the default data space',
        explanation:
          'Data space placement affects access, not how documents are split. Content that is already returned is not incomplete because of data spaces.',
      },
      {
        id: 'd',
        text: 'The agent instructions, telling the agent to read whole documents',
        explanation:
          'The agent only sees the chunks the retriever returns. Instructions cannot make it read full documents that were never retrieved.',
      },
    ],
    correct: ['a'],
    reference: CHUNKING,
  },
  {
    id: 'DC-021',
    section: 'data-360',
    type: 'single',
    prompt:
      'Cloud Kicks has a hybrid search index in Data 360. The team wants better retrieval accuracy by having an LLM generate extra metadata and likely questions for each chunk, and it accepts additional consumption cost. Which option should the Agentforce Specialist enable?',
    options: [
      {
        id: 'a',
        text: 'Query transformation on the default retriever',
        explanation:
          'Query transformation rewrites the incoming query at retrieval time. It does not add LLM-generated metadata or question chunks to the index.',
      },
      {
        id: 'b',
        text: 'An enriched index on the search index',
        explanation:
          'An enriched index uses an LLM to generate metadata and question chunks for the content, improving accuracy at extra Flex Credit cost.',
      },
      {
        id: 'c',
        text: 'Identity resolution on the unstructured data model object',
        explanation:
          'Identity resolution unifies profile records such as individuals. It does not enrich document chunks.',
      },
      {
        id: 'd',
        text: 'A calculated insight on the chunk data model object',
        explanation:
          'Calculated insights compute aggregate metrics. They do not generate question or metadata chunks for retrieval.',
      },
    ],
    correct: ['b'],
    reference: 'https://developer.salesforce.com/blogs/2026/09/improve-enterprise-rag-accuracy-in-data-360',
  },
  {
    id: 'DC-022',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers is building a RAG solution manually instead of using Agentforce Data Library. It ingests PDF files from cloud storage into Data 360. In which type of object is this unstructured content represented before a search index is created?',
    options: [
      {
        id: 'a',
        text: 'A calculated insight object',
        explanation: 'Calculated insights hold computed metrics from structured data, not ingested files.',
      },
      {
        id: 'b',
        text: 'A standard Salesforce Knowledge object',
        explanation:
          'Knowledge is a CRM object for articles. Files ingested from cloud storage are not stored as Knowledge articles.',
      },
      {
        id: 'c',
        text: 'An unstructured data lake object (UDLO) mapped to an unstructured DMO',
        explanation:
          'Unstructured content lands in UDLOs and is mapped to UDMOs. The search index is then built on that content and creates chunk and vector objects.',
      },
      {
        id: 'd',
        text: 'A data graph built from the Unified Individual object',
        explanation:
          'Data graphs combine related structured records for fast lookup. They are not where ingested documents are stored.',
      },
    ],
    correct: ['c'],
    reference: SEARCH_INDEX_PROJECT,
  },
  {
    id: 'DC-023',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers is building its first search index in Data 360 over a mix of PDFs that contain tables, images, and multi-level headings. The team has no developers and wants a sensible configuration quickly, then plans to tune it based on test results. What should the Agentforce Specialist start with?',
    options: [
      {
        id: 'a',
        text: 'A custom chunking implementation built with a Data 360 code extension',
        explanation:
          'Custom chunking code is meant for documented requirements the built-in options cannot meet. It is not the recommended starting point, and the team has no developers.',
      },
      {
        id: 'b',
        text: 'Intelligent Context and its smart defaults for parsing and chunking',
        explanation:
          'Intelligent Context provides AI-powered processing of unstructured content, including complex documents, and smart defaults that are a strong starting point to test and then refine.',
      },
      {
        id: 'c',
        text: 'The largest possible chunk size with heavy overlap between chunks',
        explanation:
          'Very large chunks dilute relevance and use more tokens, and too much overlap creates redundant results. Chunk settings should be tuned, not maximized.',
      },
      {
        id: 'd',
        text: 'Indexing each PDF as one whole chunk so no context is ever split',
        explanation:
          'Whole documents are too large to embed and add to prompts effectively. Chunking exists to create focused passages that can be retrieved.',
      },
    ],
    correct: ['b'],
    reference: CHUNKING,
  },
  {
    id: 'DC-024',
    section: 'data-360',
    type: 'single',
    prompt:
      'Universal Containers is creating a hybrid search index over support articles. Older articles often rank above newer articles with similar content. Older articles must stay searchable because some are still the only source for legacy products, but recently updated content should generally rank higher. What should the Agentforce Specialist configure?',
    options: [
      {
        id: 'a',
        text: 'A retriever filter that excludes articles older than one year',
        explanation:
          'A filter removes older articles from the results completely, which breaks the requirement that legacy content stays searchable.',
      },
      {
        id: 'b',
        text: 'A vector search index instead of the hybrid search index',
        explanation:
          'Switching to vector-only search drops keyword matching and still gives no way to favor recent content.',
      },
      {
        id: 'c',
        text: 'A recency ranking factor on the hybrid search index',
        explanation:
          'Hybrid search indexes let you configure ranking factors such as recency and popularity, which the fusion ranking model combines with keyword and vector relevance. Newer content is boosted without excluding older articles.',
      },
      {
        id: 'd',
        text: 'A prompt instruction telling the LLM to prefer recent articles',
        explanation:
          'Instructions act only on chunks that were already retrieved and are not guaranteed. They do not change how the index ranks results.',
      },
    ],
    correct: ['c'],
    reference: HYBRID,
  },
]
