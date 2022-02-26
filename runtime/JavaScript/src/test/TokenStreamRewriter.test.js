import antlr4, { Interval } from "../antlr4/index.js";
import abc from "./generatedCode/abc";
import calc from "./generatedCode/calc";

test("Insert before index 0", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.insertBefore(0, "0");

    // Assert
    expect(rewriter.getText()).toEqual("0abc");
});

test("Insert after last index", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.insertAfter(2, "x");

    // Assert
    expect(rewriter.getText()).toEqual("abcx");
});

test("Insert before and after middle index", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.insertBefore(1, "x");
    rewriter.insertAfter(1, "x");

    // Assert
    expect(rewriter.getText()).toEqual("axbxc");
});

test("Replace index 0", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replaceSingle(0, "x");

    // Assert
    expect(rewriter.getText()).toEqual("xbc");
});

test("Replace last index", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replaceSingle(2, "x");

    // Assert
    expect(rewriter.getText()).toEqual("abx");
});

test("Replace middle index", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replaceSingle(1, "x");

    // Assert
    expect(rewriter.getText()).toEqual("axc");
});

test("getText() with different start/stop arguments (1 of 2)", () => {
    // Arrange
    const chars = new antlr4.InputStream("x = 3 * 0;");
    const lexer = new calc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replace(4, 8, "0"); // replace 3 * 0 with 0

    // Assert
    expect(rewriter.getTokenStream().getText()).toEqual("x = 3 * 0;");
    expect(rewriter.getText()).toEqual("x = 0;");
    expect(rewriter.getText(new Interval(0, 9))).toEqual("x = 0;");
    expect(rewriter.getText(new Interval(4, 8))).toEqual("0");
});

test("getText() with different start/stop arguments (2 of 2)", () => {
    // Arrange
    const chars = new antlr4.InputStream("x = 3 * 0 + 2 * 0;");
    const lexer = new calc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act/Assert
    expect(rewriter.getTokenStream().getText()).toEqual("x = 3 * 0 + 2 * 0;");

    rewriter.replace(4, 8, "0"); // replace 3 * 0 with 0

    expect(rewriter.getText()).toEqual("x = 0 + 2 * 0;");
    expect(rewriter.getText(new Interval(0, 17))).toEqual("x = 0 + 2 * 0;");
    expect(rewriter.getText(new Interval(4, 8))).toEqual("0");
    expect(rewriter.getText(new Interval(0, 8))).toEqual("x = 0");
    expect(rewriter.getText(new Interval(12, 16))).toEqual("2 * 0");

    rewriter.insertAfter(17, "// comment");

    expect(rewriter.getText(new Interval(12, 18))).toEqual("2 * 0;// comment");
    expect(rewriter.getText(new Interval(0, 8))).toEqual("x = 0");
});

test("Replace middle index, twice", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replaceSingle(1, "x");
    rewriter.replaceSingle(1, "y");

    // Assert
    expect(rewriter.getText()).toEqual("ayc");
});

test("Insert before, then replace twice", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.insertBefore(0, "_");
    rewriter.replaceSingle(1, "x");
    rewriter.replaceSingle(1, "y");

    // Assert
    expect(rewriter.getText()).toEqual("_ayc");
});

test("Replace, then delete middle index", () => {
    // Arrange
    const chars = new antlr4.InputStream("abc");
    const lexer = new abc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act
    rewriter.replaceSingle(1, "x");
    rewriter.delete(1);

    // Assert
    expect(rewriter.getText()).toEqual("ac");
});
