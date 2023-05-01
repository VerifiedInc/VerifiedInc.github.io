import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TooltipWithDefaults from './TooltipWithDefaults';
import Collapsible from 'react-collapsible';

export default ({type, text, children}) => { 
    if (type && tooltips[type]) {
        // Generate a uuid for id and data-for so only one tooltip is generated
        var uuid1 = uuidv4();
        if (children) {
            return (
                <>
                    <TooltipWithDefaults id={uuid1}>
                        {tooltips[type]}
                    </TooltipWithDefaults>
                    <u data-tip data-for={uuid1}>{children}</u>
                </>
            );
        } else {
            return (
                <>
                    <TooltipWithDefaults id={uuid1}>
                        {tooltips[type]}
                    </TooltipWithDefaults>
                    <u data-tip data-for={uuid1}>{type}</u>
                </>
            );
        }
    } else {
        // Generate a uuid for id and data-for so only one tooltip is generated
        var uuid2 = uuidv4();
        return (
            <>
                <TooltipWithDefaults id={uuid2}>
                </TooltipWithDefaults>
                <u data-tip={text} data-for={uuid2}>{children}</u>
            </>
        );
    }
};

const tooltips =  {
    "credential": 
        <>
        <div>
            <b>A <a href="/terminology#credential">credential</a> is a collection of data about a person.</b> It's issued by a company and can be requested by other network participants, gated by the user's consent.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> ACME Lending issues a KYC verification credential to Richard (an ACME user). This includes Richard's contact information and account numbers, as well as a level of confidence in the accuracy of the data.
            </div>
            <div>
                <b>Components:</b> A company issues credentials using the <a href="/server-sdk">Server SDK</a>, and an app stores credentials using the <a href="/mobile-sdk-overview">Mobile SDK</a>.
            </div>
        </Collapsible>
        </>,
    "request":
        <>
        <div>
            <b>A <a href="/terminology#request">request</a> (or <i>credentials request</i>) is a request for a <a href="/terminology#credential">credentials</a> to be shared by a <a href="/terminology#user">user</a>.</b> It's created when a company successfully checks if a user has matching credentials, via <a href="/api-overview#check-user-credentials">/hasMatchingCredentials.</a>  Only if the user has the ability to response with the matching credentials is a request created.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> Hooli FinTech checks if Richard has a SSN and LastName credential issued by ACME Lending. Because he does, a request is created for those credentials specifically from ACME Lending. Hooli presents this request to Richard by directing him to the `url` received in the `/hasMatchingCredentials` response body.
            </div>
            <div>
                <b>Components:</b> A company creates a user specific request by using <a href="/api-overview#check-user-credentials">/hasMatchingCredentials.</a>. If it is case the <a href="/terminology#user">user</a> does not have the desired credentials then a request is not created. If it is the case the user does, a request is created and is returned in the form of a `url` attribute in response to the client. 
            </div>
        </Collapsible>
        </>,
    "user":
    <>
    <div>
        <b>A <a href="/terminology#user">user</a> is an individual in the Verified Inc network.</b> Each user has at least one phone or emails associated with them. They can have multiple of either.
    </div>
    <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
        <div>
            <b>Example:</b> Richard is a user in your account system and potentially of the Verified Inc network. He has two email addresses and one phone with him. Credentials can be issued to or requested of him using any of these identifiers.
        </div>
        <div>
            <b>Components:</b> Referenced in API endpoints `/hasMatchingCredentials` and `/issueCredentials`. User data is associated by using these user identifiers that you already keep on your users.
        </div>
    </Collapsible>
    </>,
    "brand":
    <>
    <div>
        <b>A <a href="/terminology#brand">brand</a> is a company entity that has a corresponding unique api key, name, and card image.</b> Brands can issue, request and receive <a href="/terminology#credential">credentials</a> to and from <a href="/terminology#user">users</a>.
    </div>
    <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
        <div>
            <b>Example:</b> ACME Bank is an Verified Inc customer. However, they have two separate brands: ACME Lending and ACME Savings. Each brand has a unique api key, name, and card image.
        </div>
        <div>
            <b>Components:</b> Each brand has an associated umbrella customer. It is totally okay if your customer only has one brand. We want to have the flexibility to support multiple brands per customer.
        </div>
    </Collapsible>
    </>,
    "customer":
    <>
    <div>
        <b>A <a href="/terminology#customer">customer</a> is a company entity that serves as a parent to brands and their corresponding ApiKeys.</b>
    </div>
    <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
        <div>
            <b>Example:</b> ACME Bank is the Verified Inc customer where their self service dashboard access rights are defined.
        </div>
        <div>
            <b>Components:</b> The admins of the customer can manage individual <a href="/terminology#brand">brand</a> settings.
        </div>
    </Collapsible>
    </>,
}