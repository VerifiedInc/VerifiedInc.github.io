export const payerAetnaJson = `{
    "name": "Aetna",
    "verifiedId": "V404110",
    "ids": [
        "60054", // ids[0] is considered primary
        "HPQRS",
        "Z95668",
        "10004",
        "953402799",
        "6400",
        "60054MA",
        "4500",
        "AETNA"
    ],
    "logoUrl": "https://assets.verified.inc/1-click/health/payers/11145919-80e4-4cb0-8518-cffbf44ee9fb.png"
}`;

export const payerUnitedHealthcareJson = `{
    "name": "UnitedHealthcare",
    "verifiedId": "V816685",
    "ids": [
        "87726", // ids[0] is considered primary
        "KMQTZ",
        "77082",
        "J87726MA",
        "10655",
        "2721",
        "87726MA",
        "95123",
        "11077",
        "MDC01",
        "10192",
        "14339",
        "3550",
        "3429",
        "UHC",
        "10806",
        "87726E",
        "KPIC1",
        "8455",
        "4523",
        "96107",
        "NGHPRT",
        "6442",
        "WCHEA",
        "10636",
        "10002",
        "72126",
        "UHCMP",
        "6847",
        "JDHS"
    ],
    "logoUrl": "https://assets.verified.inc/1-click/health/payers/ff5e124c-f19f-475c-9757-7fa011e5221a.png"
}`;

// Re-indents every line after the first so a standalone JSON snippet can be
// spliced as a nested value inside a larger JSON example.
export const indentJson = (json, spaces) =>
    json
        .split('\n')
        .map((line, index) => (index === 0 ? line : ' '.repeat(spaces) + line))
        .join('\n');
