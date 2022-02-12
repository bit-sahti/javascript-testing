const { rejects, deepStrictEqual } = require("assert");
const { errors } = require("../constants/errors");
const { File } = require("./file");

(async () => {
  {
    const filePath = "../mocks/emptyFile-invalid.csv";
    const expectedError = new Error(errors.invalidLength);

    //if we wait for the execution, the error will be thrown. This way, it is thrown inside the rejects
    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/fourItems-invalid.csv";
    const expectedError = new Error(errors.invalidLength);

    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/endsWithSpace.csv";
    const expectedError = new Error(errors.invalidFormat);

    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/unevenColumns.csv";
    const expectedError = new Error(errors.invalidFormat);

    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/invalidHeaders.csv";
    const expectedError = new Error(errors.invalidHeaders);

    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/invalidHeaders.csv";
    const expectedError = new Error(errors.invalidHeaders);

    const result = File.csvToJson(filePath);

    rejects(result, expectedError);
  }

  {
    const filePath = "../mocks/validFile.csv";
    const expectedResult = [
      {
        id: 1,
        name: "Thais",
        profession: "Developer",
        yearOfBirth: 1995,
      },
      {
        id: 2,
        name: "Erick",
        profession: "Specialist Developer",
        yearOfBirth: 1997,
      },
      {
        id: 3,
        name: "Amanda",
        profession: "Product Manager",
        yearOfBirth: 1992,
      },
    ];

    const result = await File.csvToJson(filePath);

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expectedResult));
  }
})();
