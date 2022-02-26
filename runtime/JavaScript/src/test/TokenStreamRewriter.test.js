import antlr4 from "../antlr4/index.js";
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

test("getText() with different start/stop arguments", () => {
    // Arrange
    const chars = new antlr4.InputStream("x = 3 * 0;");
    const lexer = new calc(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    tokens.fill();
    const rewriter = new antlr4.TokenStreamRewriter(tokens);

    // Act


    // Assert

});
