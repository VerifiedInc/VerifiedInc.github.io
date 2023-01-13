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
    "issuer":
        <>
        <div>
            <b>An <a href="/terminology#issuer">issuer</a> is a role a company can play to issue <a href="/terminology#credential">credentials</a> to <a href="/terminology#subject">subjects</a> (users).</b> An issuer also change credential statuses, for example to revoke credentials.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> ACME Bank issues a KYC verification credential to Richard (an ACME user). It later revokes that credential and issues a new one to Richard to update his information.
            </div>
            <div>
                <b>Components:</b> An issuer issues credentials and changes credential statuses using the <a href="/server-sdk">Server SDK</a>.
            </div>
        </Collapsible>
        </>,
    "holder app":
        <>
        <div>
            <b>A <a href="/terminology#holder-app">holder app</a> is an Unum ID enabled mobile app.</b> <i>See also: <a href="/terminology#holder-app">holder</a>.</i>
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> ACME Bank adds Unum ID technology to its mobile app, making it a holder app.
            </div>
            <div>
                <b>Components:</b> A holder app is one using the <a href="/mobile-sdk-overview">Mobile SDK</a>.
            </div>
        </Collapsible>
        </>,
    "holder":
        <>
        <div>
            <b>A <a href="/terminology#holder">holder</a> is an instance of a <a href="#">holder app</a>, installed on a particular device.</b> It stores (or <i>holds</i>) <a href="/terminology#credential">credentials</a> for a <a href="/terminology#subject">subject</a> (user). It also allows the subject to respond to <a href="/terminology#request">requests</a> with <a href="presentation">presentations</a>.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> The ACME Bank app (installed on Richard's phone) stores a KYC verification credential for Richard. When Hooli FinTech requests an ACME KYC verification, the app lets Richard respond with a presentation of the KYC verification credential.
            </div>
            <div>
                <b>Components:</b> A holder app is one using the <a href="/mobile-sdk-overview">Mobile SDK</a>, and a holder is an instance of that installed on a particular device.
            </div>
        </Collapsible>
        </>,
    "subject":
        <>
        <div>
            <b>A <a href="/terminology#subject">subject</a> is a user of a <a href="terminology#holder-app">holder app</a>.</b> Each subject uses one or more <a href="terminology#holders">holders</a>.
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> Richard is a subject (user) of the ACME Bank mobile app. He uses two holders: the app installed on his phone and his tablet.
            </div>
            <div>
                <b>Components:</b> A holder app is one using the <a href="/mobile-sdk-overview">Mobile SDK</a>, and a holder is an instance of that installed on a particular device. A subject uses one or more holders.
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
    "verifier":
        <>
        <div>
            <b>A <a href="/terminology#verifier">verifier</a> is a role a company can play to verify <a href="/terminology#presentation">presentations</a> shared by <a href="/terminology#subject">subjects</a> (users). A verifier can also make <a href="/terminology#request">requests</a> for presentations and send them to subjects.</b>
        </div>
        <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
            <div>
                <b>Example:</b> Hooli FinTech sends Richard a request for (a presentation of) a KYC verification credential from ACME Bank. When Richard shares the presentation, Hooli verifies it.
            </div>
            <div>
                <b>Components:</b> A verifier requests and verifies presentations using the <a href="/server-sdk">Server SDK</a>.
            </div>
        </Collapsible>
        </>,
    "DID":
    <>
    <div>
        <b>A <a href="/terminology#DID">DID</a> (or <i>decentralized identifier</i>) identifies a participant in the Unum ID ecosystem.</b> A participant is an <a href="/terminology#issuer">issuer</a>, <a href="/terminology#subject">subject</a>, or <a href="/terminology#verifier">verifier</a>.
    </div>
    <Collapsible trigger="+ More..." triggerWhenOpen="- Less">
        <div>
            <b>Example:</b> ACME Bank is identified by two DIDs, one for acting as an issuer and another for acting as a verifier. Richard, an ACME subject (user), is identified by one DID. Hooli FinTech, which acts as a verifier, is identified by one DID.
        </div>
        <div>
            <b>Components:</b> The <a href="/server-sdk">Server SDK</a> returns DIDs for issuers and verifiers, and the <a href="/mobile-sdk">Mobile SDK</a> returns DIDs for subjects.
        </div>
    </Collapsible>
    </>,
}