all: install lint

.PHONY: install
install:
	gem install mdl
	npm install

.PHONY: lint
lint:
	mdl .

.PHONY: hook
hook:
	cp .hooks/pre-commit .git/hooks

.PHONY: serve
serve:
	npm run serve
