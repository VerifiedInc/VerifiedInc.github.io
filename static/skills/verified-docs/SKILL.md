---
name: verified-docs
description: Read the Verified Docs at https://docs.verified.inc before answering anything about Verified's products or API. Use whenever the question mentions Verified, verified.inc, Text to Signup, 1-Click Verify, 1-Click Signup, 1-Click Health, the Verified Dashboard or SDK, a Verified endpoint (e.g. POST /1-click, POST /1-click/health, POST /client/1-click), an OCE/OCV/SKE error code, brands, payers, credential requests, test users, or webhooks. Also use when writing or reviewing code that integrates Verified.
---

# Verified Docs

Verified's API is specific and changes, so answering from memory produces confident wrong answers: invented endpoints, wrong field names, outdated flows. Read the Docs first.

The Docs publish a Markdown twin of every page, a map of all of them, a search index, and a per-product bundle that concatenates every page of a product into one file. All are plain HTTP.

## How to answer

**1. Get the map.** Every page with a description, grouped by product.

```bash
curl -s 'https://docs.verified.inc/llms.txt'
```

Skip straight to step 3 for simple conceptual questions where the right page is obvious from the map alone (for example "what is 1-Click Signup"). Use the search step below when the question needs a specific section, not just a page.

**2. For a specific question, search.** An error code, a field name, an endpoint, a setting: filter the index to find the exact page _and section_. Never load the index into the conversation; filter it and read the matches.

```bash
curl -s 'https://docs.verified.inc/search-index.json' \
  | jq -r 'limit(20; .entries[]
      | select((.title + " " + .content) | test("eligibility"; "i"))
      | "\(.page // .title) -> \(.url)")'
```

Cap results with `limit()` inside jq rather than a trailing `head`: `head` closes the pipe early, curl dies of SIGPIPE, and jq reports a misleading parse error.

If `jq` is missing, filter with `python3` instead:

```bash
curl -s 'https://docs.verified.inc/search-index.json' | python3 -c "
import json, sys
data = json.load(sys.stdin)
needle = 'eligibility'
for e in data['entries']:
    haystack = (e.get('title', '') + ' ' + e.get('content', '')).lower()
    if needle in haystack:
        print(e.get('page', e.get('title')), '->', e.get('url'))
"
```

If the search returns nothing useful, fall back to the map from step 1. A `jq: parse error: Unfinished string at EOF` means the download was truncated, not that the index is broken: retry it.

**3. Read the page.** Fetch the `.md`, never the HTML page.

```bash
curl -s 'https://docs.verified.inc/1-click-health/guides/api-integration.md'
```

**4. Keep going when the answer spans pages.** Links inside a page point at other `.md` files, and every page ends with a footer naming its section and neighbours:

```
Source: https://docs.verified.inc/1-click-health/overview
Section: 1-Click Health — https://docs.verified.inc/1-click-health.md
Next: User Experience — https://docs.verified.inc/1-click-health/user-experience.md
```

The `Section` link lists every page in that product, so "read the rest of the 1-Click Health docs" is a walk, not a search. Don't chain past 3-4 pages for a single answer unless the developer explicitly asked for a full walkthrough. If you're still not sure of the answer after that many pages, say what you found and what's still unclear instead of continuing indefinitely.

**When the developer explicitly wants a whole product, fetch the bundle instead of walking.** The map lists a per-product bundle (`<product>/llms-full.txt`) that concatenates every page of that product into one file. For "walk me through the full 1-Click Health integration", one fetch of `https://docs.verified.inc/1-click-health/llms-full.txt` replaces the page-by-page walk. Use it only for a genuine full-product request, not for a single-fact question. Do not fetch the global `https://docs.verified.inc/llms-full.txt` into the conversation: it is every page of every product, and it will bury the answer in tokens. Reach for a single product bundle, never the whole thing.

## Rules

- **Read Markdown, cite HTML.** Fetch `.md` files, but every URL you show the developer must be the readable page: drop the `.md`, keep the anchor. So `.../guides/setup.md#integration-type` is cited as `.../guides/setup#integration-type`. Each page's footer already carries that URL on its `Source:` line, so use it. Nobody wants to click a citation and land on raw Markdown.
- **Say when the docs are silent.** If the docs do not cover it, say so plainly. Do not fill the gap with a plausible-looking endpoint, field, or error code. An invented answer with a citation next to it is worse than no answer.
- **Say when the docs are unreachable.** A failed fetch, a timeout, or a non-200 response is not the same thing as "the docs don't cover this." If any `curl` fails, say so explicitly and stop: don't quietly fall back to answering from memory. If the map (`llms.txt`) loaded fine but one specific page fetch fails, say which page failed and offer to retry, rather than guessing at its contents.
- **Flag conflicts instead of silently picking one.** If two pages seem to disagree, prefer the more specific one (a product guide over the general overview, a reference page over a guide) and tell the developer both what you found and that there was a discrepancy, rather than presenting one version as if it were the only one.
- **Quote, do not paraphrase, the parts that must be exact:** endpoint paths, field names, error codes, request and response shapes, and required consent language.
- **Do not re-fetch** a page already in the conversation.
- **Two pages describe live data instead of containing it.** Supported Payers and Custom Demo are widgets in the browser, so their Markdown gives you the endpoint to call rather than the data. Run the call if the developer needs current values.

## Examples

**"How do I set up 1-Click Signup?"** Map, see 1-Click Signup has Setup and integration guides, fetch `/1-click-signup/guides/setup.md`, answer from it, cite `/1-click-signup/guides/setup`.

**"What does OCE011 mean?"** Search `OCE011`, land on `/reference/api/errors.md#oce011`, fetch that page, explain the error and what to send next, cite `/reference/api/errors#oce011`.

**"What does POST /1-click return?"** Search the endpoint name, land in `/reference/api/endpoints.md`, quote the response shape rather than describing it.

**"Which test user has a dental plan in Sandbox?"** Search `dental`, land on a Test Users page, read it. If it does not say, say that.

**"Walk me through the full Text to Signup integration."** A whole-product request, so skip the walk and fetch the bundle: `/text-to-signup/llms-full.txt` has every page of the product in one file. Synthesize from it and cite each page's readable URL (drop `.md`), not the bundle URL.

**"The docs site seems to be down, can you still help?"** Try `llms.txt` first. If that fetch fails too, say plainly that the docs are unreachable right now and that you won't answer from memory, rather than guessing at endpoints or fields.