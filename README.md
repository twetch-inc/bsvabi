# BSVABI Helpers

## Install

```
npm i @twetch/bsvabi
```

## Usage

```
const BSVABI = require('@twetch/bsvabi');

const abiSchema = ...;
const twetchAbi = new BSVABI(abiSchema);

// build from either arguments or tx
twetchABI.action('post').fromArgs([...]);
twetchABI.action('post').fromTX(rawtx);

// Get the data array for a twetch Post
twetchABI.action('post').fromArgs(['hello world', ...]).toArray(); // returns ['19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut', 'hello world', ...]

// Get the object for a twetch Post
twetchABI.action('post').fromArgs(['hello world', ...]).toObject(); // returns { bNamespace: '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut', bContent: 'hello world', ... }
```

## Methods

### `action(type)`
Params:
- type (string) - name of the abi action
Response:
- the BSVABI instance w/ the action selected

### `fromArgs(args)`
Params:
- args (array) - array of arguments for the abi
Response:
- this BSVABI instance, but now validated. Errors thrown if validation fails 

### `fromTX(rawtx)`
Params:
- rawtx (string) - a raw transaction
Response:
- this BSVABI instance, but now validated. Errors thrown if validation fails 

### `toArray()`
Response:
- array of the data

### `toObject()`
Response:
- object of the data
