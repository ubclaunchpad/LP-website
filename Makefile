all: install lint

.PHONY: install
install:
	gem install mdl

.PHONY: lint
lint:
	mdl .
