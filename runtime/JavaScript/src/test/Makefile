ANTLR_JAR = .antlr/antlr-4.10.1-complete.jar

.antlr:
	mkdir .antlr

.antlr/antlr-4.10.1-complete.jar: .antlr
	curl https://www.antlr.org/download/antlr-4.10.1-complete.jar -o $(ANTLR_JAR)

abc: abc.g4 .antlr/antlr-4.10.1-complete.jar
	java -jar $(ANTLR_JAR) -Dlanguage=JavaScript -no-listener abc.g4 -o generatedCode/

calc: calc.g4 .antlr/antlr-4.10.1-complete.jar
	java -jar $(ANTLR_JAR) -Dlanguage=JavaScript -no-listener calc.g4 -o generatedCode/
