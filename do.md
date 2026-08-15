You are working inside an existing **Next.js + TypeScript** website for **Jodi Stokes Fitness**.

I want to make a fairly substantial content/feature refactor, but before implementing anything I want you to:

1. Thoroughly inspect the current repository.
2. Understand how the affected areas currently work.
3. Compare the current implementation against the final requirements below.
4. Decide the safest/minimal implementation approach based on the ACTUAL codebase.
5. Break the refactor into chronological, moderately sized implementation tasks.
6. Create a dedicated planning/task folder containing numbered `.md` task files, a `taskTracker.md`, and an `AGENTS.md`.

**Do NOT implement the actual website refactor in this prompt.**

Your job in this prompt is ONLY:

* repository analysis
* architecture/implementation planning
* task decomposition
* creation of the planning markdown files

---

# 1. Overall Goal

The current website contains placeholder/mock Programs, Coaching, Book, Shop/products, buttons, etc.

We now have real client information.

The website needs to become a simple fitness/coaching marketing website where:

### Programs / Coaching

```text
Program displayed on website
        ↓
User clicks Register
        ↓
User reviews/acknowledges agreement/waiver information
        ↓
User completes simple registration form
        ↓
Website sends registration information to Jodi by email
        ↓
Jodi manually handles everything afterward
```

Jodi will personally handle things such as:

* contacting the lead
* payment
* scheduling
* formal signed agreement/waiver
* medical disclosures
* onboarding
* training/coaching communication

We are **NOT building a scheduling/calendar platform**.

We are **NOT collecting payments for coaching on the website**.

---

# 2. Product Flow

Products are even simpler.

```text
Product shown on website
        ↓
User clicks purchase/view button
        ↓
Redirect to third-party website
```

For example Amazon or another external purchasing platform.

The Jodi Stokes website itself must NOT contain:

* cart
* checkout
* payment processing
* inventory
* shipping
* order management
* refund management
* POS
* Amazon API integration
* customer accounts
* product fulfillment logic

This website is merely displaying products and redirecting externally.

Keep the architecture intentionally simple.

---

# 3. Scope / Budget Philosophy

This is a relatively small client website.

Do NOT turn this into an enterprise application.

Prefer:

* existing components
* static structured data
* small server-side email functionality
* minimal dependencies
* minimal new architecture

Do NOT introduce unless genuinely necessary:

* CMS
* database
* authentication
* CRM
* queue
* e-commerce framework
* Shopify integration
* custom inventory
* microservices
* complex state management

Reuse the project's existing architecture wherever sensible.

---

# 4. Centralized Content Data

I want the real Programs + Products content centralized instead of scattered hardcoded values.

I am thinking of something approximately like:

```text
lib/content/programs-products.json
```

or another location that better matches the existing repository.

However:

**Inspect the project first.**

If there is already a better established content/data convention, use that in your plan.

The objective is:

```text
structured static data
      ↓
existing/reusable UI components
```

The JSON/data file should contain only content/data.

Application logic should remain TypeScript.

---

# 5. Confirmed Program

For now, assume there is **ONE primary program**.

## Unstoppable You — 1:1 Coaching

Confirmed information from the client:

* Name: `Unstoppable You`
* Type: `1:1 Coaching`
* Price: approximately `$2,400`
* Length: `8 sessions`
* Session length: approximately `55 minutes`
* Delivery: `Virtual`
* Frequency: approximately `2 sessions per week`
* Includes access to members-only YouTube content
* Includes additional workout videos / workout homework
* Includes nutritional guidance / direction
* Includes measurements or weigh-ins
* Client noted motivation / hormones / metabolism as areas involved in the coaching
* Jodi expects to take approximately `2–3 new clients per month`
* Main CTA should be:

```text
Register
```

Do NOT invent:

* fake cohort dates
* fake seat counts
* guarantees
* transformations
* exact ideal-client profile
* claims not supplied by Jodi
* additional programs just to make the site look populated

---

# 6. Existing Private Training Information

Jodi also supplied an existing document titled:

`JSF Client Private Training Commitment and Price Agreement 2023-24`

It includes this pricing:

### 25-minute PT Sessions — minimum 2x/week

* `$520 for 8 sessions`
* `$65/session`
* performed in Jodi's Gym or Virtual

OR

* `$640 for 8 sessions`
* `$80/session`
* performed in Client Home

### 55-minute PT Sessions — minimum 2x/week

* `$880 for 8 sessions`
* `$110/session`
* performed in Jodi's Gym or Virtual

OR

* `$1,200 for 8 sessions`
* `$150/session`
* performed in Client Home

### Group Fitness

Examples listed:

* Water Class
* Bride Bootcamp
* Fitness Birthday

Price:

`$250 per hour`

---

IMPORTANT:

Do NOT blindly turn all of these into separate website "programs."

Analyze the existing website and requirements and determine where this information logically belongs.

The current understanding is that **Unstoppable You is the primary program we want promoted**.

The older/private-training pricing document may instead be useful for:

* agreement information
* supporting service information
* future content
* policies

Explain your recommendation in the planning files.

Do not make up additional offerings.

---

# 7. Existing Agreement / Policies From Client

Jodi's existing agreement contains these concepts.

## Commitment

Jodi Stokes Fitness focuses on:

* fitness goals
* overall health and wellness
* preparation by both trainer and client
* good sleep
* healthy nutrition habits
* potential behavioral/mindfulness practices

## Scheduling

* packages/sessions are purchased in advance
* sessions scheduled in advance
* approximately 2 weeks notice requested when cancelling an agreement

## Rescheduling

* emergencies may allow rescheduling
* repeated cancellations / conflicts can result in loss of session
* preferred/prime training time may potentially involve a fee
* private training can be done virtually

## Package policy

* packages expire approximately one month from purchase
* no refunds
* no transfers
* no exceptions

There is also bundle pricing language involving approximately 10% off a 48-session package in certain circumstances.

## Waiver

The document includes an assumption-of-risk / liability waiver covering participation in fitness activity and use of facilities/equipment.

Jodi additionally hand-wrote:

```text
No refunds, signed waiver + agreement necessary.
```

She also noted:

```text
If they sign waiver — I need a full disclosure of orthopedic limitations + medications.
```

---

# 8. IMPORTANT Medical / Waiver Requirement

Do NOT collect:

* medications
* diagnoses
* orthopedic conditions
* sensitive medical history

inside the initial public website registration form.

That should be handled privately by Jodi after initial registration/onboarding.

For the website:

Before registering, the user should see an agreement/waiver step or section and explicitly acknowledge it.

Something conceptually like:

```text
I have read and acknowledge the Client Agreement and Waiver.
```

However:

Do NOT automatically claim this checkbox itself is the legally binding signed waiver.

Jodi said a signed waiver/agreement is necessary.

The website is only performing the **initial registration**.

Jodi can handle the formal signed paperwork afterward.

Also:

Do not invent or rewrite legal language.

If exact approved waiver/agreement text does not exist in the repository, account for this as a client-content dependency in the task tracker.

---

# 9. Registration Form

The program registration should be simple.

Expected fields:

### Required

* Full name
* Email
* Phone
* Selected program

### Optional

* Message / fitness goals

Because there is currently one program, the program can default to:

```text
Unstoppable You — 1:1 Coaching
```

But design the data/form cleanly enough that another program could be added later without rebuilding everything.

Do NOT add excessive fields.

---

# 10. Registration Submission

There is currently no technical system on Jodi's side.

She is not technical.

The desired behavior is simply:

```text
User submits registration
        ↓
Website sends Jodi an email
```

Recipient:

```text
jodi@jodistokes.com
```

Inspect the current repository and determine the simplest reliable solution.

My initial thought is something like:

```text
Next.js server-side endpoint/server action
+
Resend
```

But **do not assume this blindly**.

Check:

* Next.js version
* App Router vs Pages Router
* existing dependencies
* existing server actions/API routes
* existing email packages
* deployment assumptions
* environment variable conventions

Then recommend the smallest suitable approach.

Do NOT expose email API secrets to the client.

Do NOT add a database just for registration.

We do not need to permanently store registrations unless the existing architecture has a very good reason to.

The email should eventually contain approximately:

* Name
* Email
* Phone
* Selected program
* Optional message/goals
* Agreement acknowledgement

The website should show:

* loading state
* success state
* failure state

Do not implement this yet in this planning task.

Plan it.

---

# 11. Products

ONLY these products should exist on the website:

### 1. Water Exercise Book

This is the main / featured product.

It already exists on Amazon.

It currently has its own Book section because it has historically been Jodi's main/only product.

The redesigned Products section should continue to make the book visually prominent.

Do not remove its importance just because other products are being added.

### 2. Lunch Bag

Client note:

* approximately `$5.95` sourcing/cost figure was written
* intended selling price appears to be `$19.99`

Be cautious about interpreting the `$5.95`.

It may be her cost rather than public selling price.

Do not expose supplier cost publicly unless clearly intended.

### 3. Water Bottle

No confirmed public price yet.

### 4. Small Towel

No confirmed public price yet.

The client wants branded/logo merchandise.

Do NOT add anything else.

---

# 12. Products Section Restructure

Currently there may be:

* Book section
* Shop section

Desired final structure:

### Remove the current Shop section entirely.

Remove its:

* mock products
* fake filters
* fake cart interactions
* fake Add to Cart buttons
* fake favorites
* fake inventory claims
* fake category chips
* fake variants
* other placeholder commerce UI

### Convert/expand the existing Book section into:

```text
Products
```

The Products section should contain all four real products.

The Water Exercise Book should be the featured product.

The other three can appear as secondary products/cards.

Example conceptual structure:

```text
PRODUCTS

[ Large Featured Water Exercise Book ]

[ Lunch Bag ] [ Water Bottle ] [ Small Towel ]
```

This is conceptual only.

Reuse the current design system/components where possible.

---

# 13. Product Purchase URLs

Every product eventually has an external purchase URL.

For example:

```json
{
  "externalUrl": "..."
}
```

The website redirects there.

For the Water Exercise Book, this will likely be Amazon.

The external URLs for the other products are not confirmed yet.

Do NOT:

* invent URLs
* use fake `href="#"`
* create fake checkout flows

The data model should support missing URLs gracefully.

The task plan should decide the appropriate UI state when an external URL has not yet been provided.

---

# 14. Product Information Still Missing

We currently do NOT have confirmed:

* Water bottle selling price
* Small towel selling price
* External purchase URL for lunch bag
* External purchase URL for water bottle
* External purchase URL for small towel
* Possibly final external URL for the book
* Final photos for all merchandise
* Final descriptions for all merchandise

Missing information should NOT lead to fabricated content.

Record missing client data in the tracker.

---

# 15. Navbar / Navigation

Desired changes include:

Remove:

```text
Shop
```

from the navbar/navigation.

There should not be a separate Shop area anymore.

Instead we will have something conceptually like:

```text
Programs
Products
About
...
```

depending on the existing navigation architecture.

Inspect the actual project before deciding exact navigation changes.

If there is:

* cart icon
* cart count
* shop button
* fake purchase buttons
* book-specific nav wording

analyze what should be removed or renamed.

---

# 16. Booking / Meetings

There is NO meeting/calendar booking requirement.

Do not add:

* Calendly
* Cal.com
* scheduling widget
* appointment calendar
* "Book a call" flow

If the current website says something like:

```text
Book a Call
```

or implies that a calendar booking system exists, determine how it should be changed.

The desired action for coaching is:

```text
Register
```

Registration sends Jodi an email.

Jodi handles communication from there.

---

# 17. Blog / Newsletter

SKIP this work for now.

Do not redesign or expand Blog / Newsletter functionality in this refactor.

If existing Blog/Newsletter code happens to exist, leave it alone unless a Programs/Products change directly requires touching it.

---

# 18. Existing Mock Content

Search the entire relevant repository for placeholder/fake content.

Examples discovered in an earlier audit may include names such as:

```text
Strong Foundations
Lean & Lifted
The Reset
That's It Tee
Stainless Bottle
Studio Mat
Studio Cap
Strong For Life Crew
Resistance Band Set
90-Day Training Journal
Studio Tote + Journal
```

Also search for:

* fake prices
* fake dates
* fake cohort sizes
* fake availability
* `Add to cart`
* cart count
* favorites
* shipping claims
* mock external links
* `href="#"`
* fake program footer links
* Shop anchors
* Book anchors
* coaching CTAs
* stale SEO metadata
* relevant tests asserting mock content

Do not assume those exact files still exist.

Inspect the current repository.

---

# 19. Existing UI Should Mostly Be Reused

This is not intended to be a full visual redesign.

Where practical:

* preserve responsive design
* preserve branding
* reuse sections
* reuse cards
* reuse layout primitives
* reuse form components
* reuse accessibility behavior
* reuse current Next/Image usage
* reuse existing styles

Refactor the data and behavior rather than rewriting the whole site.

If a component is too tied to fake e-commerce functionality, explain why replacing/simplifying it is preferable.

---

# 20. Your Immediate Task: ANALYZE

Before creating task files, inspect at least:

* project structure
* `package.json`
* Next.js version
* TypeScript setup
* App Router/Pages Router
* current homepage composition
* Programs section
* Coaching section
* Book section
* Shop section
* Header/navbar
* Footer
* content/data files
* form components
* current form handling
* API/server actions/routes
* email dependencies
* styling
* environment patterns
* tests
* Playwright/Cypress/Jest/Vitest/etc.
* metadata/SEO
* relevant assets

Also search the codebase for all relevant strings/anchors.

---

# 21. Then Create A Task Folder

After understanding the repository, create a new folder dedicated to this refactor.

Choose an appropriate name, for example:

```text
tasks/programs-products-refactor/
```

or another location consistent with the repository.

Inside it create:

```text
AGENTS.md
taskTracker.md
1.<descriptive-task>.md
2.<descriptive-task>.md
3.<descriptive-task>.md
...
```

You decide the correct number of tasks based on the repository.

---

# 22. Task Sizing

Tasks should be **moderate in size**.

Not:

* one enormous refactor task

and not:

* twenty tiny tasks for individual files.

Each numbered task should represent a logical implementation checkpoint that Codex can reasonably:

1. read
2. understand
3. implement
4. test
5. update tracker

in one focused coding pass.

Aim for roughly 4–7 tasks unless the codebase strongly suggests otherwise.

---

# 23. Tasks Must Be Chronological

Order them based on dependency.

For example, conceptually this may look like:

```text
1. establish data/content foundation
2. refactor product presentation
3. refactor program/coaching registration UI
4. add server-side email delivery
5. clean navigation / stale content
6. testing / final verification
```

BUT:

Do not blindly use that exact decomposition.

Inspect the actual architecture and create the task order that makes the most sense for THIS repository.

---

# 24. Each Numbered Task File Must Include

Each task `.md` should clearly contain:

## Goal

What this task achieves.

## Context

Relevant existing architecture/files.

## Files / Areas Likely Involved

Based on your repository analysis.

## Required Changes

Concrete implementation requirements.

## Explicit Non-Goals

Things the task must not accidentally expand into.

## Data / Client Requirements

Any client facts relevant to that task.

## Edge Cases

Only realistic/simple ones.

Do not over-engineer.

## Verification

What should be tested after implementation.

## Completion Criteria

What must be true before the task is marked complete.

## Tracker Update

Tell the future implementing agent exactly what to record in `taskTracker.md`.

---

# 25. taskTracker.md

Create one central tracker.

It should contain:

### Overall goal

Short summary.

### Task table

Example:

```md
| Task | Description | Status |
|------|-------------|--------|
| 1 | ... | Not Started |
| 2 | ... | Not Started |
```

Allowed statuses can be something like:

```text
Not Started
In Progress
Blocked
Complete
```

### Confirmed Client Requirements

Keep the important requirements summarized there.

### Missing Client Information

Include unresolved items such as:

* product URLs
* merchandise prices
* photos
* exact approved agreement text
* verified email sending domain
* anything else discovered during analysis

### Implementation Notes

A place for future agents to record important decisions.

### Blockers

A place to record external/client blockers.

---

# 26. AGENTS.md

Create an `AGENTS.md` inside this task folder.

Its purpose is to give every future Codex session persistent instructions for THIS refactor.

Include principles such as:

* read the current numbered task first
* inspect affected code before editing
* implement only the current task
* do not automatically start the next task
* update `taskTracker.md`
* do not invent client content
* no cart/checkout
* no scheduling
* no CMS/database
* products redirect externally
* coaching registration emails Jodi
* use centralized structured content
* preserve existing design where practical
* do not make unrelated refactors
* run relevant tests
* document blockers
* never commit secrets

Also tell future agents:

If the actual repository conflicts with assumptions written in a task file, prefer the actual codebase and document the discrepancy rather than forcing an incorrect architecture.

---

# 27. Important Planning Principle

Do not create task files that simply repeat these requirements.

Use your codebase analysis to make them **implementation-specific**.

For example, instead of:

```text
Update programs.
```

write something like:

```text
Refactor X existing content export consumed by Y component, remove Z mock type, adapt A component to the centralized program record, and update B tests.
```

Use actual paths, actual components, actual routes, and actual architecture discovered in the repository.

That is the entire reason for having you perform the planning instead of manually creating generic tasks.

---

# 28. No Actual Refactor Yet

This is critical.

For THIS prompt:

You MAY:

* inspect files
* search code
* analyze architecture
* run read-only commands
* create the planning folder
* create `.md` task documents

You MUST NOT:

* refactor the production website
* change Programs UI
* change Products UI
* add Resend
* remove Shop
* change forms
* change production data
* modify production tests
* install dependencies

Only create the plan/task documents.

---

# 29. Final Response

After creating the planning folder, respond with:

1. The folder path you created.
2. The numbered task files created.
3. A short explanation of why you chose that decomposition.
4. Any important architectural discoveries.
5. Any contradictions between my assumptions and the actual codebase.
6. Any client information still required.
7. Confirm explicitly that no production implementation files were changed.

Do not begin Task 1 until I explicitly tell you to.
