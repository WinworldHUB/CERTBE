import {DateTime} from 'luxon';

const generateAgreementNumber = (
  commencementDate: Date,
  pfiId: number
): string => {
  const prefix = "ZCGS"; 

  const formattedDate = formatDate(commencementDate);
  return `${prefix}_${formattedDate}_${pfiId}`;
};

const formatDate = (date: Date): string => {
  return DateTime.fromJSDate(date).toFormat("ddLLLyyyy")
};

export default generateAgreementNumber;