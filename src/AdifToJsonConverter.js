class AdifToJsonConverter {
  constructor(adifFile) {
    this.adifFile = adifFile;
  }

  async convert() {
    const adifText = await this.readFile();
    const records = this.parseAdif(adifText);
    return this.convertRecordsToJson(records);
  }

  async readFile() {
    const response = await fetch(this.adifFile);
    const text = await response.text();
    return text;
  }

  parseAdif(adifText) {
    const records = [];
    const lines = adifText.split("\n");
    let record = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("<") && line.endsWith(">")) {
        const tag = line.substring(1, line.length - 1);
        const value = line.substring(line.indexOf(">") + 1);
        if (tag === "EOR") {
          records.push(record);
          record = {};
        } else {
          record[tag] = value;
        }
      }
    }
    return records;
  }

  convertRecordsToJson(records) {
    const json = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const jsonRecord = {};
      for (const key in record) {
        if (record.hasOwnProperty(key)) {
          jsonRecord[key] = record[key];
        }
      }
      json.push(jsonRecord);
    }
    return json;
  }
}

export default AdifToJsonConverter
