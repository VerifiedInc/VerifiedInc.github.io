import { indentJson } from '@site/versioned_docs/version-2.1/reusables/json-utils.js';
import { networkRuleInNetworkJson, networkRuleOutOfNetworkJson } from '@site/versioned_docs/version-2.1/reusables/network-rules-examples-data.js';

export const networkDecisionInNetworkJson = `{
    "status": "IN_NETWORK",
    "rules": [
        ${indentJson(networkRuleInNetworkJson, 8)}
    ]
}`;

export const networkDecisionOutOfNetworkJson = `{
    "status": "OUT_OF_NETWORK",
    "rules": [
        ${indentJson(networkRuleOutOfNetworkJson, 8)}
    ]
}`;

export const networkDecisionIndeterminateJson = `{
    "status": "INDETERMINATE",
    "rules": [
        ${indentJson(networkRuleInNetworkJson, 8)},
        ${indentJson(networkRuleOutOfNetworkJson, 8)}
    ]
}`;