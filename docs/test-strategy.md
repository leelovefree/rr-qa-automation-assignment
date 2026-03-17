# Test Strategy

## Goal
Create a focused automation suite for the main discovery features of the demo site.

The objective is to cover the most valuable user flows in a simple and maintainable way.

## Focus areas
- category
- search
- type
- year
- rating
- genre
- pagination

## In scope
- default page load
- main filters
- early-page pagination

## Out of scope
- performance
- visual testing
- full cross-browser testing

## Approach
- Use Playwright with TypeScript
- Start with the most important user flows
- Keep selectors and actions reusable through page objects
- Prefer simple and stable assertions

## Risks
- The site is a demo app, so some behavior may be unstable
- Deep-link refresh and later pagination pages are already mentioned as known issues
- Some scenarios may be better validated by checking both UI updates and network activity
