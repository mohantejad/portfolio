import { NextResponse } from 'next/server';
import {
  getHeroData,
  getAboutData,
  getProjectsData,
  getSkillsData,
  getExperiencData,
} from '@/sanity/sanity-utils';
import { promptTemplate } from './prompt';

const GROQ_KEY = process.env.GROQ_API_KEY!;

async function buildContext() {
  const hero = await getHeroData();
  const about = await getAboutData();
  const projects = await getProjectsData();
  const skills = await getSkillsData();
  const experience = await getExperiencData();

  return [
    `Title: ${hero.title}`,
    `Summary: ${hero.description}`,
    `Education: ${about.education
      .map((e) => `${e.degree} (${e.year}) @ ${e.college}`)
      .join(' · ')}`,
    `Experience: ${experience
      .map((exp) => `${exp.title}@${exp.company} (${exp.fromDate} - ${exp.toDate})`)
      .join(' · ')}`,
    `Projects: ${projects
      .map((proj) => `${proj.name} [${proj.tech.map((tech) => tech.name).join(', ')}]`)
      .join(' · ')}`,
    `Skills: ${skills.map((skill) => skill.name).join(', ')}`,
  ].join('\n');
}

export async function POST(req: Request) {
  try {
    if (!GROQ_KEY) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY' }, { status: 500 });
    }

    const { question } = await req.json();
    const context = await buildContext();

    const payload = {
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: promptTemplate
        },
        {
          role: 'user',
          content: `${context}\nUser question: ${question}`,
        },
      ],
      temperature: 0.3,
      stream: true,
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      const errText = await response.text().catch(() => '');
      console.error('Groq error:', response.status, errText);
      return NextResponse.json({ error: 'Groq request failed' }, { status: 500 });
    }

    return new NextResponse(response.body, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (err) {
    console.error('AI chat error:', err);
    return NextResponse.json({ error: 'AI chat failed' }, { status: 500 });
  }
}
