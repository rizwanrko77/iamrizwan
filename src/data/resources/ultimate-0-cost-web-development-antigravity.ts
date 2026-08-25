import { Resource } from './types';

export const ultimate0CostWebDevAntigravity: Resource = {
  slug: 'ultimate-0-cost-web-development-antigravity',
  title: 'The zero dollar web development setup for beginners',
  description: 'How I go from an idea to a live, working website without paying for a single tool, and without treating the AI coding tool as the whole job.',
  category: 'Workflow',
  date: '18 July 2026',
  readTime: '8 min read',
  tags: ['Workflow', 'Antigravity', 'Claude', 'Supabase', 'Vercel', 'Resend'],
  featured: true,
  externalUrl: 'https://time.rkospl.com',
  author: {
    name: 'Mohd Rizwan',
    role: 'Founder & UX Enhancement Specialist',
  },
  promptSnippet: `You are my technical co-founder. We are planning a new website or web application from scratch before writing any code.

I want you to ask me tough questions, push back on unnecessary scope, help me choose whether I even need a database, and produce a clear implementation plan for my AI coding tool (Antigravity). Do not write code yet.

Here is what I have in mind:
- What it does: [DESCRIBE THE IDEA IN 2-3 PLAIN SENTENCES]
- Who it is for: [TARGET AUDIENCE]
- Core user action: [THE SINGLE MOST IMPORTANT THING A VISITOR DOES]
- Do we need user logins / saved accounts? [YES / NO / NOT SURE]
- Do we need to collect form data or send emails? [YES / NO]

Your job in this conversation:
1. Push back on scope: tell me what we can safely skip for version 1.
2. Architecture choice: tell me if we need a full database (Supabase/Neon), a simple Google Sheets + Apps Script form handler, or just a pure static site.
3. Hosting recommendation: recommend Vercel (for server logic) or Cloudflare Pages (for pure static speed).
4. Output a clear, step-by-step implementation plan (pages, components, data structure, build order) formatted to hand directly to Antigravity.`,
  content: `*Last updated: 18 July 2026. Status: verified setup, used across multiple shipped projects.*

*The stack: Claude for planning, Antigravity for building, Supabase or Neon for data and logins, Resend for email, Vercel or Cloudflare Pages for hosting, and Canva for images.*

---

## The problem with "just use an AI coding tool"

Most guides on building for free stop at one step: pick a free AI coding tool, tell it what to build, and you're done. That sounds simple, but it falls apart the moment you try to build something real.

An AI coding tool like Antigravity is good at one job: writing code once it knows exactly what to build. It is not good at deciding what to build, in what order, or what you'll need six weeks from now that you haven't thought of yet. Give it a vague idea and it will start writing files immediately, because that's what it's built to do. It won't stop and ask "have you thought about how users will log in?" It will just start building, and you'll end up with a pile of decisions nobody actually made on purpose.

Writing the code is maybe forty percent of building a website or app. The other sixty percent is deciding what to build, where the data lives, how people log in, how emails get sent, where the site actually lives online, and where the images come from. All of that can be free too, once you know which tool does which job.

I used exactly this setup to build [time.rkospl.com](https://time.rkospl.com/), from the first conversation to the live site. Everything below is the actual process, not a theory.

## Who this setup is for

This is the right stack for a side project, a portfolio, or a small client project, things like a business site, a simple booking or waitlist tool, or a contact-form-driven landing page. If you can describe what you're building in a few sentences and it doesn't involve a large, growing codebase with a team working on it, this workflow will get you from idea to live site without spending anything.

It's not the setup for larger, more complex builds, the kind with a real team, a growing codebase, or work that needs a coding tool that lives inside your terminal and understands a whole existing project rather than starting from a plan. For that, I'll cover Claude Code in a separate resource article, which I haven't written yet. If you're building something closer to that scale, hold off and check back for that piece instead of forcing this workflow onto it.

## The workflow

This is the order I use, every time.

1. **Plan with Claude first, before touching any code.** I sit down with Claude and talk through the idea the way I would with a co-founder. What are we building? Who is it for? What information does the site need to store, if any? What can we skip for the first version? I don't let it write any code at this stage. I let it ask me questions I hadn't thought about, like how a user resets their password, or what happens if a form gets submitted twice. What comes out of this conversation is a plan: every page, every piece of information the site needs to remember, and the order to build things in.

2. **Hand that plan to Antigravity, and let it build.** Antigravity is the AI coding tool. It reads the plan and does the part it's actually good at: writing the code, running it, and fixing its own mistakes when something breaks. I don't let it run for hours unsupervised. I ask it to build one page or one feature at a time, then I actually open the site in a browser and click through what it just built, the way a real visitor would, before telling it to move to the next piece. If something looks or behaves wrong, I say so in plain language and let it fix that one thing before continuing. That's the whole review process. You don't need to read code to do it.

3. **Only add a database if the plan actually needs one.** A database is just a place where the site remembers things, like user accounts, saved preferences, or anything that needs to persist. Not every project needs this. When it does, I use Supabase or Neon, both of which are free to start. Supabase is my first choice when the site also needs logins, because it handles storing data and logging people in together. Neon is my pick when I only need somewhere to store data and I'm handling logins a different way.

4. **If your project is simple, skip the database entirely.** This is the part most guides miss. If all you need is a static site (an about page, a services page, a contact form) with no logins and no saved user data, you don't need Supabase, and you don't need to pay anyone. Here's exactly what this looks like: you connect your contact form to a Google Sheet using a small script Claude writes for you, called Google Apps Script. Ask Claude for a script that does two things, saves every form submission as a new row in a Google Sheet, and sends an email the moment that row is added. You paste the script into a Sheet's built-in script editor, a free tool that's already sitting inside every Google Sheet under Extensions, run it once to connect it, and it's live. No separate database, no monthly bill, and you can watch every submission land in the spreadsheet in real time.

5. **Send email through Resend, if the project needs proper transactional email.** Things like one-time passcodes, password reset links, or automated notifications go through Resend. The free tier is generous enough for a new project, and it doesn't ask for a credit card to get started.

6. **Put the site online with the host that fits, not out of habit.** Vercel is my default when the project is built with Next.js and needs some behind-the-scenes logic running on the server. Cloudflare Pages is my pick when the site is simpler, doesn't need server logic, and I just want it fast and available everywhere. I decide this while planning with Claude, before any code is written, because switching hosts halfway through a project usually means redoing work.

7. **Get images and graphics from Canva instead of stock photo sites or design tools that are overkill for a first version.** Landing page graphics, social media preview images, simple illustrations, all doable for free in Canva, and much faster than opening a design tool built for a professional design team.

## The full stack

| What it does | Tool | In plain words | Free tier |
|---|---|---|---|
| **Planning the project** | [Claude](https://claude.ai/) | Talk through the idea and get a clear plan before any code is written | Generous free access |
| **Writing the code** | [Antigravity](https://antigravity.google/) | Takes the plan and builds the actual website or app | Free, plus free Google AI quota |
| **Storing data & logins** | [Supabase](https://supabase.com/) | A free database that also handles user accounts and logins | Enough for thousands of users |
| **Storing data only** | [Neon](https://neon.tech/) | A free database, when you're handling logins separately | Generous free storage |
| **No database needed** | Google Sheets + Apps Script | For simple sites: form responses land in a spreadsheet and trigger an email automatically | Completely free, no signup needed beyond a Google account |
| **Sending real email** | [Resend](https://resend.com/) | Passcodes, password resets, and automated notifications | 3,000 emails a month free |
| **Hosting the site** | [Vercel](https://vercel.com/) | Puts your site online, works well with server-side logic | Generous free tier |
| **Hosting (alternative)** | [Cloudflare Pages](https://pages.cloudflare.com/) | Puts simpler sites online, very fast, no server needed | 500 deployments a month free |
| **Images & graphics** | [Canva](https://canva.com/) | Design landing page graphics and social previews | Full free plan, no card needed |

Total monthly cost: **$0.00**. This is the exact setup behind [TIME - The simple time allocation and management tool](https://time.rkospl.com/), and it works whether your project needs a full database or just a contact form.

## Why the order matters

Planning with Claude before building with Antigravity isn't just a nice habit, it's what stops you from wasting time and free usage limits rebuilding something you didn't think through the first time. Antigravity, like most free AI tools, has a limit on how much you can use it for free each day. Every hour it spends building something you're about to change your mind about is an hour you don't get back. A twenty-minute planning conversation is always cheaper than a rebuild.

The same goes for deciding upfront whether you even need a database. If your project is really just a website with a contact form, deciding that early means you skip Supabase entirely, skip Resend entirely, and use the Google Sheets approach instead, which takes about twenty minutes total and has nothing to maintain afterward.

## Things to know before you commit

Free usage limits are real. If you're using Antigravity through Google's free plan, there's a cap on how many requests you can make per minute. Work through one part of your project at a time instead of asking for several big things at once, or you'll hit a wall in the middle of building.

A free Supabase project can go to sleep. If nobody visits your site for about a week, a free Supabase database pauses itself. This is completely fine for a project that's still in progress. If your site is live and just doesn't get much traffic yet, a simple automated check-in every few days keeps it awake.

Resend's free plan has a daily cap. A hundred emails a day, which is plenty while you're testing and getting your first users, but you'll want to know that number before you promise unlimited email to anyone.

The Google Sheets approach has limits too. It's perfect for a contact form or simple signup list. It's not a real database, so it's the wrong choice the moment you need user accounts, logins, or anything more complex than "record this and send an email."

None of this replaces thinking it through yourself. Claude will only catch the gaps in your plan if you actually talk it through instead of asking it to agree with an idea you've already fully decided on. Antigravity will build exactly what the plan says, mistakes and all. The tools are free. Making good decisions is still on you.

## Setting it up

1. **Plan the project with Claude first.** Talk through what you're building, who it's for, and whether you actually need a database. Don't move to building until you have a clear, written plan.
2. **Hand that plan to Antigravity and let it build one piece at a time**, checking each one in your browser before moving to the next.
3. **If you need a database, set up Supabase or Neon** using the plan you already made. If you don't, ask Claude for a Google Apps Script instead, and connect it to a Sheet.
4. **Add Resend only if you need proper transactional email**, and test it with a real message before building anything that depends on it.
5. **Choose your hosting based on what the project actually needs**, then connect it so your site updates automatically every time you make a change.
6. **Pull any graphics you need from Canva** and drop them in.

This is the same sequence, the same free tools, and the same result as [TIME - The simple time allocation and management tool](https://time.rkospl.com/). Zero dollars spent, and a site that was actually thought through before a single line of code got written.`,
};
