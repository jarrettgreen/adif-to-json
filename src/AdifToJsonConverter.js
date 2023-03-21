class AdifToJsonConverter {
  constructor(adifString) {
    this.adifString = adifString;
  }

  convert() {
    if (!this.adifString || !this.adifString.trim()) {
      return [];
    }
    // Split the ADIF data at the EOH (End of Header) tag
    const adifArray = this.adifString.split("<EOH>\n")[1].split("<EOR>\n");
    const jsonObjects = [];

    for (let i = 0; i < adifArray.length - 1; i++) {
      const adifObject = adifArray[i];
      const jsonObject = {};
      const fields = adifObject.split("<");
      for (let j = 1; j < fields.length; j++) {
        const field = fields[j].split(":")[0].toLowerCase();
        const value = fields[j].split(">")[1].trim();
        jsonObject[field] = value;
      }
      jsonObjects.push(jsonObject);
    }
    return jsonObjects;
  }
}
module.exports = AdifToJsonConverter;
