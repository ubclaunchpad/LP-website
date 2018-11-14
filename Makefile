all: install lint

.PHONY: install
install:
	gem install mdl

.PHONY: lint
lint:
	mdl .

.PHONY: hook
hook:
	cp .hooks/pre-commit .git/hooks
