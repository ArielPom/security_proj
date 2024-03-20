include ../cpu.mk

all: main

run: main
	@taskset -c $(SENDER_CPU) ./main

main: main.c Makefile
	@gcc main.c -O0 -o main

.PHONY: clean

clean:
	rm -f main
