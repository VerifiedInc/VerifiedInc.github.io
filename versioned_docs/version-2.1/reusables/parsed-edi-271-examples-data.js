export const parsedEdi271AetnaJson = `{
    "coverageStatus": "active",
    "coverageType": ["medical"],
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
        "sex": "Male"
    },
    "plan": {
        "name": "Managed Choice Open Access",
        "groupNumber": "123456-123-12345",
        "insuranceType": "C1",
        "effectiveDate": "2026-01-01",
        "terminationDate": "2026-12-31"
    },
    "benefits": [
        {
            "type": "deductible",
            "serviceTypeCodes": "[30]",
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
            "serviceTypeCodes": "[30]",
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
        "sex": "Male"
    },
    "plan": {
        "name": "Choice Plus",
        "groupNumber": "1234567",
        "insuranceType": "C1",
        "effectiveDate": "2026-01-01",
        "terminationDate": "2026-12-31"
    },
    "benefits": [
        {
            "type": "deductible",
            "serviceTypeCodes": "[30]",
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
            "serviceTypeCodes": "[30]",
            "phone": "8005550002",
            "fax": "8005550003",
            "email": "memberservices@uhc.com",
            "url": "https://uhc.com/member-services"
        },
        ...
    ]
}`;
