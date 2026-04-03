---
name: verified-integration
description: Step-by-step integration guide for Verified Inc — SDK setup (1 hour), API setup, Dashboard configuration, and going live
metadata:
  filePattern:
    - "**/verified*"
    - "**/1-click*"
    - "**/signup*"
  priority: 8
---

# Verified Integration Guide

## Prerequisites

1. Log in to the Dashboard: https://dashboard.verified.inc
2. Configure your brand settings (name, integration type, styling)
3. Copy your Sandbox API key

## SDK Integration (Recommended, ~1 hour)

### Step 1: Create a session key (server-side)

Your server calls `POST /client/1-click` with your API key:

```typescript
// Server-side
const response = await fetch('https://core-api.sandbox-verifiedinc.com/v2/client/1-click', {
  method: 'POST',
  headers: {
    'Authorization': 'YOUR_SANDBOX_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})  // Empty body if you don't have user's phone yet
});
const { sessionKey } = await response.json();
// Return sessionKey to client
```

Include `phone` (E.164) if you already have it. Include `verificationUuid` if coming from Text to Signup or 1-Click Verify.

### Step 2: Initialize the SDK (client-side)

```bash
npm i @verifiedinc-public/client-sdk
```

```typescript
import { VerifiedClientSdk, SdkResult, SdkError, SdkResultValues, SdkErrorReasons } from '@verifiedinc-public/client-sdk';

const sdk = new VerifiedClientSdk({
  environment: 'sandbox',
  sessionKey: sessionKeyFromServer,
  onResult: handleResult,
  onError: handleError,
});

sdk.show(document.getElementById('verified-container'));
```

### Step 3: Handle responses

```typescript
function handleResult(result: SdkResult) {
  switch (result.type) {
    case SdkResultValues.USER_SHARED_CREDENTIALS:
      // SUCCESS: send result.identityUuid to your server
      // Server calls GET /1-click/{identityUuid} to get user data
      break;
    case SdkResultValues.USER_OPTED_OUT:
    case SdkResultValues.NO_CREDENTIALS_FOUND:
    case SdkResultValues.RISK_SCORE_TOO_HIGH:
    case SdkResultValues.MAX_INPUT_ATTEMPTS_EXCEEDED:
    case SdkResultValues.MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED:
      // Fall back to manual signup
      break;
  }
}

function handleError(error: SdkError) {
  // Create new session key + new SDK instance
}
```

### Step 4: Retrieve user data (server-side)

```typescript
const response = await fetch(`https://core-api.sandbox-verifiedinc.com/v2/1-click/${identityUuid}`, {
  headers: { 'Authorization': 'YOUR_SANDBOX_API_KEY' }
});
const entity = await response.json(); // 1ClickEntity with credentials
```

## API Integration (1-2 weeks, requires approval)

### Step 1: Begin flow
```typescript
POST /1-click
{ "phone": "+12125550010" }
```

### Step 2: Handle OCE011 (additional input needed)
If you get `OCE011`, check `data.additionalInputs` and retry with the required fields:
```typescript
POST /1-click
{ "phone": "+12125550010", "birthDate": "1989-08-01" }
```

### Step 3: Get data
```typescript
GET /1-click/{identityUuid}
```

## Go Live

1. Go to Brand Details in Dashboard > **Production** tab
2. Configure production brand settings
3. Copy a **Production API key**
4. Swap:
   - Sandbox API key -> Production API key
   - `sandbox-verifiedinc.com` -> `verified.inc` (base URL)
   - `'sandbox'` -> `'production'` (SDK environment)

## Dashboard Brand Settings

| Setting | Options | Notes |
|---------|---------|-------|
| Integration Type | SDK (recommended) / API | Immutable after creation |
| Phone Verification | SDK (recommended) / External | External requires approval |
| Challenges | First Name, Birthday (recommended), SSN4 | At least 1 required |
| Risk Signals | Basic (default) / Advanced | Controls fraud detection detail |
| Credential Requests | Configurable per field | Controls what data is returned |
| Styling | Logo, colors, fonts, border radius | SDK integration only |

For full details: https://docs.verified.inc/1-click-signup/guides/setup
