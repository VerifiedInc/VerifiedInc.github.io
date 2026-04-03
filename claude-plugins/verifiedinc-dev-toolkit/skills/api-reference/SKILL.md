---
name: verified-api
description: Verified Inc REST API reference — endpoints, authentication, types, environments, and error codes for 1-Click Signup, Health, and Verify
metadata:
  filePattern:
    - "**/api/**/*"
    - "**/verified*"
    - "**/1-click*"
  bashPattern:
    - "curl.*verifiedinc"
    - "curl.*verified.inc"
  priority: 9
---

# Verified API Reference

## Authentication

All requests require an API key as an `Authorization` header value. API keys are per-brand and per-environment. Manage them in the Dashboard: https://dashboard.verified.inc

**API keys must ONLY be used server-side.** Client-side usage triggers a firewall block (HTTP 418).

## Environments

| Environment | Base URL |
|-------------|----------|
| **Sandbox** | `https://core-api.sandbox-verifiedinc.com/v2` |
| **Production** | `https://core-api.verified.inc/v2` |

In Sandbox, mock data is returned for any phone number. Use test users for specific scenarios.

## Endpoints

### Client SDK

#### `POST /client/1-click`
Create a one-time-use session key for the client SDK.

**Request:**
```typescript
{
  phone?: string,           // E.164 format, e.g. "+12125550010"
  email?: string,
  birthDate?: string,       // YYYY-MM-DD
  ssn4?: string,
  verificationUuid?: string,
  credentialRequests?: CredentialRequest[]
}
```

**Response:**
```typescript
{ sessionKey: string }
```

If you get error code `SKE001`, change your brand's integration type to **SDK** in the Dashboard.

### 1-Click Signup

#### `POST /1-click`
Begin a 1-Click Signup flow (API integration only).

**Request:**
```typescript
{
  phone: string,              // Required, E.164
  email?: string,
  birthDate?: string,         // YYYY-MM-DD
  ssn4?: string,
  fullName?: { firstName?: string, middleName?: string, lastName?: string },
  address?: { line1?: string, line2?: string, city?: string, state?: string, zipCode?: string, country?: string },
  credentialRequests?: CredentialRequest[]
}
```

**Response:**
```typescript
{ uuid: string, identity: 1ClickEntity }
```

#### `GET /1-click/{identityUuid}`
Get user data after a completed 1-Click Signup flow.

**Response:** `1ClickEntity`

### 1-Click Verify

#### `POST /1-click/verifications`
Begin a verification flow.

**Request:**
```typescript
{ phone: string, channel: "sms" }
```

**Response:** `1ClickVerificationEntity`

#### `POST /1-click/verifications/{uuid}/deliver`
Deliver a verification message.

#### `POST /1-click/verifications/{uuid}/verify`
Verify a user-submitted code.

**Request:**
```typescript
{ code: string }  // 6 digits
```

#### `GET /1-click/verifications/{uuid}`
Check verification status.

### 1-Click Health

#### `POST /1-click/health`
Begin a 1-Click Health flow.

**Request:**
```typescript
{
  identityUuid?: string,    // From 1-Click Signup
  fullName?: { firstName: string, middleName?: string, lastName: string },
  birthDate?: string,       // YYYY-MM-DD, required if no identityUuid
  address?: { line1?: string, line2?: string, city?: string, state?: string, zipCode?: string, country?: string },
  sex?: "Male" | "Female" | "Non-Binary",
  ssn?: string,             // 9 digits
}
```

**Response:**
```typescript
{ healthDataUuid: string, status: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "PARTIAL" }
```

#### `GET /1-click/health/{healthDataUuid}`
Get health data after a completed 1-Click Health flow.

**Response:** `1ClickHealthEntity`

#### `GET /1-click/health/payers`
Get all supported payers. **This endpoint is unauthenticated.**

Optional query params: `$search`, `$limit`, `$skip`, `$paginate`

## Types

### 1ClickEntity
```typescript
{
  identifiers: { [key: string]: string },         // phone, email
  credentials: { [key: string]: string | string[] | Object | Object[] },
  metadata: {
    identifiers: { [key: string]: { [metaKey: string]: string } },
    credentials: { [key: string]: { [metaKey: string]: ... } }
  }
}
```

Credential keys: `phone`, `email`, `fullName.firstName`, `fullName.middleName`, `fullName.lastName`, `address.line1`, `address.line2`, `address.city`, `address.state`, `address.zipCode`, `address.country`, `birthDate`, `ssn`, `sex`

Metadata keys: `id`, `verificationMethod`, `status`, `issuanceDate`, `expirationDate`

### 1ClickHealthEntity
```typescript
{
  healthDataUuid: string,
  status: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "PARTIAL",
  results?: [{ memberId: string, payer: Payer, edi_271: string }],
  errors?: [{ message: string }]
}
```

### 1ClickVerificationEntity
```typescript
{
  uuid: string,
  phone: string,
  channel: "textToSignup" | "sms",
  status: "pending" | "sending" | "delivered" | "verified" | "expired" | "failed",
  createdAt: integer,      // Unix ms
  expiresAt: integer,
  deliveredAt?: integer,
  verifiedAt?: integer,
  attemptsRemaining?: integer
}
```

### CredentialRequest
```typescript
{
  type: string,                           // e.g. "AddressCredential", "EmailCredential"
  mandatory?: "yes" | "no" | "if_available",
  children?: CredentialRequest[],
  multi?: boolean                         // Return multiple values (up to 3)
}
```

### RiskSignals
```typescript
{
  overall: {
    score: integer,
    level: "low" | "medium-low" | "medium" | "medium-high" | "high",
    recommendation: "allow" | "flag" | "block",
    reasonCodes?: [string]  // Advanced only
  },
  phone?: { carrier: { id: integer, name: string }, reasonCodes: [string] },
  email?: { reasonCodes: [string] }
}
```

## Common Error Codes

| Code | Description |
|------|-------------|
| `ERR001` | Generic error |
| `SKE001` | Integration type not set to SDK |
| `SKE002` | Session key error |
| `OCE011` | Additional input required (`data.additionalInputs` lists what) |
| `OCE012` | Input mismatch |
| `OCE013` | No credentials found |
| `OCE017` | Risk score too high (blocked) |
| `OCE019` | Max input attempts exceeded |
| `OCE020` | Max verification code attempts exceeded |
| `OCV001`-`OCV007` | 1-Click Verify errors |

## Firewall Errors

| HTTP Status | Cause |
|-------------|-------|
| 403 | Generic firewall block |
| 418 | API key used client-side |
| 429 | Rate limit exceeded |

For full details: https://docs.verified.inc/reference/api/errors
