# adif-to-json

This class has a constructor that takes an ADIF file as input and a convert method that returns a Promise that resolves to the JSON object. The convert method first reads the contents of the ADIF file, then parses it into individual records, and finally converts the records to a JSON object.

The readFile method uses the fetch API to read the contents of the ADIF file and returns a Promise that resolves to the file's text.

The parseAdif method takes the ADIF text as input and uses a loop to iterate over each line of the text. It checks each line to see if it starts and ends with angle brackets, which indicates that it contains an ADIF tag. If the tag is "EOR", which indicates the end of a record, the current record is added to the records array and a new record is started. Otherwise, the tag and its value are added to the current record.

The convertRecordsToJson method takes the records array as input and uses a loop to iterate over each record. It creates a new JSON object for each record and copies over all of the key-value pairs from the ADIF record.

Note that this implementation assumes that the ADIF file contains only one type of record, such as QSO records. If the file contains multiple types of records, the implementation would need to be modified to handle each type appropriately.
