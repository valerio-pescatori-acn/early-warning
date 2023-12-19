const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser"),
    port = 3070;

const dummyAuthGroups = require('./MockData/DummyAuthGroups.json');
const dummyRules = require('./MockData/DummyRules.json');
const dummyOverStatusDescriptions = require('./MockData/DummyOverStatusDescriptions.json');
const dummyUserInfo = require('./MockData/DummyUserInfo.json');
const dummyBids = require('./MockData/DummyBids.json');
const dummyExtendedBids = require('./MockData/DummyExtendedBids.json')
const dummyBidDetails_1000000878 = require('./MockData/DummyBidDetails_1000000878.json');
const dummyBidDetails_1000001161 = require('./MockData/DummyBidDetails_1000001161.json');
const projectList = require('./MockData/projectList.json');
const dummyBidDetails_1000001162 = require('./MockData/DummyBidDetails_1000001162.json');
const dummyBidDetails_1000001198 = require('./MockData/DummyBidDetails_1000001198.json');
const dummyBidDetails_2000000528 = require('./MockData/DummyBidDetails_2000000528.json');
const dummyBidDetails_2000001036 = require('./MockData/DummyBidDetails_2000001036.json');
const dummyBidDetails_2000001205 = require('./MockData/DummyBidDetails_2000001205.json');
const dummyBidDetails_3000000001 = require('./MockData/DummyBidDetails_3000000001.json');
const dummyBidDetails_1000001226 = require('./MockData/DummyBidDetails_1000001226.json');

const dummyRequests = require('./MockData/DummyRequests.json');
const dummyBusinessPartners = require('./MockData/DummyBusinessPartners.json');
const dummyCollaborators = require('./MockData/DummyCollaborators.json');
const dummyIPADetails = require('./MockData/DummyIPADetails.json');
const dummyIPADetailsEnelROSSI = require('./MockData/dummyIPADetailsEnelROSSI.json');
const dummyIPADetailsEnel = require('./MockData/dummyIPADetailsEnel.json');


const dummyIPADetailsError = require('./MockData/DummyIPADetailsError.json');
const dummyCUPCodeVerificationResponseOK = require('./MockData/DummyCUPCodeVerificationResponseOK.json');
const dummyCUPCodeVerificationResponseKO = require('./MockData/DummyCUPCodeVerificationResponseKO.json');
const dummyAttachments = require('./MockData/DummyAttachments.json');
const dummyVerificationEmailOK = require('./MockData/DummyVerificationEmailOK.json');

const RequestsUsers = require('./MockData/RequestsUsers.json');
const RequestsAll = require('./MockData/RequestsAll.json');
const RequestsAdd = require('./MockData/RequestsAdd.json');
const RegisUsers = require('./MockData/RegisUsers.json');
const LetturaTabGestioneWorkflow = require('./MockData/LetturaTabGestioneWorkflow.json');
const MacroTipologiaRichieste = require('./MockData/MacroTipologiaRichieste.json');
const TipologiaRichiesteSet = require('./MockData/TipologiaRichiesteSet.json');

const compareStrings = (a, b) => {
    const sa = (a ? a.toString().toUpperCase() : a);
    const sb = (b ? b.toString().toUpperCase() : b);
    if (sa < sb) {
        return -1;
    }
    if (sa > sb) {
        return 1;
    }
    return 0;
}

const sortByAplicationIDAsc = (a, b) => compareStrings(a.ApplicationID, b.ApplicationID);
const sortByAplicationIDDesc = (a, b) => compareStrings(b.ApplicationID, a.ApplicationID);

const sortByPriorityAsc = (a, b) => compareStrings(a.Priority, b.Priority);
const sortByPriorityDesc = (a, b) => compareStrings(b.Priority, a.Priority);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/checkGlobalUser', (req, res) => {
    res.json(dummyUserInfo);
    //res.json(dummyNoUserInfo)
});

app.get('/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_CDS/ZGTR_AUTHENTICATION_BP(:cf)/Set', (req, res) => {
    res.json(dummyBusinessPartners);
});

//        const URL2 = `S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ToggleFirstAccess?BusinessPartnerID='${businessPartnerID}'&UserFiscalCode='${userFiscalCode}'`;

app.post(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ToggleFirstAccess`, (req, res) => {
    let payload = {
        "d": {
            "__metadata": {
                "id": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('1000000289')",
                "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('1000000289')",
                "type": "ZCRM_GPM_APPLICATION_SRV.ActionMessage"
            },
            "CoworkerTaxNum": "BNCMRA22P23H501Z",
            "msgid": "",
            "msgnumber": "",
            "msgtext": "",
            "msgtype": "",
            "msgv1": "",
            "msgv2": "",
            "msgv3": "",
            "msgv4": "",
            "ChangedAt": "20220810065225"
        }
    };
    res.json(payload);
});


app.get('/GT_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_CDS/ZGTR_AUTHENTICATION_BP(:cf)/Set', (req, res) => {
    res.json(dummyBusinessPartners);
});


app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_AUTH_GROUP_CDS/ZCRM_AUTH_GROUP', (req, res) => {
    res.json(dummyAuthGroups);
});

app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_AUTH_GROUP_CDS/ZCRM_AUTH_GROUP(:authGroupId)', (req, res) => {
    const authGroups = dummyAuthGroups.d.results.filter(f => f.AuthGroupID === req.params.authGroupId.replace(/\W/g, ''));
    const payload = { d: authGroups[0] };
    res.json(payload);
});

app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_RULES_CDS/ZCRM_GPM_RULES', (req, res) => {
    res.json(dummyRules);
});

app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_OVERSTATUSDESCRIPTION_CDS/ZCRM_OVERSTATUSDESCRIPTION', (req, res) => {
    res.json(dummyOverStatusDescriptions);
});

app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ApplicationFormMediaCollection(:appId)/\\$value', (req, res) => {
    setTimeout(() => {
        res.sendFile(__dirname + '/entity.pdf');
    }, 2000);

});

app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ApplicationFormMediaCollection(:objectId,:objectType,:objectClass,:objId)/\\$value', (req, res) => {
    setTimeout(() => {
        res.sendFile(__dirname + '/entity.pdf');
    }, 1000);

});

app.post(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/SetDownloadFormEvent`, (req, res) => {
    let payload = {
        "d": {
            "__metadata": {
                "id": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('1000000289')",
                "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('1000000289')",
                "type": "ZCRM_GPM_APPLICATION_SRV.ActionMessage"
            },
            "ApplicationID": "1000000289",
            "msgid": "",
            "msgnumber": "",
            "msgtext": "",
            "msgtype": "",
            "msgv1": "",
            "msgv2": "",
            "msgv3": "",
            "msgv4": "",
            "ChangedAt": "20220810065225"
        }
    };
    res.json(payload);
});

app.post(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/StatusChange`, (req, res) => {
    let payload = {
        "d": {
            "__metadata": {
                "id": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('')",
                "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ActionMessageCollection('')",
                "type": "ZCRM_GPM_APPLICATION_SRV.ActionMessage"
            },
            "ApplicationID": "",
            "msgid": "ZCRM_GPM_CM_API_APPL",
            "msgnumber": "008",
            "msgtext": "Modifica dello stato in Ricevuta (E0001) eseguita con successo nella Richiesta 1000000289",
            "msgtype": "S",
            "msgv1": "Ricevuta",
            "msgv2": "E0001",
            "msgv3": "1000000289",
            "msgv4": "",
            "ChangedAt": ""
        }
    };
    res.json(payload);
});


app.get('/', (req, res) => {
    res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});


/* BIDS */

// get all the bids for a given business partner
app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_PROG_FOR_BP_CDS/ZCRM_PROG_FOR_BP(:bp)/Set', (req, res) => {
    setTimeout(() => {
        let bids = dummyBids.d.results;
        if (req.query.$filter) {
            let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
            const ProgramID = arr[0];

            if (ProgramID) bids = bids.filter(f => f.ProgramID === ProgramID.replace(/\W/g, ''));
        }
        res.json({ d: { results: bids } });
    }, 1000);
});

// get all the extended bids for a given business partner
app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_PROG_FOR_ALL_CDS/ZCRM_PROG_FOR_ALL(:bp)/Set', (req, res) => {
    setTimeout(() => {
        let bids = dummyExtendedBids.d.results;
        if (req.query.$filter) {
            let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
            const ProgramID = arr[0];

            if (ProgramID) bids = bids.filter(f => f.ProgramID === ProgramID.replace(/\W/g, ''));
        }
        res.json({ d: { results: bids } });
    }, 2000);
});

// get the bid details of a given bid
app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_PROGRAMS_SRV/ZCRM_GPM_PROGRAMS(:bidId)', (req, res) => {
    const bidId = req.params.bidId.replace(/\W/g, '');
    switch (bidId) {
        case "1000000878":
            res.json(dummyBidDetails_1000000878);
            break;
        case "1000001161":
            res.json(dummyBidDetails_1000001161);
            break;
        case "1000001162":
            res.json(dummyBidDetails_1000001162);
            break;
        case "1000001198":
            res.json(dummyBidDetails_1000001198);
            break;
        case "2000000528":
            res.json(dummyBidDetails_2000000528);
            break;
        case "2000001036":
            res.json(dummyBidDetails_2000001036);
            break;
        case "2000001205":
            res.json(dummyBidDetails_2000001205);
            break;
        case "3000000001":
            res.json(dummyBidDetails_3000000001);
            break;
        case "1000001226":
            res.json(dummyBidDetails_1000001226);
            break;
        default:
            res.json(dummyBidDetails_2000001036);
            break;
    }
});

/* REQUESTS */

// get requests with filter and sort
app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION', (req, res) => {
    //setTimeout(() => {
    let requests = dummyRequests.d.results;
    if (req.query.$filter) {
        let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
        const BPID = arr[0];
        if (BPID) requests = requests.filter(f => f.BPID === BPID.replace(/\W/g, ''));
    }
    res.json({ d: { results: requests } });
    //}, 5000);
});

// count requests with filter
app.get('/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION/\\$count', (req, res) => {
    //setTimeout(() => {
    let requests = dummyRequests.d.results;
    if (req.query.$filter) {
        let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
        const BPID = arr[0];
        const ApplicationPostingDate = arr[1];
        if (BPID) requests = requests.filter(f => f.BPID === BPID.replace(/\W/g, ''));
        //if (ApplicationPostingDate) requests = requests.filter(f => f.Priority === Priority.replace(/\W/g, ''));
    }
    res.json(requests.length);
    //}, 5000);
});

// get a given application by id
app.get(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION(:appId)`, (req, res) => {
    const requests = dummyRequests.d.results.filter(f => f.ApplicationID === req.params.appId.replace(/\W/g, ''));
    const payload = { d: requests[0] };
    res.json(payload);
});

// get a given application by id expanding to item
app.get(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION(:appId)/to_item`, (req, res) => {
    const requests = dummyRequests.d.results.filter(f => f.ApplicationID === req.params.appId.replace(/\W/g, ''));
    const payload = { d: requests[0].to_item };
    res.json(payload);
});

// create a new application on CRM
app.post(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION`, (req, res) => {
    let payload = {
        "d": {
            "__metadata": {
                "id": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')",
                "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')",
                "type": "ZCRM_GPM_APPLICATION_SRV.ZCRM_GPM_APPLICATIONType"
            },
            "ApplicationID": "1000000270",
            "ProgramSubmissionStartDate": "20220531220000",
            "ProgramSubmissionEndDate": "20221230230000",
            "SubOperationID": "M1C1I1.4.6",
            "cupCode": "1234",
            "ChangedAt": (new Date()).toISOString().replace(/\D/g, '').slice(0, 14),
            "Stsma": "ZGAPH",
            "Status": "E0011",
            "StatusDescription": "In lavorazione",
            "OverStatusDescription": "In lavorazione",
            "StatusGroup": "01",
            "ApplicationGUID": "00505686-6f3d-1eed-8dce-1cd51c281c55",
            "StatusEditable": true,
            "BPID": "0050001007",
            "TaxNum": "81008080210",
            "BPType": "2",
            "BPDescription": "EBNR SPINGES",
            "ApplicationLongText": "STRADA COMUNALE VIA XXV APRILE*VIA XXV APRILE*CONSOLIDAMENTO TRATTO IN DISSESTO",
            "NoteFromAdmin": "",
            "Color": "01",
            "UserCF": "",
            "LastPrintDate": "",
            "ApplicationType": "ZGAP",
            "ApplicationShortDescription": "STRADA COMUNALE VIA XXV APRILE*VIA XXV A",
            "ApplicationDescription": "STRADA COMUNALE VIA XXV APRILE*VIA XXV APRILE*CONSOLIDAMENTO TRATTO IN DISSESTO",
            "ApplicationPostingDate": "/Date(1663372800000)/",
            "ProgramGUID": "20000010-3600-0000-0000-000000000000",
            "ProgramID": "2000001036",
            "Priority": "01",
            "to_attachment": {
                "__deferred": {
                    "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')/to_attachment"
                }
            },
            "to_businessPartner": {
                "__deferred": {
                    "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')/to_businessPartner"
                }
            },
            "to_item": {
                "__deferred": {
                    "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')/to_item"
                }
            },
            "to_messages": {
                "__deferred": {
                    "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION('1000000300')/to_messages"
                }
            }
        }
    };

    res.json(payload);
});


// get the attachments for an application
app.get(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_GPM_APPLICATION(:appId)/to_attachment`, (req, res) => {
    let attachments = dummyAttachments.d.results;
    if (req.query.$filter) {
        let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
        const KEYWORD = arr[0];
        if (KEYWORD) attachments = attachments.filter(f => f.KEYWORD === KEYWORD.replace(/\W/g, ''));
    }
    res.json({ d: { results: attachments } });
});

// create  a new attachment
app.post(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_I_AGRE_ATTACHMENT`, (req, res) => {
    setTimeout(() => {
        let newAttachment = {
            "__metadata": {
                "id": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_I_AGRE_ATTACHMENT(ObjectID='1000000266',OBJTYPE='P',CLASS='CRM_P_ORD',OBJID='005056866F3D1EED848970813DB4273B')",
                "uri": "http://sapcrmsvil.mef.gov.it:44370/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_I_AGRE_ATTACHMENT(ObjectID='1000000266',OBJTYPE='P',CLASS='CRM_P_ORD',OBJID='005056866F3D1EED848970813DB4273B')",
                "type": "ZCRM_GPM_APPLICATION_SRV.ZCRM_I_AGRE_ATTACHMENTType"
            },
            "ObjectID": "1000000270",
            "OBJTYPE": "P",
            "CLASS": "CRM_P_ORD",
            "OBJID": new Date().getTime(),
            "DESCRIPTION": "Bqcc.jpeg",
            "FILENAME": "Bqcc.jpeg",
            "KEYWORD": "TEST",
            "LANGU": "IT",
            "MIMETYPE": "image/jpeg",
            "CREATEDBY": "TECHBTP",
            "FILESIZE": "000000055152",
            "FILECONTENT": ""
        };
        //dummyAttachments.d.results.push(newAttachment);
        res.json({ "d": { newAttachment } });
    }, 2000);
});

// delete  an attachment
app.delete(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/ZCRM_I_AGRE_ATTACHMENT(:objectId,:objectType,:objectClass,:objId)`, (req, res) => {

    let payload = {};
    res.status(204).json(payload);
});

/* COLLABORATORS */

// get a collaborator by key
app.get(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(:userFiscalCode,:bidId)`, (req, res) => {
    res.status(200).json({
        "__metadata": {
            "id": "https://l2vswdlwss01.mef.gov.it:44370/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(UserFiscalCode='FRRSMC68L16F704U',BusinessPartnerID='0050001007')",
            "uri": "https://l2vswdlwss01.mef.gov.it:44370/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(UserFiscalCode='FRRSMC68L16F704U',BusinessPartnerID='0050001007')",
            "type": "ZGTR_AUTHENTICATION_BP_SRV.ZGTR_FISCAL_CODE_TO_BPType"
        },
        "UserFiscalCode": "FRRSMC68L16F704U",
        "BusinessPartnerID": "0050001007",
        "IsMaster": false,
        "CoWorkerMailAddress": "s.ferriero@alice.it",
        "CoWorkerFirstname": req.body.CoWorkerFirstname,
        "CoWorkerLastname": "Ferriero",
        "BusinessPartnerDescription": "EBNR SPINGES",
        "BusinessPartnerTaxType": "IT1",
        "BusinessPartnerFiscalCode": "81008080210",
        "ChangedAt": "/Date(1662997618679+0000)/",
        "FiscalCodeChangedBy": "BNCMRA22P23H501Z"
    });
});

// get all the collaborators
app.get(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP`, (req, res) => {
    res.json(dummyCollaborators);
});

// create a new collaborator
app.post(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP`, (req, res) => {
    let payload = {
        "d": {
            "results": [{
                "__metadata": {
                    "id": "https://l2vswdlwss01.mef.gov.it:44370/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(UserFiscalCode='FRRSMC68L16F704U',BusinessPartnerID='0050001007')",
                    "uri": "https://l2vswdlwss01.mef.gov.it:44370/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(UserFiscalCode='FRRSMC68L16F704U',BusinessPartnerID='0050001007')",
                    "type": "ZGTR_AUTHENTICATION_BP_SRV.ZGTR_FISCAL_CODE_TO_BPType"
                },
                "UserFiscalCode": "FRRSMC68L16F704U",
                "BusinessPartnerID": "0050001007",
                "IsMaster": false,
                "CoWorkerMailAddress": "s.ferriero@alice.it",
                "CoWorkerFirstname": req.body.CoWorkerFirstname,
                "CoWorkerLastname": "Ferriero",
                "BusinessPartnerDescription": "EBNR SPINGES",
                "BusinessPartnerTaxType": "IT1",
                "BusinessPartnerFiscalCode": "81008080210",
                "ChangedAt": "/Date(1662997618679+0000)/",
                "FiscalCodeChangedBy": "BNCMRA22P23H501Z"
            }]
        }
    };

    res.json(payload);
});

// delete a collaborator
app.delete(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_BP_SRV/ZGTR_FISCAL_CODE_TO_BP(:userFiscalCode,:bidId)`, (req, res) => {
    res.status(204).send("OK");
});

// IPA

// get IPA details for a given BP
app.get(`/S4_REGIS/sap/opu/odata/sap/ZSS4_ODATA_SERVIZI_PROXY_SRV_01/ZET_BPSet`, (req, res) => {
    setTimeout(() => {
        if (req.query.$filter) {
            let arr = req.query.$filter.match(/(?<=)'(.*?)'/g) || [""];
            const taxnum = arr[0].replace(/\W/g, '');
            /* dummyIPADetailsEnelROSSI */

            if (taxnum === "11111111111")
                res.status(404).json(dummyIPADetailsError);
            else if (taxnum === "22222222222")
                res.status(200).json(dummyIPADetailsEnel);
            else if (taxnum === "33333333333")
                res.status(200).json(dummyIPADetailsEnelROSSI);
            else
                res.status(200).json(dummyIPADetails);
        } else res.status(404).json(dummyIPADetailsError);
    }, 1000);
});


// CUP

// verify if CUP is valid (code 1234 is the valid one, all other strings are considered as invalid)
app.get(`/GT_REGIS/sap/opu/odata/sap/ZCRM_GPM_APPLICATION_SRV/CheckCUP`, (req, res) => {
    setTimeout(() => {
        const cupCode = req.query.cupCode.replace(/\W/g, '');
        if (cupCode === "1234") res.json(dummyCUPCodeVerificationResponseKO);
        else res.json(dummyCUPCodeVerificationResponseOK);
    }, 1000);
});


// sed a verification email
app.head(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_WF_SRV/ZGTR_WF_AUTHENTICATION`, (req, res) => {
    res.status(200).send({});
});

app.post(`/S4_REGIS/sap/opu/odata/sap/ZGTR_AUTHENTICATION_WF_SRV/ZGTR_WF_AUTHENTICATION`, (req, res) => {
    setTimeout(() => {
        res.status(201).json(dummyVerificationEmailOK);
    }, 1000);
});

//PROGETTI
app.get(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_PORTALE_ENTI_PROGSet`, (req, res) => {
    setTimeout(() => {
        res.status(200).json(projectList);
    }, 1000);
});

//Salva richiesta
app.head(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_RichiestaSet`, (req, res, next) => {
    res.status(200).set('x-csrf-token', 'abcd').send({});
});
app.post(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_RichiestaSet`, (req, res) => {
    setTimeout(() => {
        res.status(200).json(RequestsAdd);
    }, 1000);
});


//RICHIESTE utenze
app.get(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_UtenteRichiestaSet`, (req, res) => {
    setTimeout(() => {
        var regex = /Stato/;
        var isGetPendingUsers = regex.test(req.query.$filter);
        if (isGetPendingUsers) {
            console.warn('RICHIESTE utenze RequestsUsers')
            res.status(200).json(RequestsUsers);
        } else {
            console.warn('RICHIESTE utenze RequestsAll')
            res.status(200).json(RequestsAll);
        }
    }, 1000);
});

app.get(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_PORTALE_ENTISet`, (req, res) => {
    setTimeout(() => {
        res.status(200).json(RegisUsers);
    }, 1000);
});

// elimina richiesta
app.head(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_RichiestaSet(:idRichiesta)`, (req, res) => {
    setTimeout(() => {
        res.status(200).send("OK");
    }, 1000);
});

app.delete(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_RichiestaSet(:idRichiesta)`, (req, res) => {
    setTimeout(() => {
        res.status(204).send("OK");
    }, 1000);
});
app.put(`/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_RichiestaSet(:idRichiesta)`, (req, res) => {
    setTimeout(() => {
        res.status(204).send("OK");
    }, 1000);
});


//Lettura tabella gestione workflow
app.get('/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_WorkflowApprSet', (req, res) => {
    res.json(LetturaTabGestioneWorkflow);
});

app.get('/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_MacroTipologiaRichSet', (req, res) => {
    res.json(MacroTipologiaRichieste);
});

app.get('/S4_REGIS/sap/opu/odata/sap/ZSS4_PORTALE_ENTI_SRV/ZES_TipologiaRichSet', (req, res) => {
    res.json(TipologiaRichiesteSet);
});
