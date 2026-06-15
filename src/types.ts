/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  twitter?: string;
  facebook?: string;
  pinterest?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface AffiliateProduct {
  id: string;
  title: string;
  rating: number;
  priceRange: string;
  brand: string;
  pros: string[];
  cons: string[];
  description: string;
  buyUrl: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or Rich HTML content strings
  authorId: string;
  categoryId: string;
  tags: string[];
  publishDate: string;
  lastUpdatedDate: string;
  readTime: string;
  views: number;
  featured: boolean;
  trending: boolean;
  editorPick: boolean;
  featuredImage: string;
  verticalFeaturedImage?: string; // For Pinterest Optimization
  affiliateProduct?: AffiliateProduct;
  faqs?: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  schemaType?: 'Article' | 'NewsArticle' | 'TechArticle';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  seoBlock: string; // Additional text content for SEO authority ranking at the bottom of category page
  image: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  date: string;
  approved: boolean;
}

export interface AdSettings {
  enableAboveContent: boolean;
  enableMidContent: boolean;
  enableSidebar: boolean;
  enableInFeed: boolean;
  enableFooter: boolean;
  adSensePublisherId: string;
  simulatedClicks: number;
  simulatedRPM: number; // Revenue per thousand impressions
  adSenseHeaderScript?: string; // paste ca-pub scripts here
  adsTxtContent?: string;      // custom ads.txt contents
  adLayoutMode?: 'placeholder' | 'actual_code'; // toggle between placeholder simulator and live html code
  aboveContentCode?: string;   // actual HTML/JS code block
  midContentCode?: string;     // actual HTML/JS code block
  sidebarCode?: string;        // actual HTML/JS code block
  inFeedCode?: string;         // actual HTML/JS code block
  footerCode?: string;         // actual HTML/JS code block
  enableCookieConsentWidget?: boolean; // toggle GDPR cookie consent block
}

export interface GlobalSEO {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  robotsTxt: string;
  googleAnalyticsId: string;
  pinterestVerification?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
  source: string; // 'hero', 'sidebar', 'exit-intent', etc.
}
