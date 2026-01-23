import { ValidationErrorsIBAN } from 'ibantools';

export { getFriendlyErrors };

const getIbanErrorToMessageKeys = {
  [ValidationErrorsIBAN.NoIBANProvided]: 'tools.iban-validator-and-parser.errorNoIban',
  [ValidationErrorsIBAN.NoIBANCountry]: 'tools.iban-validator-and-parser.errorNoCountry',
  [ValidationErrorsIBAN.WrongBBANLength]: 'tools.iban-validator-and-parser.errorWrongBbanLength',
  [ValidationErrorsIBAN.WrongBBANFormat]: 'tools.iban-validator-and-parser.errorWrongBbanFormat',
  [ValidationErrorsIBAN.ChecksumNotNumber]: 'tools.iban-validator-and-parser.errorChecksumNotNumber',
  [ValidationErrorsIBAN.WrongIBANChecksum]: 'tools.iban-validator-and-parser.errorWrongChecksum',
  [ValidationErrorsIBAN.WrongAccountBankBranchChecksum]: 'tools.iban-validator-and-parser.errorWrongBankChecksum',
  [ValidationErrorsIBAN.QRIBANNotAllowed]: 'tools.iban-validator-and-parser.errorQrNotAllowed',
};

function getFriendlyErrors(errorCodes: ValidationErrorsIBAN[], t: (key: string) => string) {
  return errorCodes.map(errorCode => t(getIbanErrorToMessageKeys[errorCode])).filter(Boolean);
}
