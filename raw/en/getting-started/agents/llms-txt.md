---
title: "LLMs.txt"
description: "How to get AI tools like Cursor, Windsurf, GitHub Copilot, ChatGPT, and Claude to understand Shuo UI components, settings, and conventions."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/agents/llms-txt"
---
# LLMs.txt

> How to get AI tools like Cursor, Windsurf, GitHub Copilot, ChatGPT, and Claude to understand Shuo UI components, settings, and conventions.

## What is LLMs.txt?

LLMs.txt is a documentation format designed for large language models (LLMs). The Shuo UI docs site provides LLMs.txt files that cover the library's components, props, utilities, and usage, so AI tools can use them to help with development.

## Available routes

- **/llms.txt**: an index of every page, with its title, description, and markdown link (~4K tokens)
- **/llms-full.txt**: the full documentation in a single file, including component examples, props, utilities, and release notes (100K+ tokens)

Both files include the Traditional Chinese and English pages.

## Choosing the right file

<note>

**Start with /llms.txt in most cases.** It links to every page and fits in a standard context window, and the AI tool can fetch individual pages as needed. Use `/llms-full.txt` only when you need the complete examples and your AI tool supports large contexts (200K+ tokens).

</note>

## Markdown version of a single page

Every page has a markdown version: add `.md` to its URL, for example:

- [`/zh-tw/getting-started/overview/installation.md`](https://k90325248.github.io/shuo-ui/zh-tw/getting-started/overview/installation.md)
- [`/en/components/text/input-text.md`](https://k90325248.github.io/shuo-ui/en/components/text/input-text.md)

When you only need one component, passing its page's markdown uses far fewer tokens than the whole documentation.

## Important usage notes

<warning>

**The @ symbol must be typed manually.** In Cursor or Windsurf, type `@` by hand in the chat; a pasted `@` is not recognized as a context reference.

</warning>

## Usage with AI tools

### Cursor

Reference the LLMs.txt files in Cursor to get more accurate help writing Shuo UI forms.

#### How to use

1. **Direct reference**: include the LLMs.txt URLs when asking questions
2. Add the URLs to your project context with `@docs`

[Read more about prompting and `@` mentions in Cursor](https://cursor.com/docs/agent/prompting)

### Windsurf

Windsurf can read the Shuo UI LLMs.txt files directly to learn component usage and conventions.

#### Using LLMs.txt with Windsurf

- Use `@docs` to reference the LLMs.txt URLs
- Create persistent rules in your workspace that reference these URLs

[Read more about Windsurf web and docs search](https://docs.windsurf.com/windsurf/cascade/web-search)

### Other AI tools

Any AI tool that supports LLMs.txt can use these routes to understand Shuo UI.

#### Prompt examples for ChatGPT, Claude, or other LLMs

- "Using the Shuo UI documentation from [https://k90325248.github.io/shuo-ui/llms.txt](https://k90325248.github.io/shuo-ui/llms.txt)"
- "Follow the complete Shuo UI documentation from [https://k90325248.github.io/shuo-ui/llms-full.txt](https://k90325248.github.io/shuo-ui/llms-full.txt)"

## Sitemap

See the [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for every page.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
