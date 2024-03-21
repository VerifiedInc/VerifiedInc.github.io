const buildMockSchema = (schema) => {
  return ({
    "$id": schema,
    "type": "object",
    "comingSoon": true,
    properties: {
      "_": {
          "description": "",
          "examples": [],
          "title": "",
          "displayFormat": "String",
          "input": {"type": "Text"},
          "type": "string"
      }
    }
  })
}
const mockedSchemas = {
  // Credit card credentials
  CreditCardCredential: {
    "anyOf": [
        buildMockSchema("CreditCardNumberCredential"),
        buildMockSchema("CreditCardExpirationDateCredential"),
        buildMockSchema("CreditCardTypeCredential"),
        buildMockSchema("CreditCardTokenCredential"),
        buildMockSchema("BalanceCredential"),
        buildMockSchema("TransactionHistoryCredential"),
    ],
    "$id": "CreditCardCredential",
    "unevaluatedProperties": false,
    "comingSoon": true
  },
  // Bank account credentials
  BankAccountCredential: {
    "anyOf": [
        buildMockSchema("RoutingNumberCredential"),
        buildMockSchema("AccountNumberCredential"),
        buildMockSchema("BalanceCredential"),
        buildMockSchema("TransactionHistoryCredential"),
    ],
    "$id": "BankAccountCredential",
    "unevaluatedProperties": false,
    "comingSoon": true
  },
  // Fraud insights credentials
  FraudInsightsCredential: {
    "anyOf": [
        buildMockSchema("AuthoritativeSourceCheckCredential"),
        buildMockSchema("PEPCredential"),
        buildMockSchema("OFACCredential"),
        buildMockSchema("AdverseMediaScreenCredential"),
    ],
    "$id": "FraudInsightsCredential",
    "unevaluatedProperties": false,
    "comingSoon": true
  },
}


function fetchService(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(`Http response error: ${res.status}`);
  });
}

export function schemaResolverService() {
  const baseUrl = 'https://schema-resolver.verified.inc';
  return {
    // Get schemas returns all credentials and it's basic data.
    async getSchemas() {
      const response = await fetchService(`${baseUrl}/jsonSchema`, {
        method: 'GET',
        mode: 'cors',
      });
      return {...response, ...mockedSchemas };
    },
  };
}
