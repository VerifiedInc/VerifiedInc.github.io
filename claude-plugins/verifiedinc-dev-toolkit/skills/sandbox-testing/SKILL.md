---
name: verified-sandbox
description: Verified Inc sandbox testing — test users, verification codes, error simulation, and risk signal testing
metadata:
  filePattern:
    - "**/test*"
    - "**/sandbox*"
    - "**/mock*"
  priority: 7
---

# Verified Sandbox & Test Users

## Sandbox Environment

- **Base URL**: `https://core-api.sandbox-verifiedinc.com/v2`
- Returns mock data for ANY phone number
- Use your own phone number to test real SMS delivery
- Use dedicated test users below for specific scenarios

## All Test Users

**Universal values across all test users:**
- Verification Code: `111111`
- Birth Date: `1989-08-01`
- SSN4: `6789`
- First Name: `Richard`
- Last Name: `Hendricks`
- Email: `richard@piedpiper.net`

### Primary Test User (Success, phone only)

| Field | Value |
|-------|-------|
| Phone | `+12125550010` |
| Code | `111111` |

### Additional Input Required (OCE011)

| Scenario | Phone | Additional Inputs |
|----------|-------|-------------------|
| Phone + any of firstName/birthDate/ssn4 | `+12125550020` | `fullName.firstName`, `birthDate`, `ssn4` |
| Phone + First Name | `+12125550023` | `fullName.firstName` |
| Phone + Birth Date | `+12125550022` | `birthDate` |
| Phone + SSN4 | `+12125550021` | `ssn4` |

### Risk Signal Test Users

| Risk Level | Phone | Score | Recommendation |
|------------|-------|-------|----------------|
| Low (allow) | `+16565550000` | 0 | allow |
| Medium-Low (allow) | `+16565550301` | 301 | allow |
| Medium (flag) | `+16565550500` | 500 | flag |
| Medium-High (block, OCE017) | `+14045551775` | 775 | block |
| High (block, OCE017) | `+14045551799` | 999 | block |

### Error Test Users

| Error | Phone | Description |
|-------|-------|-------------|
| OCE013 (No credentials) | `+14045551300` | No data found |
| OCE017 (Risk too high) | `+14045551775` | Blocked (score 775) |
| OCE017 (Risk too high) | `+14045551799` | Blocked (score 999) |

### Credential Variation Test Users

| Variation | Phone Range |
|-----------|-------------|
| Different US addresses | `+13135550000` to `+13135550009` |
| Overseas territory (PR) | `+13135550010` |
| No name returned | `+13135550030` |
| No address returned | `+13135550031` |
| Partial address | `+13135550032` |
| No SSN returned | `+13135550033` |
| No birth date returned | `+13135550034` |
| Under 18 birth date | `+13135550100` |

### Triggering OCE012 (Input Mismatch)

Use any value that doesn't match the test user's data. For example, use `1979-01-01` for `birthDate` (all test users have `1989-08-01`).

## How to Test

### With Demo
1. Go to https://1-click.demo.verified.inc
2. Select "Mock Data (sandbox)" > Start Demo
3. Enter test user phone > code `111111` > birth date `08/01/1989`

### With SDK
1. Complete SDK integration with Sandbox API key
2. Enter test user phone > code `111111` > follow prompts

### With API (curl)
```bash
# Start flow
curl -X POST https://core-api.sandbox-verifiedinc.com/v2/1-click \
  -H "Authorization: YOUR_SANDBOX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+12125550010"}'

# Get data
curl https://core-api.sandbox-verifiedinc.com/v2/1-click/{identityUuid} \
  -H "Authorization: YOUR_SANDBOX_API_KEY"
```

## 1-Click Verify Limits

| Limit | Value |
|-------|-------|
| Verification message expiry | 5 minutes |
| Verification entity deletion | 24 hours |
| Max verify attempts | 3 |
| Max message deliveries | 3 |

For full details: https://docs.verified.inc/1-click-signup/test-users
