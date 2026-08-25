import { Resource } from './types';

export const knowExactlyHowManyHoursFree: Resource = {
  slug: 'know-exactly-how-many-hours-free',
  title: 'Allocate your time to tasks and manage with ease',
  description: 'A walkthrough of TIME, a free tool I built to answer one question I kept getting wrong myself: how much of my week is actually still mine.',
  category: 'Product',
  date: '26 August 2026',
  readTime: '6 min read',
  tags: ['Time Management', 'Freelancing', 'Productivity', 'TIME', 'Availability'],
  featured: true,
  externalUrl: 'https://time.rkospl.com',
  author: {
    name: 'Mohd Rizwan',
    role: 'Founder & UX Enhancement Specialist',
  },
  promptSnippet: `You are my executive productivity and time allocation strategist. I want to calculate my true weekly capacity so I never overcommit to clients or side projects again.

Here are all my current weekly commitments:
- Fixed job / core work: [HOURS PER WEEK, e.g., 40 hrs] (Notice period: [e.g., 2 weeks])
- Client retainers / freelance: [HOURS PER WEEK, e.g., 10 hrs] (Notice period: [e.g., 0 days])
- Side projects / startups: [HOURS PER WEEK, e.g., 12 hrs] (Notice period: [e.g., At will])
- Sleep, health, and family time: [HOURS PER WEEK, e.g., 75 hrs] (Locked / non-negotiable)

Your task:
1. Calculate my Total Committed Hours out of the 168-hour week.
2. Calculate my Comfortably Available Hours (hours with zero commitments right now).
3. Calculate my Potentially Available Hours (comfortably available + hours from commitments with zero notice period that could be dropped if a better opportunity arrives).
4. Give me an honest assessment of whether I have room for a new [X hours/week] commitment without burning out.`,
  content: `*Last updated: 26 August 2026. Status: TIME is live and free to use at [time.rkospl.com](https://time.rkospl.com/).*

---

## The problem it solves

If you juggle more than one thing, a job, a few clients, a side project, family time, you've probably said "I think I have a few hours free" without actually knowing. Not roughly knowing. Actually knowing.

Most people either don't track this at all, or they track it in a way that only they can see, which is a problem the moment someone else needs to know your availability too. A client asking "do you have time for this?" Someone considering hiring you and wanting to know your rough capacity before reaching out. A collaborator trying to figure out when to loop you in.

TIME is built to answer that question two ways: honestly to yourself, and clearly to anyone else who needs to know.

## What TIME actually does

You list out everything that takes up your time, jobs, clients, projects, family, whatever applies, and assign hours to each one. TIME then does the math and tells you two numbers:

- **Comfortably available:** hours you haven't committed to anything, free right now.
- **Potentially available:** the above, plus hours from things you could drop at short notice if something better came along.

That second number matters more than it sounds like it should. A client retainer you could walk away from instantly is very different from a job with a two-week notice period, even if both take up the same ten hours a week. TIME separates the two instead of lumping every commitment together as equally "taken."

## How it works

1. **Add your commitments.** List anything that takes your time, a job, a freelance client, a side project, a learning goal, family or personal time. Each one is called a "Where," as in, where your time is going.
2. **Set hours, and optionally track them for real.** For each commitment, you assign hours per day, week, or month. Some things you just know the number for and don't need to watch closely, family time, a fixed job, sleep. For those, mark it "assumed spent" and move on. For things you actually want to measure, mark it "manual track" instead, and a built-in Start/Stop timer keeps a real record of hours spent, not just hours planned. The timer is stored against your account, so it works the same whether you start it on your laptop and stop it on your phone.
3. **Share your availability, if you want to.** TIME gives you a public page that updates automatically. Anyone with the link sees a clean table of what you've allocated your time to and how many hours you have genuinely free, without seeing anything private, no client names you'd rather keep off a public page, no internal notes, just the numbers you choose to show.

## The features worth knowing about

- **Log notes on what you actually worked on.** Every time-tracked session can carry a short note, so when you look back at your hours next month, you're not staring at a number with no context for what it was.
- **Speak instead of typing your notes.** If typing a note after finishing a task feels like friction you'll skip, TIME has built-in voice dictation across more than 50 languages and dialects. Talk for a few seconds, and it becomes your log entry.
- **A completion rate for anything you're tracking.** If you allocated ten hours a week to a project and actually logged seven, TIME shows you that gap directly, over the last 7, 30, or 90 days, so you can see whether you're consistently over- or under-delivering against what you planned.
- **A notice period on each commitment.** This is what makes "potentially available" more than a guess. Mark something as available at will, locked with no flexibility, or requiring a set number of days' notice, and TIME factors that into what it shows as your real, near-term capacity.
- **Embed your availability anywhere.** The public page isn't just a link, it's also a small piece of code you can paste into your own website or portfolio, so your availability shows up live wherever people are already looking at your work, instead of sending them somewhere else.

## A quick example

Say you allocate 40 hours a week to a full-time job with a two-week notice period, 8 hours to a client retainer you could drop with zero notice, and 15 hours to sleep and family time you're never freeing up. Out of a 168-hour week:

- **Comfortably available:** 168 - 40 - 8 - 15 = 105 hours you haven't committed to anything.
- **Potentially available:** 105 + 8 (the retainer, since it has zero notice) = 113 hours.

Your job's 40 hours never show up as "available," because two weeks' notice isn't the same as being free right now. That distinction is the entire point of the tool.

## Who this is actually for

Anyone juggling more than one commitment and tired of guessing. Freelancers who want a live "here's my real capacity" page to send prospective clients instead of a vague email. Consultants who take on retainer work and want to know, honestly, whether they can say yes to something new. People managing a side project alongside a full-time job who want an honest number instead of "I'll find the time somehow." Or just anyone who wants to see, in one place, where their week is actually going.

You don't need the public page or the sharing features at all if you'd rather keep it private. Plenty of it is useful as a personal dashboard on its own.

## Getting started

TIME is free to use, with no credit card required, and takes under a minute to set up. Add your first commitment, assign it some hours, and you'll have your first real number, not a guess, within a couple of minutes.

[Try TIME, free →](https://time.rkospl.com/register)

### Curious how TIME itself was built?

I wrote up the exact free stack I used to build and ship TIME, from planning it with Claude to the database and hosting choices behind it.

[Read the zero cost stack article →](/resources/ultimate-0-cost-web-development-antigravity)`,
};
