import { storage } from '#imports';

async function chatCompletion(payload) {
  const [
    apiUrl,
    apiKey,
    model,
  ] = await Promise.all([
    storage.getItem<string>('local:llm.apiUrl', {
      fallback: 'http://localhost:11434/v1',
    }),
    storage.getItem<string>('local:llm.apiKey', {
      fallback: 'sk-ollama',
    }),
    storage.getItem<string>('local:llm.model', {
      fallback: 'llama3.2:3b-instruct-q8_0',
    }),
  ]);

  return fetch(`${apiUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      ...payload,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
}

const rewritePrompt = `
# Instruction

Rewrite given header to remove:
- Hype
- Exaggeration
- Overly promotional language
- Clickbait

Make it informative, concise, straightforward.
Preserve original header language.

# Examples:

Original: Kim Kardashian LOVES This Swimsuit Brand
Rewritten: "Advertisement for a swimsuit brand"

Original: "This Is Why Business Owners are Investing in Bitcoin"
Rewritten: "Bitcoin promotion"

Original: "Unbelievable Secrets to Boost Your Productivity Overnight!"
Rewritten: "Clickbait about productivity"

Original: "This is How Business Owners are Saving Thousands on Their Taxes"
Rewritten: "Clickbait about tax savings"

Original: "Did You Know That Influencer Marketing is Dying? Here’s What to Do Instead"
Rewritten: "Clickbait about influencer marketing"

Original: "The Last Winter Jacket You’ll Ever Need"
Rewritten: "Advertisement of a winter jacket"

Original: "Why You Should Stop Scrolling and Try Notion"
Rewritten: "Notion promotion"

Original: "LIVE Video: How to Level Up Your Marketing Agency"
Rewritten: "Marketing agency webinar"

Original: "You Won't Believe What This New Tech Can Do!"
Rewritten: "Tech capabilities overview"

Original: "166 Photos You Won’t Believe Are Not Photoshopped"
Rewritten: "Clickbait photos"

Original: "France deals with its first heatwave of the year"
Rewritten: "Heatwave in France"

Original: "Iran's foreign minister to meet with Putin after US strikes on nuclear sites"
Rewritten: "Iran's foreign minister to meet Putin after US strikes"

Original: "Review of new GPUs"
Rewritten: "Review of new GPUs"

Original: "How to setup local LLMs"
Rewritten: "How to set up local LLMs"

Original: ""Tego się nie da wytrzymać!". Dym z popularnego kebabu na Saskiej Kępie udręką mieszkańców"
Rewritten: "Mieszkańcy Saskiej Kępy skarżą się na dym z kebabu"

Original: "Эксперты объяснили, почему новостные заголовки стали такими раздражающими и что с этим делать"
Rewritten: "Почему новостные заголовки раздражают и что с этим делать"

Original: "あなたのお気に入りのスポーツチームについて知らない19のこと"
Rewritten: "スポーツチームに関する意外な事実19選"

# Header
"{header}"

# Output
Reply with the rewritten header only, no additional text or explanations.
Single option, no bullet points, no quotes, no markdown formatting.
`.trim();

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === 'unhype-request') {
      console.log('Received unhype request:', message.content);
      chatCompletion({
        messages: [
          {
            role: 'user',
            content: rewritePrompt.replace('{header}', message.content)
          }
        ]
      })
        .then((response) => {
          if (response.choices && response.choices.length > 0) {
            const content = response.choices[0].message.content;
            console.log('Unhyped content:', content);
            sendResponse({ status: 'success', content });
          } else {
            console.error('No choices in response:', response);
            sendResponse({ status: 'error', content: 'No content returned' });
          }
        })
      return true;
    } else {
      console.warn('Unknown message type:', message.type);
    }
    return true;
  });
});