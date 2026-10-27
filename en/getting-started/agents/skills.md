---
title: "Skills"
description: "Install the Shuo UI skill to give AI coding agents knowledge of the components, form validation and site-wide settings."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/agents/skills"
---
# Skills

> Install the Shuo UI skill to give AI coding agents knowledge of the components, form validation and site-wide settings.

## What are Skills?

Skills are structured knowledge files that give AI coding agents context about a library, framework, or codebase. The agent loads a skill directly into its context and can refer to it throughout the conversation.

Shuo UI provides a **usage skill** that teaches AI agents to build forms and query pages with Shuo UI.

## Usage

The usage skill gives AI agents comprehensive knowledge about building with Shuo UI. It covers:

- Installation and CSS setup
- The v-model types, main props, slots and common pitfalls of all 17 components
- Form validation with `UForm`, `UFormField` and Valibot, and the shared rules (`requiredText` and others)
- The empty-value contract of each component and how to initialize state
- The query card with a result list and server-side pagination
- The `shuoUi` module options: site-wide defaults, locales and messages, theming
- Display utilities for dates, numbers, phones and months

The skill includes additional references that the AI agent loads on demand based on the task, keeping responses focused and context-efficient. When it needs a full props table or more examples, the skill points the agent to the [markdown version](https://k90325248.github.io/shuo-ui/getting-started/agents/llms-txt#markdown-version-of-a-single-page) of the matching docs page.

<note>

Once installed, you can invoke the skill by typing `/shuo-ui` in your agent's chat.

</note>

### Skills CLI

The [`skills`](https://skills.sh) CLI is the easiest way to install the Shuo UI skill. It supports many agents, including Cursor, Claude Code, Codex, Windsurf and Cline.

```bash
npx skills add k90325248/shuo-ui
```

Target specific agents with the `--agent` flag:

```bash
npx skills add k90325248/shuo-ui --agent cursor
npx skills add k90325248/shuo-ui --agent claude-code
```

Or install globally so the skill is available across all your projects:

```bash
npx skills add k90325248/shuo-ui --global
```

If cloning from GitHub is slow on your network, you can install directly from the docs site instead:

```bash
npx skills add https://k90325248.github.io/shuo-ui
```

<tip>

Visit [skills.sh](https://skills.sh) to learn more about the skills ecosystem and browse other skills.

</tip>

### Cursor

#### Quick install

Click the button below to install the Shuo UI skill directly in Cursor:

<u-button color="neutral" icon="i-simple-icons-cursor" label="Install Skill" to="cursor://anysphere.cursor-deeplink/install-skill?url=https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui" variant="outline">



</u-button>

#### Manual setup

1. Open Cursor and go to "Settings" > "Skills"
2. Click "Add skill" and enter the following URL:

```text
https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui
```

### Claude Code

<note>

**Make sure Claude Code is installed.** See [Anthropic's documentation](https://docs.anthropic.com/en/docs/claude-code/quickstart) for installation instructions.

</note>

Add the skill using the CLI command:

```bash
claude skill add https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui
```

### Other AI tools

The skill files are publicly available on GitHub. You can reference them directly in any AI tool that supports custom context or instructions:

- **Skill entry point**: [`skills/shuo-ui/SKILL.md`](https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui/SKILL.md)
- **Full skill directory**: [`skills/shuo-ui/`](https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.
