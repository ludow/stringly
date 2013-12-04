REPORTER = spec

lint:
	./node_modules/.bin/jshint --verbose --reporter node_modules/jshint-stylish/stylish.js lib/

test:
	$(MAKE) lint
	./node_modules/.bin/mocha -b --reporter $(REPORTER)

.PHONY: test