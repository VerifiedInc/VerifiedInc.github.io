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
            <b>A <a href="/terminology#credential">credential</a> is a collection of data about a person.</b> It's issued by a company (i.e. created and sent to a user) and stored in the company's app, on that user's device.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> ACME Bank issues a KYC verification credential to Richard (an ACME user). This includes Richard's contact information and account numbers, as well as a level of confidence in the accuracy of the data.
            </div>
            <div>
                <b>Components:</b> A company issues credentials using the <a href="/server-sdk">Server SDK</a>, and an app stores credentials using the <a href="/mobile-sdk-overview">Mobile SDK</a>.
            </div>
        </Collapsible>
        </>,
    "presentation": 
        <>
        <div>
            <b>A <a href="/terminology#presentation">presentation</a> is a set of one or more <a href="/terminology#credential">credentials</a>.</b> It's shared with (or <i>presented</i> to) a company by a user.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> Richard shares a presentation of a KYC verification credential (which ACME Bank issued to him) with Hooli FinTech.
            </div>
            <div>
                <b>Components:</b> A user's app shares (or <i>presents</i>) presentations using the <a href="/mobile-sdk-overview">Mobile SDK</a>, and a company verifies presentations using the <a href="/server-sdk">Server SDK</a>.
            </div>
        </Collapsible>
        </>,
    "request":
        <>
        <div>
            <b>A <a href="/terminology#request">request</a> (or <i>presentation request</i>) is a request for a <a href="/terminology#presentation">presentation</a>.</b> It's sent by a company to a user, who chooses whether to share a presentation in response.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> Hooli FinTech sends Richard a request for (a presentation of) a KYC verification credential from ACME Bank.
            </div>
            <div>
                <b>Components:</b> A company creates requests using the <a href="/server-sdk">Server SDK</a> and routes them to users using the <a href="/web-sdk">Web SDK</a>. A user's app responds to requests using the <a href="/mobile-sdk-overview">Mobile SDK</a>.
            </div>
        </Collapsible>
        </>,
    "brand":
        <>
        <div>
            <b>A <a href="/terminology#brand">brand</a> is a company entity that has a corresponding unique api key, name, and card image. Brands can issue, request and receive <a href="/terminology#credential">credentials</a> to and from <a href="/terminology#user">users</a>.</b>
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> ACME Bank is an Unum ID customer. However they have two separate brands: ACME Lending and ACME Savings. Each brand has a unique api key, name, and card image.
            </div>
            <div>
                <b>Components:</b> Each brand has an associated umbrella customer. It is totally okay if your customer only has one brand. We want to have the flexibility to support multiple brands per customer.
            </div>
        </Collapsible>
        </>,
    "user":
    <>
    <div>
        <b>A <a href="/terminology#user">user</a> is an individual in the Unum ID network.</b> Each user one or more phone or email associated with them which are the identifiers used for reference.
    </div>
    <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
        <div>
            <b>Example:</b> Richard is a user in your account system and potentially of the Unum ID network. He has two email addresses and one phone with him. Credentials can be issued to or requested of him using any of these identifiers.
        </div>
        <div>
            <b>Components:</b> Referenced in API endpoints `/hasMatchingCredentials` and `/issueCredentials`. User data is associated by using these user identifiers that you already keep on your users.
        </div>
    </Collapsible>
    </>,
}