test:
	mkdir -p tests/test-output
	rm -f tests/test-output/*
	node tests/basictests.js

pushall:
	git push origin master && npm publish
