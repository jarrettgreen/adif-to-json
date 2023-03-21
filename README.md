# AdifToJsonConverter

AdifToJsonConverter is a Javascript class that can convert ADIF data (passed as a string) to an array of JSON objects for each QSO. ADIF fields are normalized to lowercase in the JSON object.

Usage
To use AdifToJsonConverter, first import the class into your project:

```javascript
import AdifToJsonConverter from('adif-to-json-converter');
```
Next, create an instance of the class, passing in the ADIF string as a parameter:

```javascript
const adifString = `<ADIF_VER:5>3.0.9
<PROGRAMID:5>MyApp
<EOH>
<QSO_DATE:8>20220320
<TIME_ON:6>165055
<CALL:5>K6ABC
<BAND:2>40
<MODE:2>CW
<EOR>
<QSO_DATE:8>20220320
<TIME_ON:6>165103
<CALL:5>K7XYZ
<BAND:2>20
<MODE:2>SSB
<EOR>
`;
const converter = new AdifToJsonConverter(adifString);
```

Finally, call the `convert()` method on the converter object to get an array of JSON objects representing each QSO:

```javascript
const qsos = converter.convert();
console.log(qsos);
// Output:
// [
// {
// qso_date: '20220320',
// time_on: '165055',
// call: 'K6ABC',
// band: '40',
// mode: 'CW'
// },
// {
// qso_date: '20220320',
// time_on: '165103',
// call:...

```


