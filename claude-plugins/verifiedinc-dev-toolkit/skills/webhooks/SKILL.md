---
name: verified-webhooks
description: Verified Inc webhook reference — 1-Click Health webhook payload, authentication, delivery guarantees, and configuration
metadata:
  filePattern:
    - "**/webhook*"
    - "**/health*"
  priority: 6
---

# Verified Webhooks

Webhooks are currently available for **1-Click Health** only. Configure them in the Dashboard under your brand's settings.

## Configuration

| Setting | Options |
|---------|---------|
| URL | Your webhook endpoint (POST) |
| Authentication | None, API Key, or Basic Auth |

## Delivery Guarantees

- **At least once** delivery (multiple deliveries possible — handle idempotently)
- Dead letter queue retained for **14 days**

## Payload

```typescript
{
  event: "1-click.health.lookup",
  healthDataUuid: string,          // UUID for GET /1-click/health/{healthDataUuid}
  sentAt: integer,                 // Unix timestamp (ms)
  status: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "PARTIAL",
  results?: [{
    memberId: string,
    payer: {
      name: string,
      verifiedId: string,          // Stable ID (never changes)
      ids: [string],               // ids[0] is primary (can change)
      logoUrl?: string
    },
    edi_271: string                // X12 EDI 271 response
  }],
  errors?: [{ message: string }]
}
```

## Alternative: Polling

Instead of webhooks, you can poll `GET /1-click/health/{healthDataUuid}` until `status` is `SUCCEEDED`, `FAILED`, or `PARTIAL`.

## 1-Click Signup Webhooks

Coming soon. Contact Support@Verified.inc to be notified when available.

For full details: https://docs.verified.inc/reference/webhooks
