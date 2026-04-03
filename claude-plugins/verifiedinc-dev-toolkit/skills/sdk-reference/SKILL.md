---
name: verified-sdk
description: Verified Inc client SDK reference — VerifiedClientSdk constructor, show(), destroy(), types, constants, and event handling
metadata:
  filePattern:
    - "**/verified*sdk*"
    - "**/verifiedinc*"
    - "**/client-sdk*"
    - "**/1-click*"
    - "**/oneclick*"
  bashPattern:
    - "npm.*@verifiedinc"
    - "yarn.*@verifiedinc"
    - "pnpm.*@verifiedinc"
  priority: 10
---

# Verified Client SDK Reference

Package: `@verifiedinc-public/client-sdk`

## Installation

```bash
npm i @verifiedinc-public/client-sdk
```

Or via CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/@verifiedinc-public/client-sdk@1.3.1/dist/index.umd.min.js" type="module"></script>
```

## Constructor

```typescript
new VerifiedClientSdk(options: {
  sessionKey: string;          // From POST /client/1-click (one-time use)
  onResult: (result: SdkResult) => void;  // Terminal result callback
  onError: (error: SdkError) => void;     // Error callback
  onEvent?: (event: SdkEvent) => void;    // Optional intermediary events
  environment?: string;        // 'sandbox' (default for testing) or 'production'
}): VerifiedClientSdk
```

## Methods

### `show(element?: HTMLElement): void`
Show the SDK UI. If no element passed, injects into `document.body`.

### `destroy(): void`
Destroy the SDK element and invalidate the instance.

## Types

### SdkResult
```typescript
type SdkResult =
  | { type: 'USER_SHARED_CREDENTIALS'; identityUuid: string; redirectUrl: string | null; birthDate: string | null; phone: string | null; ssn4: string | null; step: SdkStep; ... }
  | { type: 'USER_SHARED_HEALTH_DATA'; identityUuid: string; healthDataUuid: string; ... }
  | { type: 'USER_OPTED_OUT'; ... }
  | { type: 'NO_CREDENTIALS_FOUND'; ... }
  | { type: 'NO_INSURANCE_FOUND'; ... }
  | { type: 'RISK_SCORE_TOO_HIGH'; ... }
  | { type: 'MAX_INPUT_ATTEMPTS_EXCEEDED'; ... }
  | { type: 'MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED'; ... };
```

### SdkError
```typescript
type SdkError = {
  reason: 'SESSION_TIMEOUT' | 'INVALID_SESSION_KEY' | 'SHARE_CREDENTIALS_ERROR';
};
```

### SdkEvent
```typescript
type SdkEvent = { metadata: SdkMetadata } & (
  | { type: 'SDK_READY' }
  | { type: 'USER_STEP_CHANGE'; step: SdkStep; previousStep?: SdkStep }
  | { type: 'STEP_TIME_SPENT'; step: SdkStep; durationMs: number }
  | { type: 'USER_COMPLETED_PRODUCT'; product: SdkProduct }
  | { type: 'ONE_CLICK_SIGNUP_FORM_SUBMITTED'; form: Record<string, unknown> }
  | { type: 'ONE_CLICK_HEALTH_FORM_SUBMITTED'; form: Record<string, unknown> }
  | { type: 'VERIFICATION_CODE_RESENT' }
);

type SdkStep = 'consent' | 'phone' | 'verificationCode' | 'birthday' | 'ssn4' | 'info';
type SdkProduct = '1-click-signup' | '1-click-health' | '1-click-verify';
```

## Constants

### SdkResultValues
```typescript
const SdkResultValues = {
  USER_SHARED_CREDENTIALS: 'USER_SHARED_CREDENTIALS',
  USER_SHARED_HEALTH_DATA: 'USER_SHARED_HEALTH_DATA',
  USER_OPTED_OUT: 'USER_OPTED_OUT',
  NO_CREDENTIALS_FOUND: 'NO_CREDENTIALS_FOUND',
  NO_INSURANCE_FOUND: 'NO_INSURANCE_FOUND',
  RISK_SCORE_TOO_HIGH: 'RISK_SCORE_TOO_HIGH',
  MAX_INPUT_ATTEMPTS_EXCEEDED: 'MAX_INPUT_ATTEMPTS_EXCEEDED',
  MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED: 'MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED',
};
```

### SdkErrorReasons
```typescript
const SdkErrorReasons = {
  SESSION_TIMEOUT: 'SESSION_TIMEOUT',
  INVALID_SESSION_KEY: 'INVALID_SESSION_KEY',
  SHARE_CREDENTIALS_ERROR: 'SHARE_CREDENTIALS_ERROR',
};
```

### SdkEventValues
| Value | When it fires | Extra fields |
|-------|--------------|--------------|
| `SDK_READY` | SDK iframe loaded and ready | -- |
| `USER_STEP_CHANGE` | User navigated to new step | `step`, `previousStep?` |
| `STEP_TIME_SPENT` | User left a step | `step`, `durationMs` |
| `USER_COMPLETED_PRODUCT` | User finished product flow | `product` |
| `ONE_CLICK_SIGNUP_FORM_SUBMITTED` | Signup form submitted | `form` |
| `ONE_CLICK_HEALTH_FORM_SUBMITTED` | Health form submitted | `form` |
| `VERIFICATION_CODE_RESENT` | User requested new code | -- |

## Full Usage Example

```typescript
import {
  VerifiedClientSdk,
  SdkResult,
  SdkEvent,
  SdkError,
  SdkResultValues,
  SdkEventValues,
  SdkErrorReasons,
} from '@verifiedinc-public/client-sdk';

const sdk = new VerifiedClientSdk({
  sessionKey: 'YOUR_SESSION_KEY', // from POST /client/1-click
  environment: 'sandbox',
  onResult: handleResult,
  onError: handleError,
  onEvent: handleEvent,
});

sdk.show(document.getElementById('verified-container'));

function handleResult(result: SdkResult) {
  switch (result.type) {
    case SdkResultValues.USER_SHARED_CREDENTIALS:
      // Pass result.identityUuid to your server
      // Server calls GET /1-click/{identityUuid} to get user data
      break;
    case SdkResultValues.USER_OPTED_OUT:
    case SdkResultValues.NO_CREDENTIALS_FOUND:
    case SdkResultValues.RISK_SCORE_TOO_HIGH:
    case SdkResultValues.MAX_INPUT_ATTEMPTS_EXCEEDED:
    case SdkResultValues.MAX_VERIFICATION_CODE_ATTEMPTS_EXCEEDED:
      // Take user to manual signup flow
      break;
  }
}

function handleError(error: SdkError) {
  // Restart SDK: create new session key + new instance
  switch (error.reason) {
    case SdkErrorReasons.INVALID_SESSION_KEY:
    case SdkErrorReasons.SESSION_TIMEOUT:
    case SdkErrorReasons.SHARE_CREDENTIALS_ERROR:
      // Create new session key and reinitialize
      break;
  }
}

function handleEvent(event: SdkEvent) {
  switch (event.type) {
    case SdkEventValues.SDK_READY:
      // SDK ready to display
      break;
    case SdkEventValues.USER_STEP_CHANGE:
      console.log(event.step, event.previousStep);
      break;
  }
}
```

## Native Mobile (React Native)

The SDK works in native mobile apps via WebView. Use `react-native-webview` and communicate via `postMessage`. The SDK origins are:
- Sandbox: `https://1-click.sandbox-verifiedinc.com`
- Production: `https://1-click.verified.inc`

For full details, see: https://docs.verified.inc/1-click-signup/guides/sdk-integration
