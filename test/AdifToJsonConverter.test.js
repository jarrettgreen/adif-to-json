import AdifToJsonConverter from "../src/AdifToJsonConverter.js";

describe("AdifToJsonConverter", () => {
  it("should handle an empty input string", () => {
    const converter = new AdifToJsonConverter("");
    expect(converter.convert()).toEqual([]);
  });

  it("should convert an ADIF string to an array of JSON objects", () => {
    const adifString = `<ADIF_VER:5>3.0.9
      <PROGRAMID:5>MyApp
      <EOH>
      <EOR>
      <EOR>
      <EOR>
    `;
    const converter = new AdifToJsonConverter(adifString);
    const expected = [{}, {}, {}];
    expect(converter.convert()).toEqual(expected);
  });

  it("should normalize ADIF field names to lowercase in the JSON objects", () => {
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
    const expected = [
      {
        qso_date: "20220320",
        time_on: "165055",
        call: "K6ABC",
        band: "40",
        mode: "CW",
      },
      {
        qso_date: "20220320",
        time_on: "165103",
        call: "K7XYZ",
        band: "20",
        mode: "SSB",
      },
    ];
    expect(converter.convert()).toEqual(expected);
  });

  it("should handle ADIF fields with no value", () => {
    const adifString = `<ADIF_VER:5>3.0.9
      <PROGRAMID:5>MyApp
      <EOH>
      <QSO_DATE:8>20220320
      <CALL:5>K6ABC
      <EOR>
    `;
    const converter = new AdifToJsonConverter(adifString);
    const expected = [{ qso_date: "20220320", call: "K6ABC" }];
    expect(converter.convert()).toEqual(expected);
  });

  it("should handle ADIF fields with spaces in the value", () => {
    const adifString = `<ADIF_VER:5>3.0.9
      <PROGRAMID:5>MyApp
      <EOH>
      <CALL:7>K6 A B C
      <EOR>
    `;
    const converter = new AdifToJsonConverter(adifString);
    const expected = [{ call: "K6 A B C" }];
    expect(converter.convert()).toEqual(expected);
  });
});
