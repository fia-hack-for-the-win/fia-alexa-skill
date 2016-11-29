/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.39120fee-ee48-4f40-9ab7-c97552d138eb";  

const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'Federation of Internet Alerts',
            HELP_MESSAGE: 'You can say guide me on the latest alert, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Please stay safe and call 911 if you need any additional help ! Goodbye !',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetAlerts');
    },
    'GetStatusIntent': function(event) {
       this.emit('GetStatus')  
    },
    'GetDirectionsIntent': function () {
        this.emit('GetDirections');
    },
    'GetActionDetailsIntent': function() {
        this.emit('GetActionDetails');
    },
    'ThankYouIntent': function() {
        this.emit('AMAZON.CancelIntent');  
    },
    'ThankYou': function() {
        this.emit('AMAZON.CancelIntent');  
        //this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'GetAlerts': function () {
        const speechOutput = "Ok, here are the current alerts based on your interests.";
        // TODO: get the alerts that the users is interested in
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'GetStatus': function() {
        // TODO: get the status for the most important current alert
        var currentStatus = "There's a severe Huricane Warning in your location ! ";
        var currentRecommendation = " The current recommendation is to evacuate. If you want more help say: how to evacuate ?";
        // TODO: get recommendations for the current alert
        var speechOutput =  currentStatus + currentRecommendation;
        
        this.emit(':ask', speechOutput, currentRecommendation);
    },
    'GetActionDetails': function () {
        console.log("Source event:" + JSON.stringify(this.event));
        var actionName = this.event.request.intent.slots.ActionName; 
        var actionNameVal = "";
        if (actionName && actionName.value) {
            actionNameVal = actionName.value;
        }
        if (actionNameVal !== "") {
            this.emit(actionNameVal);
        }
        const speechOutput = "Sorry, I didn't understand what you want ";
        this.emit(':ask', speechOutput, this.t('HELP_MESSAGE'));
        // this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'take shelter' : function () {
        this.emit(':ask', "Ok, the nearest shelter to you is at 123 Main Street Charleston, SC Zip 29049. Their contact number is 123-456-7890. If you want to take shelter home say: how to take shelter at home.");
    },
    'evacuate' : function () {
        this.emit(':ask', "Ok, your best evacuation route is to take highway 17 W to Highway 61 N to go to Ashleyville. Please call 911 if you need any additional help.");
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

