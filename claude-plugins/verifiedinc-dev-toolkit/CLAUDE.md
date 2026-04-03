# Verified Inc Claude Code Plugin

This plugin provides contextual documentation for developers integrating Verified Inc products:

- **1-Click Signup** — Fast user onboarding from phone number alone
- **1-Click Health** — Health insurance data autofill
- **1-Click Verify** — Phone number verification
- **Text to Signup** — Marketing tool for verified user signup ads

## Key Resources

- Dashboard: https://dashboard.verified.inc
- Docs: https://docs.verified.inc
- Postman API docs: https://api.docs.verified.inc
- Demo: https://1-click.demo.verified.inc
- Support: Support@Verified.inc

## SDK Package

`@verifiedinc-public/client-sdk` — the client-side JavaScript/TypeScript SDK.

## API Base URLs

- **Sandbox**: `https://core-api.sandbox-verifiedinc.com/v2`
- **Production**: `https://core-api.verified.inc/v2`

## Important Notes

- API keys must ONLY be used server-side. Client-side usage triggers a firewall block (HTTP 418).
- Session keys (from `POST /client/1-click`) are one-time use and should be created server-side.
- All phone numbers must be in E.164 format (e.g., `+12125550010`).
- In Sandbox, mock data is returned for any phone number. Use test users for specific scenarios.
- The SDK works in both web and native mobile apps (via WebView).
