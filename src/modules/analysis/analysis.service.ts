import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { load } from 'cheerio';
import { AnalysisResult } from './dtos/analysis-result.dto';

@Injectable()
export class AnalysisService {
  private readonly openai: OpenAI | null;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.model = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';
    this.openai = apiKey ? new OpenAI({ apiKey }) : null;
  }

  async analyzeUrl(url: string): Promise<AnalysisResult> {
    if (!this.openai) {
      throw new InternalServerErrorException('OPENAI_API_KEY is not configured');
    }

    const html = await this.fetchHtml(url);
    const text = this.extractReadableText(html);

    const contentForModel = this.truncate(`${url}\n\n${text}`, 8000);

    const system =
      'You are a precise classification assistant. Given webpage content, extract a concise topic, 3-10 relevant hashtags (start with #, lower_snake_case or lower-case words, no spaces), and bias sentiment as one of: positive, negative, irrelevant. Respond ONLY with JSON matching this TypeScript type: { "topic": string; "hashtags": string[]; "bias": "positive" | "negative" | "irrelevant"; }';

    const response = await this.openai.chat.completions.create({
      model: this.model,
      temperature: 0,
      response_format: { type: 'json_object' } as any,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: `Classify this content. Output strict JSON.\n\nCONTENT:\n${contentForModel}`,
        },
      ],
    });

    const raw = response.choices?.[0]?.message?.content ?? '{}';
    const parsed = this.safeParseJson(raw);

    const topic = typeof parsed.topic === 'string' ? parsed.topic.trim() : '';
    const hashtags: string[] = Array.isArray(parsed.hashtags)
      ? parsed.hashtags
          .map((t) => (typeof t === 'string' ? t.trim() : ''))
          .filter(Boolean)
          .map((t) => (t.startsWith('#') ? t : `#${t.replace(/\s+/g, '_')}`))
      : [];
    const bias = parsed.bias === 'positive' || parsed.bias === 'negative' || parsed.bias === 'irrelevant' ? parsed.bias : 'irrelevant';

    return { topic, hashtags, bias };
  }

  private async fetchHtml(url: string): Promise<string> {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    if (!res.ok) {
      throw new InternalServerErrorException(`Failed to fetch URL: ${res.status} ${res.statusText}`);
    }
    return await res.text();
  }

  private extractReadableText(html: string): string {
    const $ = load(html);
    const pieces: string[] = [];

    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    if (title) pieces.push(title);

    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');
    if (description) pieces.push(description);

    const primary = $('article').text() || $('main').text() || $('#content').text();
    const paragraphs = primary ? primary : $('p').map((_, el) => $(el).text()).get().join('\n');
    if (paragraphs) pieces.push(paragraphs);

    const text = pieces.join('\n').replace(/\s+/g, ' ').trim();
    return this.truncate(text, 12000);
  }

  private truncate(input: string, max: number): string {
    if (input.length <= max) return input;
    return input.slice(0, max);
  }

  private safeParseJson(input: string): any {
    try {
      const normalized = input.trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
      return JSON.parse(normalized);
    } catch {
      return {};
    }
  }
}

