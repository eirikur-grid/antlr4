// Generated from calc.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\t(\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0003\u0002\u0006\u0002\u0013\n\u0002\r\u0002\u000e",
    "\u0002\u0014\u0003\u0003\u0006\u0003\u0018\n\u0003\r\u0003\u000e\u0003",
    "\u0019\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\b\u0006\b%\n\b\r\b\u000e\b&\u0002",
    "\u0002\t\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b",
    "\u000f\t\u0003\u0002\u0002\u0002*\u0002\u0003\u0003\u0002\u0002\u0002",
    "\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002",
    "\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002\u0002",
    "\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002\u0002",
    "\u0003\u0012\u0003\u0002\u0002\u0002\u0005\u0017\u0003\u0002\u0002\u0002",
    "\u0007\u001b\u0003\u0002\u0002\u0002\t\u001d\u0003\u0002\u0002\u0002",
    "\u000b\u001f\u0003\u0002\u0002\u0002\r!\u0003\u0002\u0002\u0002\u000f",
    "$\u0003\u0002\u0002\u0002\u0011\u0013\u0004c|\u0002\u0012\u0011\u0003",
    "\u0002\u0002\u0002\u0013\u0014\u0003\u0002\u0002\u0002\u0014\u0012\u0003",
    "\u0002\u0002\u0002\u0014\u0015\u0003\u0002\u0002\u0002\u0015\u0004\u0003",
    "\u0002\u0002\u0002\u0016\u0018\u00042;\u0002\u0017\u0016\u0003\u0002",
    "\u0002\u0002\u0018\u0019\u0003\u0002\u0002\u0002\u0019\u0017\u0003\u0002",
    "\u0002\u0002\u0019\u001a\u0003\u0002\u0002\u0002\u001a\u0006\u0003\u0002",
    "\u0002\u0002\u001b\u001c\u0007=\u0002\u0002\u001c\b\u0003\u0002\u0002",
    "\u0002\u001d\u001e\u0007-\u0002\u0002\u001e\n\u0003\u0002\u0002\u0002",
    "\u001f \u0007,\u0002\u0002 \f\u0003\u0002\u0002\u0002!\"\u0007?\u0002",
    "\u0002\"\u000e\u0003\u0002\u0002\u0002#%\u0007\"\u0002\u0002$#\u0003",
    "\u0002\u0002\u0002%&\u0003\u0002\u0002\u0002&$\u0003\u0002\u0002\u0002",
    "&\'\u0003\u0002\u0002\u0002\'\u0010\u0003\u0002\u0002\u0002\u0006\u0002",
    "\u0014\u0019&\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class calc extends antlr4.Lexer {

    static grammarFileName = "calc.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, null, null, "';'", "'+'", "'*'", "'='" ];
	static symbolicNames = [ null, "ID", "INT", "SEMI", "PLUS", "MUL", "ASSIGN", 
                          "WS" ];
	static ruleNames = [ "ID", "INT", "SEMI", "PLUS", "MUL", "ASSIGN", "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

calc.EOF = antlr4.Token.EOF;
calc.ID = 1;
calc.INT = 2;
calc.SEMI = 3;
calc.PLUS = 4;
calc.MUL = 5;
calc.ASSIGN = 6;
calc.WS = 7;



