import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TooltipWithDefaults from './TooltipWithDefaults';

export default ({type, text, children}) => { 
    if (type && tooltips[type]) {
        // Generate a uuid for id and data-for so only one tooltip is generated
        var uuid1 = uuidv4();
        return (
            <>
                <TooltipWithDefaults id={uuid1}>
                    {tooltips[type]}
                </TooltipWithDefaults>
                <u data-tip data-for={uuid1}>{type}</u>
            </>
        );
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
        <b>A <a href="/terminology#credential">credential</a> is a collection of data about a person.</b> For example, it could include bank account data, proof of valid government ID, or contact information.
        <br/><br/>
        See also:
        <ul>
            <li><a href="/terminology#presentation">presentation</a></li>
            <li><a href="/terminology#request">request</a></li>
        </ul>
        </>,
    "presentation": 
        <>
        <b>A <a href="/terminology#presentation">presentation</a> is a set of one or more <a href="#credential">credentials</a>.</b>
        </>,
    "request":
        <>
        <b>A <a href="/terminology#request">request</a> (or <i>presentation request</i>) is a request for a <a href="#presentation">presentation</a>.</b>
        </>,
    "issuer":
        <>
        <b>An <a href="/terminlology#issuer">issuer</a> issues <a href="#credential">credentials</a> to <a href="#subject">subjects</a>.</b> It's a role played by an Unum ID customer using the <a href="/server-sdk">Server SDK</a>.
        </>,
    "holder app":
        <>
        <b>A <a href="/terminology#holder-app">holder app</a> is a mobile app using the <a href="#">Mobile SDK</a>.</b>
        </>,
    "holder":
        <>
        <b>A <a href="/terminology#holder">holder</a> is an instance of a <a href="#">holder app</a>, installed on a particular device.</b> A <a href="#">subject</a> uses a holder to receive <a href="#">credentials</a> from <a href="#">issuers</a> and respond to <a href="#">requests</a> from <a href="#">verifiers</a>.
        </>,
    "subject":
        <>
        <b>A <a href="/terminology#subject">subject</a> is a user of a <a href="#">holder app</a>.</b>
        </>,
    "verifier":
        <>
        <b>A <a href="/terminology#verifier">verifier</a> verifies <a href="#">presentations</a> presented by <a href="#">holders</a> on behalf of <a href="#">subjects</a>.</b> It's a role played by an Unum ID customer using the <a href="/server-sdk">Server SDK</a>.
        </>,
}