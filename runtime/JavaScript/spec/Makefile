ANTLR_JAR = .antlr/antlr-4.10.1-complete.jar

.antlr:
	mkdir .antlr

.antlr/antlr-4.10.1-complete.jar: .antlr
	curl https://www.antlr.org/download/antlr-4.10.1-complete.jar -o $(ANTLR_JAR)

abc: abc.g4 .antlr/antlr-4.10.1-complete.jar
	java -jar $(ANTLR_JAR) -Dlanguage=JavaScript -no-listener abc.g4 -o generatedCode/
	sed -i.bak "s/import antlr4 from 'antlr4'/import antlr4 from '..\/..\/src\/antlr4\/index.js'/" generatedCode/abc.js

calc: calc.g4 .antlr/antlr-4.10.1-complete.jar
	java -jar $(ANTLR_JAR) -Dlanguage=JavaScript -no-listener calc.g4 -o generatedCode/
	sed -i.bak "s/import antlr4 from 'antlr4'/import antlr4 from '..\/..\/src\/antlr4\/index.js'/" generatedCode/calc.js
