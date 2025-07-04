
import { content as findingYourWhyContent } from './library/content/finding-your-why';
import { content as amIVainContent } from './library/content/am-i-vain';
import { content as sharingYourJourneyContent } from './library/content/sharing-your-journey';
import { content as isThisForMeContent } from './library/content/is-this-for-me';
import { content as amIEmotionallyReadyContent } from './library/content/am-i-emotionally-ready';
import { content as theQuestForSelfAlignmentContent } from './library/content/the-quest-for-self-alignment';
import { content as journalingForClarityContent } from './library/content/journaling-for-clarity';
import { content as instagramVsRealityContent } from './library/content/instagram-vs-reality';
import { content as navigatingYourDesiresContent } from './library/content/navigating-your-desires';
import { content as beyondPerfectionContent } from './library/content/beyond-perfection';

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  htmlContent: string;
}

export const articles: Article[] = [
  {
    slug: 'finding-your-why',
    title: "Finding Your 'Why': The First Step to a Confident and Rewarding Journey",
    description: "Discover the power of your 'Why'. This guide helps you explore your core motivations for seeking change, distinguishing between self-driven goals and external pressures to build a foundation for a rewarding journey.",
    category: 'Self-Exploration',
    imageUrl: 'https://images.unsplash.com/photo-1559521783-1d1599583485?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: findingYourWhyContent,
  },
  {
    slug: 'am-i-vain',
    title: "Am I Vain? A Guide to Navigating the Guilt of Wanting to Change",
    description: "Explore the feeling of being 'vain' for wanting change. This guide reframes guilt and stigma, helping you understand that true confidence is an internal state, not a chase for external approval.",
    category: 'Emotional Readiness',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: amIVainContent,
  },
  {
    slug: 'sharing-your-journey',
    title: "Sharing Your Journey: How to Talk to Loved Ones About Your Decision",
    description: "Navigate conversations about your aesthetic journey with loved ones. This guide offers strategies for clarifying your 'why', setting boundaries, and fostering understanding and support.",
    category: 'Social Dynamics',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: sharingYourJourneyContent,
  },
  {
    slug: 'is-this-for-me',
    title: "Is This For Me? Navigating Your Path to Confident Choice",
    description: "Move from 'should I?' to 'this is for me.' This guide walks you through the decision-making process, helping you explore your feelings, gather information, and make an empowered choice about your aesthetic journey.",
    category: 'Self-Exploration',
    imageUrl: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: isThisForMeContent,
  },
  {
    slug: 'am-i-emotionally-ready',
    title: "Am I Emotionally Ready for Surgery? A Self-Reflection Checklist",
    description: "Assess your emotional readiness for an aesthetic procedure. This self-reflection checklist helps you explore your motivations, expectations, and emotional foundation for a smoother recovery and greater satisfaction.",
    category: 'Emotional Readiness',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: amIEmotionallyReadyContent,
  },
  {
    slug: 'the-quest-for-self-alignment',
    title: "The Quest for Self-Alignment: Is Your Outer Self Reflecting Your Inner Truth?",
    description: "Explore 'self-alignment'—the profound sense that your appearance authentically reflects your inner self. This guide helps you identify this desire and begin the journey toward feeling more at home in your skin.",
    category: 'Self-Exploration',
    imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: theQuestForSelfAlignmentContent,
  },
  {
    slug: 'journaling-for-clarity',
    title: "Your Inner Compass: Journaling Prompts for Pre-Surgery Clarity",
    description: "Unlock the power of journaling to find clarity on your aesthetic journey. This guide offers prompts and insights to help you process hopes, fears, and motivations, leading to a more confident and conscious decision.",
    category: 'Practical Guidance',
    imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: journalingForClarityContent,
  },
  {
    slug: 'instagram-vs-reality',
    title: "Instagram vs. Reality: Using Social Media as a Tool, Not a Trap",
    description: "Navigate the complex influence of social media on your aesthetic journey. Learn to use inspiration as a helpful tool while avoiding the trap of comparison and unrealistic expectations.",
    category: 'Social Dynamics',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: instagramVsRealityContent,
  },
  {
    slug: 'navigating-your-desires',
    title: "Is Your Heart in the Right Place? Navigating Desires for Aesthetic Change",
    description: "A gentle guide to exploring your 'why'. Consider five key signs that can help you distinguish between a healthy desire for self-alignment and motivations that might lead to disappointment.",
    category: 'Self-Exploration',
    imageUrl: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: navigatingYourDesiresContent,
  },
  {
    slug: 'beyond-perfection',
    title: "Beyond 'Perfection': Finding Your Authentic Self",
    description: "Explore the profound difference between genuine self-improvement and the frustrating pursuit of an imagined 'perfection.' This guide helps you cultivate a mindset that leads to sustainable satisfaction and authenticity.",
    category: 'Emotional Readiness',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&h=600&auto=format&fit=crop',
    htmlContent: beyondPerfectionContent,
  },
];
