# JavaScript testing

---

# Testing

---

## Client side testing

Client side testing is still not a common practise

__Unit tests__

Test if separate contained parts (e.g. a module) return expected values,
injecting mock dependencies if necessary.


__Functional tests__

Test if user interaction works as expected


---

## Jasmine

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

		it('Should return the answer to all questions, function() {
			expecte(getAnswer()).toBe(42);
		}
    });

---

## QUnit

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
