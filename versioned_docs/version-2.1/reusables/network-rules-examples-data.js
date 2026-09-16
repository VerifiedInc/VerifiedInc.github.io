export const networkRuleInNetworkJson = `{
    "uuid": "ab280ee0-5f66-4076-9d1b-255d5f0024e3",
    "name": "Rule 1: Aetna | MA, NY, WA | PPO | Hooli Health | Pied Piper - INN",
    "status": "IN_NETWORK",
    "notes": "Requires manual review",
    "metadata": {
        "selfPay": false,
        "priority": 1,
        "packageId": "123456"
    },
    "startDate": "2026-10-01",
    "endDate": "2027-10-01",
    "conditions": [
        {
            "key": "payerId",
            "operator": "EQUAL",
            "values": ["V404110"]
        },
        {
            "key": "payerName",
            "operator": "INCLUDE",
            "values": ["Aetna"]
        },
        {
            "key": "state",
            "operator": "EQUAL",
            "values": ["MA", "NY", "WA"]
        },
        {
            "key": "insuranceTypeCodes",
            "operator": "INCLUDE",
            "values": ["PR"]
        },
        {
            "key": "planName",
            "operator": "INCLUDE",
            "values": ["PPO"]
        },
        {
            "key": "relatedEntites",
            "operator": "INCLUDE",
            "values": ["Hooli Health"]
        },
        {
            "key": "groupNumber",
            "operator": "EQUAL",
            "values": ["123456-123-12345"]
        },
        {
            "key": "groupName",
            "operator": "INCLUDE",
            "values": ["Pied Piper"]
        }
    ]
}`;

export const networkRuleOutOfNetworkJson = `{
    "uuid": "ea703d40-a073-454e-ae3e-3931e8e2cf5a",
    "name": "Rule 2: UnitedHealthcare | HMO | Hooli Health - OON",
    "status": "OUT_OF_NETWORK",
    "conditions": [
        {
            "key": "payerName",
            "operator": "INCLUDE",
            "values": ["UnitedHealthcare", "United Healthcare"]
        },
        {
            "key": "insuranceTypeCodes",
            "operator": "NOT_INCLUDE",
            "values": ["HM"]
        },
        {
            "key": "relatedEntites",
            "operator": "INCLUDE",
            "values": ["Hooli Health"]
        }
    ]
}`;
