// Generated from calc.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\b$\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0003\u0002\u0006\u0002\u0011\n\u0002\r\u0002\u000e\u0002\u0012",
    "\u0003\u0003\u0006\u0003\u0016\n\u0003\r\u0003\u000e\u0003\u0017\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0007\u0006\u0007!\n\u0007\r\u0007\u000e\u0007\"\u0002\u0002\b\u0003",
    "\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u0003\u0002\u0002",
    "\u0002&\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002",
    "\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002",
    "\u0002\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002",
    "\u0002\u0002\u0003\u0010\u0003\u0002\u0002\u0002\u0005\u0015\u0003\u0002",
    "\u0002\u0002\u0007\u0019\u0003\u0002\u0002\u0002\t\u001b\u0003\u0002",
    "\u0002\u0002\u000b\u001d\u0003\u0002\u0002\u0002\r \u0003\u0002\u0002",
    "\u0002\u000f\u0011\u0004c|\u0002\u0010\u000f\u0003\u0002\u0002\u0002",
    "\u0011\u0012\u0003\u0002\u0002\u0002\u0012\u0010\u0003\u0002\u0002\u0002",
    "\u0012\u0013\u0003\u0002\u0002\u0002\u0013\u0004\u0003\u0002\u0002\u0002",
    "\u0014\u0016\u00042;\u0002\u0015\u0014\u0003\u0002\u0002\u0002\u0016",
    "\u0017\u0003\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0017",
    "\u0018\u0003\u0002\u0002\u0002\u0018\u0006\u0003\u0002\u0002\u0002\u0019",
    "\u001a\u0007=\u0002\u0002\u001a\b\u0003\u0002\u0002\u0002\u001b\u001c",
    "\u0007,\u0002\u0002\u001c\n\u0003\u0002\u0002\u0002\u001d\u001e\u0007",
    "?\u0002\u0002\u001e\f\u0003\u0002\u0002\u0002\u001f!\u0007\"\u0002\u0002",
    " \u001f\u0003\u0002\u0002\u0002!\"\u0003\u0002\u0002\u0002\" \u0003",
    "\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#\u000e\u0003\u0002\u0002",
    "\u0002\u0006\u0002\u0012\u0017\"\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class calc extends antlr4.Lexer {

    static grammarFileName = "calc.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, null, null, "';'", "'*'", "'='" ];
	static symbolicNames = [ null, "ID", "INT", "SEMI", "MUL", "ASSIGN", "WS" ];
	static ruleNames = [ "ID", "INT", "SEMI", "MUL", "ASSIGN", "WS" ];

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
calc.MUL = 4;
calc.ASSIGN = 5;
calc.WS = 6;



