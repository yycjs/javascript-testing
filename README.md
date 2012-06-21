# JavaScript Testing

---

## Why testing?

- Unit
- Functional
- Acceptance
- Integration

---

## Unit Tests

Split functionality into contained units
test each part

Stubs

---

## TDD

Test Driven Development

__Tests first__

---

## Client Side Testing

Client side testing is still not a common practise

__Unit tests__

Test if separate contained parts (e.g. a module) return expected values,
injecting mock dependencies if necessary.


__Functional tests__

Test if user interaction works as expected

---

## Browserstack

<!-- David -->

---

## Continous Integration

<!-- David -->

---

## Headless Browsers

Zombie.js
PhantomJS

---

# Testing Frameworks

---

## Nodeunit

<!-- David -->

---

## Mocha

<!-- Eric -->

---

## Vows

<!-- Eric -->

---

## Should

<!-- Eric -->

---

## Jasmine

<!-- David -->

A behaviour driven development (BDD) framework to test JavaScript code:

	!javascript
	function sayHi(name) {
		return 'Hi ' + name;
	}

	function getAnswer() {
		return 42;
	}

	describe('A test suite', function () {
		it('Should say hi to David', function() {
			expect(sayHi('David')).toBe('Hi David');
		});

		it('Should return the answer to all questions', function() {
			expecte(getAnswer()).toBe(42);
		}
    });

---

## QUnit

<!-- David -->

Originally part of jQuery but evolved into a separate unit testing suite:

	!javascript
	module('Hi Sayer');

	test('Saying hi', function() {
		var actual = sayHi('David');
		equals(actual, 'Hi David', 'Said Hi');
	});

	test('Returns the answer to all questions', function() {
		equals(answer(), 42, 'Got the answer to all questions');
	});

---

<!-- David -->

## FuncUnit

A functional testing suite to simulate user input based on QUnit and jQuery:

	!javascript
	module("jQuery Demo tester",{
		setup: function() {
			S.open('demo.html')
		}
	});

	test("Plugin says hi",function(){
		// Type some text into <input name="your-name" />
		S('input[name="your-name"]').click().type("David")
		// Click the button
		S('button').click();
		// Check the HTML content
		S('#mydiv').html('Hi David');
    });

---

# Thank you
