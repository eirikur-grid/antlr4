import antlr4 from "../src/antlr4/index.js";
import abc from "./generatedCode/abc.js";
import calc from "./generatedCode/calc.js";

/**
 * 
 * @param {antlr4.Lexer} lexerClass 
 * @param {string} input 
 */
function getRewriter(lexerClass, input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new lexerClass(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    return new antlr4.TokenStreamRewriter(tokens);
}

describe("TokenStreamRewriter", () => {
    it("Insert before index 0", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, "0");
    
        // Assert
        expect(rewriter.getText()).toEqual("0abc");
    });
    
    it("Insert after last index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertAfter(2, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("abcx");
    });
    
    it("Insert before and after middle index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(1, "x");
        rewriter.insertAfter(1, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("axbxc");
    });
    
    it("Replace index 0", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(0, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("xbc");
    });
    
    it("Replace last index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(2, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("abx");
    });
    
    it("Replace middle index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(1, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("axc");
    });
    
    it("getText() with different start/stop arguments (1 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(calc, "x = 3 * 0;");
    
        // Act
        rewriter.replace(4, 8, "0"); // replace 3 * 0 with 0
    
        // Assert
        expect(rewriter.getTokenStream().getText()).toEqual("x = 3 * 0;");
        expect(rewriter.getText()).toEqual("x = 0;");
        expect(rewriter.getText(new antlr4.Interval(0, 9))).toEqual("x = 0;");
        expect(rewriter.getText(new antlr4.Interval(4, 8))).toEqual("0");
    });
    
    it("getText() with different start/stop arguments (2 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(calc, "x = 3 * 0 + 2 * 0;");
    
        // Act/Assert
        expect(rewriter.getTokenStream().getText()).toEqual("x = 3 * 0 + 2 * 0;");
    
        rewriter.replace(4, 8, "0"); // replace 3 * 0 with 0
    
        expect(rewriter.getText()).toEqual("x = 0 + 2 * 0;");
        expect(rewriter.getText(new antlr4.Interval(0, 17))).toEqual("x = 0 + 2 * 0;");
        expect(rewriter.getText(new antlr4.Interval(4, 8))).toEqual("0");
        expect(rewriter.getText(new antlr4.Interval(0, 8))).toEqual("x = 0");
        expect(rewriter.getText(new antlr4.Interval(12, 16))).toEqual("2 * 0");
    
        rewriter.insertAfter(17, "// comment");
    
        expect(rewriter.getText(new antlr4.Interval(12, 18))).toEqual("2 * 0;// comment");
        expect(rewriter.getText(new antlr4.Interval(0, 8))).toEqual("x = 0");
    });
    
    it("Replace middle index, twice", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(1, "x");
        rewriter.replaceSingle(1, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("ayc");
    });
    
    it("Insert before, then replace twice", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, "_");
        rewriter.replaceSingle(1, "x");
        rewriter.replaceSingle(1, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("_ayc");
    });
    
    it("Replace, then delete middle index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(1, "x");
        rewriter.delete(1);
    
        // Assert
        expect(rewriter.getText()).toEqual("ac");
    });
    
    it("Inserting into a replaced segment should fail", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replace(0, 2, "x");
        rewriter.insertBefore(1, "0");
    
        // Assert
        expect(() => rewriter.getText()).toThrowError(
            "insert op <InsertBeforeOp@[@1,1:1='b',<2>,1:1]:\"0\"> within boundaries of previous <ReplaceOp@[@0,0:0='a',<1>,1:0]..[@2,2:2='c',<3>,1:2]:\"x\">"
        );
    });
    
    it("Insert then replace same index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, "0");
        rewriter.replaceSingle(0, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("0xbc");
    });
    
    it("Insert twice before middle index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(1, "x");
        rewriter.insertBefore(1, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("ayxbc");
    });
    
    it("Insert twice before first index, then replace it", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, "x");
        rewriter.insertBefore(0, "y");
        rewriter.replaceSingle(0, "z");
    
        // Assert
        expect(rewriter.getText()).toEqual("yxzbc");
    });
    
    it("Replace, then insert before last index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(2, "x");
        rewriter.insertBefore(2, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("abyx");
    });
    
    it("Replace, then insert after last index", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replaceSingle(2, "x");
        rewriter.insertAfter(2, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("abxy");
    });
    
    it("Replace range, then insert at left edge", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcccba");
    
        // Act
        rewriter.replace(2, 4, "x");
        rewriter.insertBefore(2, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("abyxba");
    });
    
    it("Replace range, then insert before right edge", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcccba");
    
        // Act
        rewriter.replace(2, 4, "x");
        rewriter.insertBefore(4, "y");
    
        // Assert
        expect(() => rewriter.getText()).toThrowError(
            "insert op <InsertBeforeOp@[@4,4:4='c',<3>,1:4]:\"y\"> within boundaries of previous <ReplaceOp@[@2,2:2='c',<3>,1:2]..[@4,4:4='c',<3>,1:4]:\"x\">"
        );
    });
    
    it("Replace range, then insert after right edge", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcccba");
    
        // Act
        rewriter.replace(2, 4, "x");
        rewriter.insertAfter(4, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("abxyba");
    });
    
    it("Replace all", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcccba");
    
        // Act
        rewriter.replace(0, 6, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("x");
    });
    
    it("Replace subset, then fetch", () => {
        // Arrange
        const chars = new antlr4.InputStream("abcccba");
        const lexer = new abc(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        tokens.fill();
        const rewriter = new antlr4.TokenStreamRewriter(tokens);
    
        // Act
        rewriter.replace(2, 4, "xyz");
    
        // Assert
        expect(rewriter.getText(new antlr4.Interval(0, 6))).toEqual("abxyzba");
    });
    
    it("Replace, then replace superset (range overlapping)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcccba");
    
        // Act
        rewriter.replace(2, 4, "xyz");
        rewriter.replace(3, 5, "foo");
    
        // Assert
        expect(() => rewriter.getText()).toThrowError(
            "replace op boundaries of <ReplaceOp@[@3,3:3='c',<3>,1:3]..[@5,5:5='b',<2>,1:5]:\"foo\"> overlap with previous <ReplaceOp@[@2,2:2='c',<3>,1:2]..[@4,4:4='c',<3>,1:4]:\"xyz\">"
        );
    });
    
    it("Replace, then replace lower indexed superset (range overlapping)", () => {
        // Arrange
        const chars = new antlr4.InputStream("abcccba");
        const lexer = new abc(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        tokens.fill();
        const rewriter = new antlr4.TokenStreamRewriter(tokens);
    
        // Act
        rewriter.replace(2, 4, "xyz");
        rewriter.replace(1, 3, "foo");
    
        // Assert
        expect(() => rewriter.getText()).toThrowError(
            "replace op boundaries of <ReplaceOp@[@1,1:1='b',<2>,1:1]..[@3,3:3='c',<3>,1:3]:\"foo\"> overlap with previous <ReplaceOp@[@2,2:2='c',<3>,1:2]..[@4,4:4='c',<3>,1:4]:\"xyz\">"
        );
    });
    
    it("Replace single middle, then replace overlapping superset", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcba");
    
        // Act
        rewriter.replace(2, 2, "xyz");
        rewriter.replace(0, 3, "foo");
    
        // Assert
        expect(rewriter.getText()).toEqual("fooa");
    });
    
    it("Combine 2 inserts", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, "x");
        rewriter.insertBefore(0, "y");
    
        // Assert
        expect(rewriter.getText()).toEqual("yxabc");
    });
    
    it("Combine 3 inserts", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(1, "x");
        rewriter.insertBefore(0, "y");
        rewriter.insertBefore(1, "z");
    
        // Assert
        expect(rewriter.getText()).toEqual("yazxbc");
    });
    
    it("Combine insert on left with replace", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.replace(0, 2, "foo");
        rewriter.insertBefore(0, "z");
    
        // Assert
        expect(rewriter.getText()).toEqual("zfoo");
    });
    
    it("Combine insert on left with delete", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.delete(0, 2);
        rewriter.insertBefore(0, "z");
    
        // Assert
        expect(rewriter.getText()).toEqual("z");
    });
    
    
    it("Disjoint inserts", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(1, "x");
        rewriter.insertBefore(2, "y");
        rewriter.insertBefore(0, "z");
    
        // Assert
        expect(rewriter.getText()).toEqual("zaxbyc");
    });
    
    
    it("Overlapping replace (1 of 4)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(1, 2, "foo");
        rewriter.replace(0, 3, "bar");
    
        // Assert
        expect(rewriter.getText()).toEqual("bar");
    });
    
    it("Overlapping replace (2 of 4)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(0, 3, "bar");
        rewriter.replace(1, 2, "foo");
    
        // Assert
        expect(() => rewriter.getText()).toThrowError(
            "replace op boundaries of <ReplaceOp@[@1,1:1='b',<2>,1:1]..[@2,2:2='c',<3>,1:2]:\"foo\"> overlap with previous <ReplaceOp@[@0,0:0='a',<1>,1:0]..[@3,3:3='c',<3>,1:3]:\"bar\">"
        );
    });
    
    it("Overlapping replace (3 of 4)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(1, 2, "foo");
        rewriter.replace(0, 2, "bar");
    
        // Assert
        expect(rewriter.getText()).toEqual("barc");
    });
    
    it("Overlapping replace (3 of 4)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(1, 2, "foo");
        rewriter.replace(1, 3, "bar");
    
        // Assert
        expect(rewriter.getText()).toEqual("abar");
    });
    
    it("Drop identical replace", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(1, 2, "foo");
        rewriter.replace(1, 2, "foo");
    
        // Assert
        expect(rewriter.getText()).toEqual("afooc");
    });
    
    it("Drop previously covered insert", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(1, "foo");
        rewriter.replace(1, 2, "foo");
    
        // Assert
        expect(rewriter.getText()).toEqual("afoofoo");
    });
    
    it("Leave alone disjoing insert (1 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.insertBefore(1, "x");
        rewriter.replace(2, 3, "foo");
    
        // Assert
        expect(rewriter.getText()).toEqual("axbfoo");
    });
    
    it("Leave alone disjoing insert (2 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abcc");
    
        // Act
        rewriter.replace(2, 3, "foo");
        rewriter.insertBefore(1, "x");
    
        // Assert
        expect(rewriter.getText()).toEqual("axbfoo");
    });
    
    it("Insert before token, then delete that token", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(2, "y");
        rewriter.delete(2);
    
        // Assert
        expect(rewriter.getText()).toEqual("aby");
    });
    
    // Test for https://github.com/antlr/antlr4/issues/550
    it("Distinguish between insertAfter and insertBefore to preserve order (1 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "aa");
    
        // Act
        rewriter.insertBefore(0, "<b>");
        rewriter.insertAfter(0, "</b>");
        rewriter.insertBefore(1, "<b>");
        rewriter.insertAfter(1, "</b>");
    
        // Assert
        expect(rewriter.getText()).toEqual("<b>a</b><b>a</b>");
    });
    
    it("Distinguish between insertAfter and insertBefore to preserve order (2 of 2)", () => {
        // Arrange
        const rewriter = getRewriter(abc, "aa");
    
        // Act
        rewriter.insertBefore(0, "<p>");
        rewriter.insertBefore(0, "<b>");
        rewriter.insertAfter(0, "</p>");
        rewriter.insertAfter(0, "</b>");
        rewriter.insertBefore(1, "<b>");
        rewriter.insertAfter(1, "</b>");
    
        // Assert
        expect(rewriter.getText()).toEqual("<b><p>a</p></b><b>a</b>");
    });
    
    it("Preserve order of contiguous inserts", () => {
        // Arrange
        const rewriter = getRewriter(abc, "ab");
    
        // Act
        rewriter.insertBefore(0, "<p>");
        rewriter.insertBefore(0, "<b>");
        rewriter.insertBefore(0, "<div>");
        rewriter.insertAfter(0, "</p>");
        rewriter.insertAfter(0, "</b>");
        rewriter.insertAfter(0, "</div>");
        rewriter.insertBefore(1, "!");
    
        // Assert
        expect(rewriter.getText()).toEqual("<div><b><p>a</p></b></div>!b");
    });
    
    it("Insert literals", () => {
        // Arrange
        const rewriter = getRewriter(abc, "abc");
    
        // Act
        rewriter.insertBefore(0, false);
        rewriter.insertBefore(0, 0);
        rewriter.insertBefore(0, {});
        rewriter.insertBefore(0, []);
        rewriter.insertBefore(0, "");
    
        // Assert
        expect(rewriter.getText()).toEqual("[object Object]0falseabc");
    });
    
});
