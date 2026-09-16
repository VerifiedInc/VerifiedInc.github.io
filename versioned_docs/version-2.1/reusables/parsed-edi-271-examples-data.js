export const parsedEdi271AetnaJson = `{
    "coverageStatus": "active",
    "coverageType": ["medical"],
    "serviceTypeCodes": ["30"],
    "payer": {
        "name": "Aetna",
    },
    "member": {
        "memberId": "A484069",
        "fullName": {
            "firstName": "Richard",
            "lastName": "Hendricks"
        },
        "birthDate": "1989-08-01",
        "sex": "Male",
        "address": {
            "line1": "5320 Newell Rd",
            "line2": "",
            "city": "Palo Alto",
            "state": "CA",
            "zipCode": "94303"
        }
    },
    "plan": {
        "name": "Managed Choice Open Access",
        "groupNumber": "123456-123-12345",
        "groupName": "PiedPiper",
        "insuranceTypeCodes": ["C1"],
        "effectiveDate": "2026-01-01",
        "terminationDate": "2026-12-31"
    },
    "benefits": [
        {
            "type": "deductible",
            "serviceTypeCodes": ["30"],
            "insuranceTypeCode": "C1",
            "level": "individual",
            "network": "in",
            "amount": "1500.00",
            "remaining": "750.00",
            "percent": "0.20"
        },
        ...
    ],
    "contacts": [
        {
            "name": "Aetna Member Services",
            "serviceTypeCodes": ["30"],
            "phone": "8005550000",
            "fax": "8005550001",
            "email": "memberservices@aetna.com",
            "url": "https://aetna.com/member-services"
        },
        ...
    ]
}`;

export const parsedEdi271UnitedHealthcareJson = `{
    "coverageStatus": "active",
    "coverageType": ["medical"],
    "serviceTypeCodes": ["30"],
    "payer": {
        "name": "UnitedHealthcare",
    },
    "member": {
        "memberId": "B231615071",
        "fullName": {
            "firstName": "Richard",
            "lastName": "Hendricks"
        },
        "birthDate": "1989-08-01",
        "sex": "Male",
        "address": {
            "line1": "5320 Newell Rd",
            "line2": "",
            "city": "Palo Alto",
            "state": "CA",
            "zipCode": "94303"
        }
    },
    "plan": {
        "name": "Choice Plus",
        "groupNumber": "1234567",
        "groupName": "PiedPiper",
        "insuranceTypeCodes": ["C1"],
        "effectiveDate": "2026-01-01",
        "terminationDate": "2026-12-31"
    },
    "benefits": [
        {
            "type": "deductible",
            "serviceTypeCodes": ["30"],
            "insuranceTypeCode": "C1",
            "level": "individual",
            "network": "in",
            "amount": "1500.00",
            "remaining": "750.00",
            "percent": "0.20"
        },
        ...
    ],
    "contacts": [
        {
            "name": "UnitedHealthcare Member Services",
            "serviceTypeCodes": ["30"],
            "phone": "8005550002",
            "fax": "8005550003",
            "email": "memberservices@uhc.com",
            "url": "https://uhc.com/member-services"
        },
        ...
    ]
}`;
