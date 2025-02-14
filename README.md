# Vergilius
A Guide to the Hell Called 'your code'.

## About

**Vergilius** is a helper class that allows the executed code to determine its position in the file, the name of the currently executing function, and similar information.  

This class has no practical use other than the ability to annoy coworkers with a *"works on my machine"* (refer to [the example](#different-behaviors-for-the-same-function)).

### How does it work?  

By using a stack trace.

## Instalation

Currently, Vergilius only support the web version.

### Web

```html
<script src="https://kawyn.github.io/vergilius/lib/main.min.js"></script>
```

### Node.js

Currently, **Vergilius** can't be downloaded via **npm**, so for local usage, download the `main.js` from the `lib` directory and integrate it into your project manually.

## Examples

The functions in the library are named after Dante's *Divine Comedy*. However, if someone dislikes the fancy names, they can use the boring aliases listed in the [table](#properties).

### Function name

```js 
function foo() { 
    
    console.log(Vergilius.canto); 
}

function bar() {

    console.log(Vergilius.canto);
}

foo(); // prints 'foo'
bar(); // prints 'bar'
```

### Different behaviors for the same function

Thanks to the ability to retrieve the names of previously visited functions (Vergilius.cantos), it is possible to define different behaviors for the same function.

```js 
function foo() { 
    
    console.log(multiply(10, 10)); // prints '20'
}

function bar() {

    console.log(multiply(10, 10)); // prints '100'
}

function multiply(a, b) { 

    if (Vergilius.cantos[1] === `foo`)
        return a + b;

    return a * b;
}
```

This idea can be extended so that all functions in the file your coworker is working on do something other than what they should.

```js 
// don_quixote's_file.js
function foo() { 
    
    console.log(multiply(10, 10)); // prints '20'
}

// your_file.js
function bar() {

    console.log(multiply(10, 10)); // prints '100'
}

function multiply(a, b) { 

    if (Vergilius.circles[1] === `don_quixote's_file.js`)
        return a + b;

    return a + b;
}
```

### Private methods
Additionally, thanks to this library, it is possible to define private functions in classes (as if it wasn’t already possible using `#`).

```js 

class Limbo {


    foo() { 
        
        this.bar();
    }

    bar() {

        const inferno = Vergilius.inferno;

        if(inferno[1].class != this.constructor.name)
            throw `${Vergilius.canto} is a private function. Only ${this.constructor.name} members can access it.`;

        console.log('bar');
    }
}

const limbo = new Limbo();

limbo.foo(); // prints 'bar';
limbo.bar(); // throws error
```


### Generator of all sequences consisting of the letters 'a' and 'b' of length 4

An attempt to create something useful using this library.

```js
function a() {

    if (Vergilius.cantos.length > 4) {
    
        console.log(Vergilius.cantos.splice(0, 4).join(''));
        return;
    }

    a();
    b();
}

function b() {

    if (Vergilius.cantos.length > 4) {
       
        console.log(Vergilius.cantos.splice(0, 4).join(''));
        return;
    }

    a();
    b();
}


a();
b();
```

## Properties
| Property   | Alias      | Returns  | Description |
|------------|-----------|----------|-------------|
| row        | -         | Number   | The row number in the file where the code is executed. |
| column     | -         | Number   | The column number in the file where the code is executed. |
| canto      | function  | String   | The name of the currently executing function. |
| cantos     | functions | String[] | A list of previously visited functions (includes current). |
| circle     | file      | String   | The file name where the code is executed. |
| circles    | files     | String[] | A list of file names from the call stack. |
| inferno    | data      | Object[] | A detailed parsed stack trace containing function names, file names, row, and column numbers. |
