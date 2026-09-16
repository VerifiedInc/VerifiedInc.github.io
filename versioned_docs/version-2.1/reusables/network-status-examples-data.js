import { indentJson } from '@site/versioned_docs/version-2.1/reusables/json-utils.js';
import { networkRuleInNetworkJson, networkRuleOutOfNetworkJson } from '@site/versioned_docs/version-2.1/reusables/network-rules-examples-data.js';

export const networkStatusInNetworkJson = `{
    "status": "IN_NETWORK",
    "rules": [
        ${indentJson(networkRuleInNetworkJson, 8)}
    ]
}`;

export const networkStatusOutOfNetworkJson = `{
    "status": "OUT_OF_NETWORK",
    "rules": [
        ${indentJson(networkRuleOutOfNetworkJson, 8)}
    ]
}`;

export const networkStatusIndeterminateJson = `{
    "status": "INDETERMINATE",
    "rules": [
        ${indentJson(networkRuleInNetworkJson, 8)},
        ${indentJson(networkRuleOutOfNetworkJson, 8)}
    ]
}`;