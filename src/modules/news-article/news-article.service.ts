import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { NewsArticle } from 'src/database/entities/news-article.entity';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import { request } from 'undici';
import { AnalyzeArticleInputDto, AnalyzeArticleResultDto } from './dtos/analyze-article.dto';
import { NewsArticlePromptService } from './news-article.prompt.service';

@Injectable()
export class NewsArticleService extends BaseService<NewsArticle> {
  constructor(
    @InjectRepository(NewsArticle)
    private readonly articleRepo: Repository<NewsArticle>,
    private readonly promptService: NewsArticlePromptService,
  ) {
    super(articleRepo);
  }

  async analyzeArticle(input: AnalyzeArticleInputDto): Promise<AnalyzeArticleResultDto> {
    const { link, title, bias } = input;

    if (!bias || bias.trim().length === 0) {
      throw new Error('bias must be a non-empty string');
    }

    // Fetch page content
    const response = await request(link, {
      headers: { 'user-agent': 'news-analyzer/1.0 (+https://example.com)' },
      maxRedirections: 3,
    });
    const html = await response.body.text();

    // Extract readable text
    const $ = cheerio.load(html);
    const textPieces: string[] = [];
    $('p, h1, h2, h3, h4, h5, h6, li').each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 0) textPieces.push(t);
    });
    const articleText = textPieces.join('\n').slice(0, 12000);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = this.promptService.getAnalyzeSystemPrompt();

    const userPrompt = `Article title: ${title}\nBias (stance): ${bias}\nURL: ${link}\n---\nArticle excerpt:\n${articleText}`;

    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = chat.choices?.[0]?.message?.content ?? '{}';
    let parsed: any = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }

    const topic: string = parsed.topic ?? '';
    const hashtags: string[] = Array.isArray(parsed.hashtags) ? parsed.hashtags : [];
    const biasDirectionRaw: string = (parsed.biasDirection ?? '').toString().toLowerCase();
    const biasDirection: 'positive' | 'negative' | 'irrelevant' =
      biasDirectionRaw === 'positive' || biasDirectionRaw === 'negative' ? (biasDirectionRaw as any) : 'irrelevant';

    const result: AnalyzeArticleResultDto = {
      topic: topic || 'general',
      hashtags: hashtags.slice(0, 6),
      biasDirection,
      summary: typeof parsed.summary === 'string' ? parsed.summary : undefined,
    };
    return result;
  }
}