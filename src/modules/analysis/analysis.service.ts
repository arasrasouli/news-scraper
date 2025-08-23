import { Injectable } from '@nestjs/common';
import { AnalyzeArticleInput } from './dtos/analyze-article.input';
import { AnalyzeArticleResult } from './dtos/analyze-article.result';

@Injectable()
export class AnalysisService {
  analyzeArticle(input: AnalyzeArticleInput): AnalyzeArticleResult {
    const { link, title, bias } = input;

    const topic = this.extractTopic(title, link);
    const hashtags = this.generateHashtags(title);
    const biasDirection = this.normalizeBiasDirection(bias);

    return { topic, hashtags, biasDirection };
  }

  private extractTopic(title: string, link: string): string {
    if (title && title.trim().length > 0) {
      return this.normalizeTopic(title);
    }
    try {
      const url = new URL(link);
      const slug = url.pathname.split('/').filter(Boolean).pop() ?? '';
      return this.normalizeTopic(slug.replace(/[-_]/g, ' '));
    } catch {
      return 'General';
    }
  }

  private generateHashtags(title: string): string[] {
    const words = (title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    const stopwords = new Set([
      'the','a','an','and','or','but','if','then','else','when','while','of','on','in','to','for','with','at','from','by','about','as','is','are','was','were','be','been','being','this','that','these','those','it','its','into','over','under','after','before','than','so','not','no','can','will'
    ]);

    const keywords = words.filter((w) => !stopwords.has(w)).slice(0, 5);
    const unique = Array.from(new Set(keywords));
    return unique.map((w) => `#${w.replace(/[^a-z0-9]/g, '')}`);
  }

  private normalizeBiasDirection(bias: string): 'positive' | 'negative' | 'irrelative' {
    const value = (bias || '').toLowerCase().trim();
    if (!value) return 'irrelative';

    const positive = ['pos', 'positive', 'pro', 'support', 'favorable', 'favourable', 'optimistic', 'bullish'];
    const negative = ['neg', 'negative', 'anti', 'against', 'critical', 'pessimistic', 'bearish', 'skeptical', 'sceptical'];

    if (positive.includes(value)) return 'positive';
    if (negative.includes(value)) return 'negative';

    if (/\b(pro|support|gain|rise|improve|record|beat)\b/i.test(value)) return 'positive';
    if (/\b(anti|drop|fall|miss|decline|lose|loss|worse)\b/i.test(value)) return 'negative';

    return 'irrelative';
  }

  private normalizeTopic(text: string): string {
    const cleaned = (text || '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return cleaned.length > 0
      ? cleaned
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ')
      : 'General';
  }
}