(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{88:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return d}));var r=a(3),i=a(7),n=(a(0),a(102)),s=(a(104),a(105)),o={id:"quick-start-guide",title:"Quick Start Guide",sidebar_label:"Quick Start Guide",slug:"/quick-start-guide"},c={unversionedId:"quick-start-guide",id:"quick-start-guide",isDocsHomePage:!1,title:"Quick Start Guide",description:"Get started with an Unum ID deployment.",source:"@site/docs/quick-start-guide.mdx",slug:"/quick-start-guide",permalink:"/quick-start-guide",version:"current",sidebar_label:"Quick Start Guide",sidebar:"sidebar",previous:{title:"Privacy and Security",permalink:"/privacy-and-security"},next:{title:"Server SDK",permalink:"/server-sdk"}},l=[{value:"Dashboard",id:"dashboard",children:[]},{value:"API Keys",id:"api-keys",children:[]},{value:"Server SDK",id:"server-sdk",children:[{value:"Node.js",id:"nodejs",children:[]},{value:"Other Runtime Languages",id:"other-runtime-languages",children:[]}]},{value:"Issue Credentials",id:"issue-credentials",children:[{value:"Associate Users with DIDs",id:"associate-users-with-dids",children:[]},{value:"Giving Users Credentials",id:"giving-users-credentials",children:[]}]},{value:"Requesting Credentials",id:"requesting-credentials",children:[]}],b={toc:l};function d(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(n.b)("wrapper",Object(r.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Get started with an Unum ID deployment.")),Object(n.b)("p",null,"This guide provides an abbreviated step-by-step guide for how to get setup as an Unum ID ",Object(n.b)(s.a,{type:"issuer",mdxType:"Tip"})," and/or ",Object(n.b)(s.a,{type:"verifier",mdxType:"Tip"}),". For full technical details, see the documentation for each component."),Object(n.b)("h2",{id:"dashboard"},"Dashboard"),Object(n.b)("p",null,"The Unum ID Dashboard is a self-service portal where you can manage your organization's API keys and view usage statistics. To gain access:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Go to the Unum ID ",Object(n.b)("a",{parentName:"strong",href:"https://dashboard.unumid.co/"},"dashboard"),".")),Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Scan the QR code on the login page with your mobile device.")," This will take you to the Unum ID Wallet, where you'll need to create an account if you don't have one already."),Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Click the Share Data button when the Wallet prompts you.")," This shares your verified email with the Dashboard, so it can create an account for you.")),Object(n.b)("h2",{id:"api-keys"},"API Keys"),Object(n.b)("p",null,"Using the Dashboard, you can create and manage issuer and verifier API keys. To create an API key:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"On the Company page, click the Entities tab."))),Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Click the Create Issuer or Create Verifier to create an API key.")," The issuer API key requires a name and ID card image. The ID card image is displayed in users' wallets when you issue credentials to them. The verifier API key only requires a name."))),Object(n.b)("h2",{id:"server-sdk"},"Server SDK"),Object(n.b)("p",null,"After creating an issuer or verifier API key, you should use it with the ",Object(n.b)("a",{parentName:"p",href:"https://github.com/UnumID/server-sdk-typescript"},"Server SDK")," to register the issuer or verifier entity. This registration must be done on your server, not Unum ID's, because it involves generate private keys, which only your organization should ever access. You should store these keys securely in your own persisted data store. To register an issuer or verifier:"),Object(n.b)("h3",{id:"nodejs"},"Node.js"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"If using Node.js, install the SDK ",Object(n.b)("a",{parentName:"strong",href:"https://www.npmjs.com/package/@unumid/server-sdk"},"module")," using ",Object(n.b)("inlineCode",{parentName:"strong"},"npm i @unumid/server-sdk"),"."))),Object(n.b)("h3",{id:"other-runtime-languages"},"Other Runtime Languages"),Object(n.b)("p",null,"If using a different runtime language, you can use the SDK via HTTP. To deploy the ",Object(n.b)("a",{parentName:"p",href:"https://github.com/UnumID/issuer-verifier-app"},"Issuer-Verifier")," HTTP wrapper project:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Go to the open source Issuer-Verifier Github ",Object(n.b)("a",{parentName:"strong",href:"https://github.com/UnumID/issuer-verifier-app"},"repo"),"."))),Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Pull the project and deploy it along side your other apps using whatever method you are most comfortable with.")," The project contains a Dockerfile and as well as a CircleCI CD config file for automated deployments."))),Object(n.b)("p",null,Object(n.b)("em",{parentName:"p"},"Coming Soon: Publicly accessible docker image repository.")),Object(n.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(n.b)("div",{parentName:"div",className:"admonition-heading"},Object(n.b)("h5",{parentName:"div"},Object(n.b)("span",{parentName:"h5",className:"admonition-icon"},Object(n.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(n.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(n.b)("div",{parentName:"div",className:"admonition-content"},Object(n.b)("p",{parentName:"div"},"An example demo project that interfaces with the SDK over HTTP is the ",Object(n.b)("a",{parentName:"p",href:"/developer-demo"},"Developer Demo"),"."))),Object(n.b)("h4",{id:"register-issuer"},"Register Issuer"),Object(n.b)("p",null,"Once the Server SDK is accessible and there is a persisted data store available, you can register an issuer:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Use the SDK's ",Object(n.b)("a",{parentName:"strong",href:"https://docs.unumid.co/server-sdk#registerissuer"},Object(n.b)("inlineCode",{parentName:"a"},"registerIssuer"))," method with your respective API key."))),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Example registerIssuer"',title:'"Example','registerIssuer"':!0},"const response = await registerIssuer('U7nbHmEpmZuRZMTA2ItFltan64SGKoDLYn7cMnpe4w2=', 'https://api.acme.com');\n")),Object(n.b)("ol",{start:2},Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Securely store the private signing and encryption keys this returns, along with the ",Object(n.b)(s.a,{type:"DID",mdxType:"Tip"})," and authorization token."))),Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Create a ",Object(n.b)("inlineCode",{parentName:"strong"},"/userCredentialRequests")," endpoint, adhering to our OpenApi ",Object(n.b)("a",{parentName:"strong",href:"https://gist.github.com/UnumIDMachine/146a0a428c683b756efd8240b31a4678"},"specification"),".")," This will allow you to receive signed ",Object(n.b)(s.a,{type:"subject",mdxType:"Tip"})," credential requests and user DID information from Unum ID. Our demo applications show examples of this."))),Object(n.b)("h4",{id:"register-verifier"},"Register Verifier"),Object(n.b)("p",null,"Once the Server SDK is accessible and there is a persisted data store available, you can register a verifier:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Use the SDK's ",Object(n.b)("a",{parentName:"strong",href:"https://docs.unumid.co/server-sdk#registerverifier"},Object(n.b)("inlineCode",{parentName:"a"},"registerVerifier"))," method with your respective API key."))),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Example registerVerifier"',title:'"Example','registerVerifier"':!0},"const response = await registerVerifier('0Hner7ibF/aHWLBvUyY4iDJ1xymbef0lzMxiS0eTGoS=', 'https://api.acme.com');\n")),Object(n.b)("ol",{start:2},Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Securely store the private signing and encryption keys this returns, along with the ",Object(n.b)(s.a,{type:"DID",mdxType:"Tip"})," and authorization token."))),Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Create a ",Object(n.b)("inlineCode",{parentName:"strong"},"/presentation")," endpoint, adhering to our OpenApi ",Object(n.b)("a",{parentName:"strong",href:"https://gist.github.com/UnumIDMachine/a2d71f12b0596a62c9dcc4de7a255f4f"},"specification"),".")," This will allow you to receive encrypted ",Object(n.b)(s.a,{type:"presentation",mdxType:"Tip"})," data from our Identity Engine cloud. Our demo applications show examples of this."))),Object(n.b)("h2",{id:"issue-credentials"},"Issue Credentials"),Object(n.b)("p",null,"Once you have registered an issuer, stored the returned private signing and encryption keys along with the DID, and have the ",Object(n.b)("inlineCode",{parentName:"p"},"/userCredentialRequests")," endpoint, you can issue credentials to users. However, users must also have a DID and key pairs to properly receive (and eventually share) encrypted credentials. They need to have their Unum ID Wallet setup. To associate a user with a DID and prompt them to create a Wallet account, you will need to:"),Object(n.b)("h3",{id:"associate-users-with-dids"},"Associate Users with DIDs"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Create and persist a unique, short-lived, one-time-use ",Object(n.b)("inlineCode",{parentName:"strong"},"userCode")," to identity your user."))),Object(n.b)("li",{parentName:"ol"},Object(n.b)("p",{parentName:"li"},Object(n.b)("strong",{parentName:"p"},"Redirect to the Unum ID Wallet (",Object(n.b)("a",{parentName:"strong",href:"https://wallet.unumid.co"},"https://wallet.unumid.co"),"), adding the ",Object(n.b)("inlineCode",{parentName:"strong"},"userCode")," and your issuer DID as URL parameters.")," For example:"))),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre"},"https://wallet.unumid.co/authenticate?userCode=f85fc85b-7467-4b3f-8581-f138d8b4798g&issuer=did:unum:8b642752-aa85-491a-80d3-cd6c0ef9426n\n")),Object(n.b)("p",null,"This will prompt the user to input and verify their email and pass a biometric check. When they do so, the Unum ID Wallet will call your issuer URL on the ",Object(n.b)("inlineCode",{parentName:"p"},"/userCredentialRequests")," endpoint with the ",Object(n.b)("inlineCode",{parentName:"p"},"userDidAssociation")," attribute populated with the ",Object(n.b)("inlineCode",{parentName:"p"},"userCode")," and the newly created user ",Object(n.b)("inlineCode",{parentName:"p"},"DID"),"."),Object(n.b)("ol",{start:3},Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Store the user ",Object(n.b)("inlineCode",{parentName:"strong"},"DID")," from the callback response on your user entity.")," The ",Object(n.b)("inlineCode",{parentName:"li"},"userCode")," attribute you created in step (1) should be deleted from the user entity at this point.")),Object(n.b)("h3",{id:"giving-users-credentials"},"Giving Users Credentials"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Use the Server SDK's ",Object(n.b)("a",{parentName:"strong",href:"https://docs.unumid.co/server-sdk#issuecredentials"},Object(n.b)("inlineCode",{parentName:"a"},"issueCredentials"))," method to issue credentials to the user.")," For example: ")),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Example issueCredentials"',title:'"Example','issueCredentials"':!0},"const result: UnumDto<CredentialPb> = await issueCredentials(\n      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1dWlkIjoiODg1ZDQxZjktYWFiNS00YTQ1LWE2ZTUtYWY1NjM1YjlkNGI5IiwiZGlkIjpudWxsLCJlbWFpbCI6InJheSs4MDAwQHVudW1pZC5jbyIsImlhdCI6MTY1NDMwODUxNCwiZXhwIjoxNjYyOTQ4NTE0LCJhdWQiOiJsb2NhbGhvc3QiLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6Ijg4NWQ0MWY5LWFhYjUtNGE0NS1hNmU1LWFmNTYzNWI5ZDRiOSIsImp0aSI6ImJjOTNjNGMyLTg5NDQtNDMxYS1iZTY5LTQ2ZjBjNDA2MjBjYSJ9.zS5ZWBxjotHpuBHUN3pDn8J8ygDFYGD3ASmJVYSt7Wc',\n      'did:unum:8b642752-aa85-491a-80d3-cd6c0ef9426n',\n      'did:unum:a0cd2e20-5f3e-423c-8382-afc722eaca9e',\n      [{\n          'type': 'SsnCredential',\n          'ssn': '123-45-5678\n      }],\n      '-----BEGIN PRIVATE KEY-----\\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgw7wRQL1EUsLk08auyjhlHV0atw0wqQGjtP3wkAIz8uChRANCAARfUK8OjrArOokLQau9W3siHlxxtt9/FGjdiiL1YM8PqHqhmgscc6oSdUUKfA/HZaf9m2yEQqQPyoFR1R16Ck/8\\n-----END PRIVATE KEY-----'\n    );\n")),Object(n.b)("h2",{id:"requesting-credentials"},"Requesting Credentials"),Object(n.b)("p",null,"Once you have registered a verifier, you can make a presentation ",Object(n.b)(s.a,{type:"request",mdxType:"Tip"}),". (There is no requirement to issue credentials in order to make such a request.) To make a request:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Use the Server SDK's ",Object(n.b)("a",{parentName:"strong",href:"https://docs.unumid.co/server-sdk#sendrequest"},Object(n.b)("inlineCode",{parentName:"a"},"sendRequest"))," method along with your verifier authorization token."))),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Example sendRequest"',title:'"Example','sendRequest"':!0},"const response = await sendRequest(\n    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidmVyaWZpZXIiLCJ1dWlkIjoiNWJmZTZkNzktMzdkNy00ODNiLTgyZGMtYzZhYWJhMjUzOTE2IiwiZGlkIjoiZGlkOnVudW06ZDdhZDczMWUtNzBkNy00MzQxLWJlNGQtM2U3ZWIwNmRmNzZlIiwiZXhwIjoxNjQzMTc0NjM4Ljc4NCwiaWF0IjoxNjQzMTc0NjcyfQ.WLNlP-A_8DjTvmmKt6z8CfD6whh5aQHIYgT9nYjuPn0',\n    'did:unum:d7ad731e-70d7-4341-be4d-3e7eb06df76e',\n    [\n        {\n            'type':'EmailCredential',\n            'issuers': [\n                'did:unum:8b642752-aa85-491a-80d3-cd6c0ef9426n'\n            ], \n            'required': true\n        }\n    ],\n    '-----BEGIN PRIVATE KEY-----\\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgw7wRQL1EUsLk08auyjhlHV0atw0wqQGjtP3wkAIz8uChRANCAARfUK8OjrArOokLQau9W3siHlxxtt9/FGjdiiL1YM8PqHqhmgscc6oSdUUKfA/HZaf9m2yEQqQPyoFR1R16Ck/8\\n-----END PRIVATE KEY-----',\n    '7a1b0e37-efda-4b92-873b-ad7a8491175d'\n);\n")),Object(n.b)("ol",{start:2},Object(n.b)("li",{parentName:"ol"},Object(n.b)("strong",{parentName:"li"},"Direct the user to the response's ",Object(n.b)("inlineCode",{parentName:"strong"},"deeplink")," URL for them to use the Unum ID Wallet to respond to the request by sharing their data."))))}d.isMDXComponent=!0}}]);