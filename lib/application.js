var vumigo = require("vumigo_v01");
var jed = require("jed");

if (api === undefined) {
  // testing hook (supplies api when it is not passed in by the real sandbox)
  var api = this.api = new vumigo.dummy_api.DummyApi();
}

var FreeText = vumigo.states.FreeText;
var EndState = vumigo.states.EndState;
var ChoiceState = vumigo.states.ChoiceState;
var PaginatedChoiceState = vumigo.states.PaginatedChoiceState;
var Choice = vumigo.states.Choice;
var InteractionMachine = vumigo.state_machine.InteractionMachine;
var StateCreator = vumigo.state_machine.StateCreator;
var HttpApi = vumigo.http_api.HttpApi;
var JsonApi = vumigo.http_api.JsonApi;
var Promise = vumigo.promise.Promise;

function SMSEndState(name, text, next, handlers) {
    // State that mimicks the USSD behaviour when a USSD session ends
    // it fast forwards to the start of the InteractionMachine.
    // We need to do this because SMS doesn't have the Session capabities
    // that provide us this functionality when using USSD.
    var self = this;
    handlers = handlers || {};
    if(handlers.on_enter === undefined) {
        handlers.on_enter = function() {
            self.input_event('', function() {});
        };
    }
    EndState.call(self, name, text, next, handlers);
}

function Application() {
    var self = this;
    StateCreator.call(self, 'keyword');

    self.add_state(new FreeText(
        'keyword',
        'handle_keyword',
        'Bad Lama! SMS Lama expects a keyword.'
    ));

    self.url_encode = function(params) {
        var items = [];
        for (var key in params) {
            items[items.length] = (encodeURIComponent(key) + '=' +
                                   encodeURIComponent(params[key]));
        }
        return items.join('&');
    };

    self.add_creator('handle_keyword', function (state_name, im) {
        var content = im.get_user_answer('keyword');
        var json_api = new JsonApi(im);
        var p = json_api.post(im.config.url, {
            data: {
                msisdn: im.user_addr,
                content: content
            }
        });
        p.add_callback(function(response) {
            return new SMSEndState(state_name, response.content, 'keyword');
        });
        return p;
    });
}

// launch app
var states = new Application();
var im = new InteractionMachine(api, states);
im.attach();
