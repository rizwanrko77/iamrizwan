import { Resource } from './types';

export const makeApplicationTechnicalRound: Resource = {
  slug: 'make-application-technical-round',
  title: 'Make the application itself the technical round',
  description: 'A screening method for senior engineering hires, plus a working implementation you can deploy in about ten minutes.',
  category: 'Playbook',
  date: '25 August 2026',
  readTime: '8 min read',
  tags: ['Hiring', 'Engineering', 'Screening', 'Cloudflare Pages'],
  featured: true,
  externalUrl: 'https://hollowpoint.pages.dev',
  githubUrl: 'https://github.com/rizwanrko77/hollowpoint',
  promptSnippet: `You are helping me build a job application flow that doubles as the first
technical screening round. Candidates work through a series of small technical
obstacles in order to submit an application at all.

## Fill these in

- Company name: [COMPANY]
- Role being hired: [ROLE]
- What the company does, one line: [WHAT YOU DO]
- Hosting target: [Cloudflare Pages / Vercel / Netlify / other]
- Candidate time budget: [45 to 90 minutes]
- Real candidates or a demo: [REAL / DEMO]

If any of these are blank or ambiguous, ask me before writing any code.

## What to build

A job posting page, plus a multi-step application form, with a series of gates
between the posting and a successful submission. Propose a gate count based on
my time budget, roughly one gate per 12 to 15 minutes, and tell me your
reasoning before you start building.

Every gate must test something that predicts on-the-job behaviour. Reading
carefully. Debugging from an error message. Reading response headers. Noticing
a discrepancy nobody pointed at. Implementing a documented spec. If a gate
tests only puzzle-solving or trivia, replace it.

Design the gates yourself. Do not copy a known example. Vary the specific
values, the mechanisms and the order, so that solutions published for someone
else's version do not apply to mine.

## Hard constraints

These come from a working implementation. Follow them exactly.

**1. Browsers repair most broken URLs before the request is sent.** Verified
against Chromium:

  Does not survive: backslashes (converted to forward slashes), /../ and /./
  dot-segments (removed), tabs, newlines and stray spaces (stripped), typo'd
  schemes like htlps:// (routed to search, and you also lose the server log).

  Survives: a double slash in the path, path casing, anything in the query
  string, and an href whose target differs from its visible anchor text.

  Break the query string or the path shape. Never the scheme or the host. The
  wrong URL still has to reach my server, or I cannot log the attempt.

**2. Every failure must be diagnosable.** Each error response returns JSON with
an error code, a plain-language detail, and a fix field naming the next action.
No silent failures anywhere. Frustration with information is a test of
persistence. Frustration without information is attrition, and it costs me the
candidates I most want.

**3. Broken controls must throw, not sit disabled.** A disabled button is
obvious and teaches nothing. Wire the handler and let it fail on a missing
value, with a console error that names what is missing and where to get it.

**4. Every gate needs at least two valid solutions.** A gate with one intended
answer tests whether the candidate thinks the way I do, which is not something
I want to select for.

**5. Stay stateless.** Sessions, tokens and any intermediate artifacts should be
HMAC-signed blobs verified against a single secret held in an environment
variable. No database, no provisioning, no build step.

**6. Do not try to block AI.** Assume candidates use models and that this is
fine. Put the difficulty where model access does not help, meaning anywhere the
candidate must debug state that exists only in their own browser session. Do
not add bot blocking or crawler rules. Aggressive bot challenges will break any
gate that requires a non-browser HTTP request.

**7. The site must look professionally built.** If it looks broken, candidates
conclude I am incompetent rather than deliberate, and the strongest ones leave
first. Real typography, real layout, coherent copy.

**8. Include a working accessibility bypass.** A flow built on hovering links,
reading headers and using developer tools is not equally available to everyone.
Add a visible alternate route to the same form, wired to a real contact address
I will supply. In several jurisdictions this is a legal requirement.

**9. State the mechanic in the posting itself.** Say plainly that the
application is the first technical round, give the time budget, and note that
things which appear broken are deliberate. A mismatched link target is also the
textbook phishing signature, and security-minded candidates will otherwise
report the page to their employer's IT team.

## If I said REAL rather than DEMO

Add persistence before anything else. Write each submission to a datastore and
send a notification to an inbox. A candidate who spends an hour clearing gates
and watches the application vanish is the worst outcome this system can produce.

Write the receipt copy for a real posting, meaning a genuine confirmation and a
real next step, not a disclosure that the whole thing was a mock.

## Deliverables

1. The full source, ready to deploy, with the deploy commands for my hosting
   target and any known gotchas called out. On Cloudflare Pages specifically:
   the deploy must run from the project root rather than from inside the assets
   directory, and dashboard drag-and-drop does not compile a functions folder
   at all.
2. A separate walkthrough file documenting every gate, every valid solution,
   and which values I should rotate quarterly.
3. A solve script that walks all gates end to end against a live URL.
4. A short scoring guide: what to log per candidate, and which signals actually
   distinguish a strong applicant from a persistent one.

## Verify before telling me it works

Run the solve script against a local instance and show me the output. Then test
every failure path: missing credentials, wrong signature, skipped steps,
expired tokens, forged values. Show me those responses too. Do not report
success until the failures are as informative as the successes.`,
  author: {
    name: 'Mohd Rizwan',
    role: 'Founder & UX Enhancement Specialist',
  },
  content: `*Last updated: 25 August 2026. Status: reference build tested end to end, not yet run on a live hiring round.*

---

## The problem this solves

Ask anyone hiring for a senior technical role right now what changed, and you get the same answer in different words. The applications all look good.

Not good as in strong. Good as in polished. Every résumé hits the keywords. Every cover letter is specific to the company. Every take-home comes back clean, documented and tested. Volume is up, variance is down, and the first honest signal now arrives forty minutes into a live interview, by which point you've spent a scheduling loop, an interviewer's afternoon, and a rejection email nobody enjoyed writing.

The obvious response is to add more screening. That makes things worse, for a reason worth spelling out.

A résumé, a cover letter, a portfolio and a take-home submission are all artifacts produced in advance and handed over. That was always the weak point, but it used to be expensive to exploit. Producing a convincing artifact took nearly as much skill as the job did, so the artifact worked as a proxy.

That relationship is gone. Producing a polished artifact costs almost nothing now. Evaluating one costs exactly what it always did. So you get more applications, each carrying less information, and the funnel inverts: your early stages start filtering for access to tooling rather than for capability.

Adding another artifact stage makes this worse. You're asking for more of the thing that stopped being informative.

What hasn't gotten cheaper is behavior in an unfamiliar system, in real time. Nobody can hand you that in advance, because it doesn't exist until the person is inside the system.

So put them in one, and make the application the thing they have to navigate.

## The approach

Instead of a form with an Apply button, the application flow is a small technical exercise the candidate works through in order to submit at all. Not a test attached to the application. The application is the test.

The link in the job posting is subtly wrong. Correcting it lands you on a response that looks like a dead end and isn't. Past that: a form that quietly withholds two of its own steps, a button that fails on a config key it was never given, and finally no submit control at all, because submission is a signed HTTP request you have to construct yourself.

Five gates, roughly an hour. Everyone who reaches the end has demonstrated on the record that they read carefully, debug from error messages, and finish things.

## Try it before reading further

I built a full reference implementation to find out whether the idea survives contact with a real runtime. It's live at [hollowpoint.pages.dev](https://hollowpoint.pages.dev).

Hollowpoint isn't a company and there's no job behind it. Everything below is the teardown, so if you want to attempt it cold, do that first.

## Four rules that make it work

Most of what determines success here isn't the puzzles. It's these.

**Every failure has to be diagnosable.** This is the one that matters most. When something breaks, the response has to say what went wrong and what to do about it. In the reference build every error returns a machine-readable reason and a \`fix\` field:

\`\`\`json
{
  "error": "signature_mismatch",
  "detail": "The signature did not match this body under this session token.",
  "checklist": [
    "Key is the session token string, not the sid and not the cookie header.",
    "Message is the exact body bytes you sent.",
    "Encoding is lowercase hex, not base64."
  ]
}
\`\`\`

Frustration with information is a test of persistence. Frustration without information is just attrition, and it costs you the candidates you most wanted: the ones with other offers, who reasonably concluded your site was broken.

**Make AI use irrelevant rather than impossible.** You can't out-puzzle a model, and every hour spent trying is wasted. The first two gates here are fully solvable with an assistant, and that's fine. What survives isn't the gates that block AI. It's the gates where model access doesn't help, because the candidate has to debug state that only exists in their own browser. A model can explain what DevTools does. It can't tell you why your session is returning a 429.

Treat AI as a tool rather than as cheating, and put the weight on the parts where the distinction stops mattering.

**Accept multiple valid solutions.** The step-recovery gate can be cleared through a query parameter, through a localStorage key, or through a method exposed on the page's global object. All three are correct. A gate with exactly one intended solution tests whether the candidate thinks the way you do, which isn't a quality worth selecting for.

**Log attempts, not just completions.** The gates filter. The logs score. Time between the first failed link and the first correct one is close to a pure measure of observation. Which route someone took through a multi-solution gate says a lot about how they poke at unfamiliar systems. Number of rate-limit responses absorbed separates people who read headers from people who hammer. Someone who cleared the final gate in four minutes because they read the protocol carefully at gate two is a different candidate from someone who ground it out over two hours, and both cleared it.

## The five gates

**1. The link.** Anchor text and \`href\` disagree, and the ID shown in the text is the public requisition number rather than the internal one the endpoint expects. Both routes fail. Copying the visible text is the first correction and isn't sufficient.
*Tests: reading before clicking.*

**2. The response that isn't an error.** The wrong URL returns \`410 Gone\`, styled like an ordinary closed-posting page, and casual applicants leave at this point. The response carries a header pointing at a discovery document, which issues a session token and notes that the internal ID is encoded rather than hidden. The ID sits base64-encoded in the posting's own metadata.
*Tests: reading what the server said, not just what the browser rendered.*

**3. The withheld steps.** The form's progress indicator says "Step 1 of 5" and renders three. The schema endpoint returns the other two marked as withheld, and documents the parameter that returns everything.
*Tests: noticing a discrepancy nobody pointed at.*

**4. The button that fails honestly.** The résumé-link button is wired rather than disabled, because disabling it is too obvious and reveals nothing. It throws on a config value that's null under the default scope, and the console error names the missing key and points at the scope list. Past that, a 25-second grant runs against a 10-second rate limit that returns \`Retry-After\`.
*Tests: debugging from an error message, and reading response headers.*

**5. No submit control.** There's no submit button anywhere in the DOM, and no trick reveals one. Submission is an HMAC-SHA256 signed POST, with the protocol documented three gates earlier.
*Tests: implementing a documented spec.*

The last one is the capstone on purpose. It isn't a puzzle. It's a check on whether you understand the system you've been walking through for the past hour.

## Reference: what survives URL normalization

If you build this yourself you'll reach for a broken link first, and most of the obvious breaks repair themselves silently. Browsers normalize URLs before the request leaves, and this applies to typed addresses and clicked links alike. Tested against Chromium:

| Break | Survives | Note |
|---|---|---|
| \`\\\` backslash | ✗ | Converted to \`/\` |
| \`/../\`, \`/./\` | ✗ | Dot-segments removed |
| Tabs, newlines, stray spaces | ✗ | Stripped or trimmed |
| \`htlps://\` typo scheme | ✗ | Routed to search, and you lose the log entry |
| \`//\` in the path | ✓ | Never collapsed |
| Path casing | ✓ | Only the host gets lowercased |
| Query string, any form | ✓ | Untouched |
| \`href\` different from anchor text | ✓ | Nothing to normalize |

The rule: break the query string or the path shape, never the scheme or the host. The wrong URL still has to reach your server, or you can't log the attempt, and the attempt is your first data point.

One caveat. A link whose visible text and target disagree is also the textbook phishing signature. Security-minded candidates may report your careers page to their employer's IT department. Say plainly in the posting that the obstruction is deliberate.

## Deploying it

The reference implementation runs on Cloudflare Pages with no database and no build step. Sessions, grants and attachments are all HMAC-signed blobs verified against a single secret, so there's nothing to provision.

\`\`\`bash
git clone https://github.com/rizwanrko77/hollowpoint && cd hollowpoint
npx wrangler pages deploy public --project-name=your-project
npx wrangler pages secret put HP_SECRET --project-name=your-project
\`\`\`

Two things will bite you.

Run the deploy from the project root rather than from inside \`public/\`. Wrangler picks up the functions directory from the working directory, and running it one level down gives you a site where the posting renders correctly and every gate returns 404.

Don't deploy by dragging a folder into the Cloudflare dashboard. Dashboard uploads don't compile a functions directory at all, which produces the same broken result through a different route.

If you're running real applications through it, add persistence before the first candidate arrives. The reference build logs submissions and returns. That's correct for a demo and unacceptable for a live posting, where someone will spend ninety minutes clearing five gates and watch their application evaporate.

## What it costs you

Worth reading before you commit to this.

**You'll lose strong candidates.** Someone with three offers sees a dead link, assumes your careers page is broken, and closes the tab. State the mechanic and the time budget in the posting itself, and keep a referral bypass that skips straight to the form.

**It's an accessibility problem unless you handle it.** A flow built on hovering links, reading response headers and using developer tools isn't equally available to everyone. A screen-reader user can't hover a link to spot a mismatched target. You need a real alternate route to the same form, wired to an inbox somebody actually reads, and candidates who use it can't be scored differently. In several jurisdictions this is a legal requirement rather than a courtesy.

**It quietly filters for free evenings.** An hour is a real ask from someone with a job and a family. Cap the time cost, say the cap out loud, and understand that a longer funnel skews young and unencumbered in ways you probably didn't intend.

**Observation and patience aren't the same as engineering ability.** They correlate. They aren't identical. Decide before you start that a strong candidate who needed a nudge at gate one still advances, and write that into the rubric, or you'll rationalize it afterward.

**Solutions leak.** Assume yours are public within sixty days of the first hire. Build the rotatable values, meaning the secret, the IDs and the withheld-step count, as one-line changes.

## What I don't know yet

I haven't run this on a real hiring round, and I'm not going to pretend otherwise. I built it to find out whether the idea survives implementation, and it does. The gates work, the failure modes are diagnosable, and the flow is genuinely hard to delegate wholesale to a model.

What I can't tell you is the completion rate. My guess is the highest silent drop-off is gate three, because nothing errors there. The form just looks finished, and there's no failure for the candidate to react to. That's a guess. The only way to find out is to run it with three or four engineers who haven't seen the answer key and watch where they stall.

If you deploy it, I'd like to know what your numbers look like.

---

*Reference implementation: [hollowpoint.pages.dev](https://hollowpoint.pages.dev). Source code: [github.com/rizwanrko77/hollowpoint](https://github.com/rizwanrko77/hollowpoint).*`,
};
