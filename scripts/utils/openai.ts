




export async function callOpenAPI(prompt: string, model = 'gpt-3.5-turbo'): Promise<string | null> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
        console.error('❌ Missing OPENAI_API_KEY');
        process.exit(1);
    }

    const response = await fetch('https://api.openapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${key}`
        },
        body: JSON.stringify({
            model,
            temperature: 0.5,
            messages: [{ role: 'user', content: prompt }]
        })
    }).then(res => res.json());

    return response.choices?.[0]?.message?.content ?? null; 
}