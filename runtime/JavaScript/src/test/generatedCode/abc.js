// Generated from abc.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\u0005\u000f\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003",
    "\u0004\u0004\t\u0004\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0002\u0002\u0005\u0003\u0003\u0005\u0004\u0007",
    "\u0005\u0003\u0002\u0002\u0002\u000e\u0002\u0003\u0003\u0002\u0002\u0002",
    "\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002",
    "\u0003\t\u0003\u0002\u0002\u0002\u0005\u000b\u0003\u0002\u0002\u0002",
    "\u0007\r\u0003\u0002\u0002\u0002\t\n\u0007c\u0002\u0002\n\u0004\u0003",
    "\u0002\u0002\u0002\u000b\f\u0007d\u0002\u0002\f\u0006\u0003\u0002\u0002",
    "\u0002\r\u000e\u0007e\u0002\u0002\u000e\b\u0003\u0002\u0002\u0002\u0003",
    "\u0002\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class abc extends antlr4.Lexer {

    static grammarFileName = "abc.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'a'", "'b'", "'c'" ];
	static symbolicNames = [ null, "A", "B", "C" ];
	static ruleNames = [ "A", "B", "C" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

abc.EOF = antlr4.Token.EOF;
abc.A = 1;
abc.B = 2;
abc.C = 3;



