const generateAgreementNumber = (
  commencementDate: Date,
  pfiId: number
): string => {
  const prefix = "ZCGS"; 

  const formattedDate = formatDate(commencementDate);
  return `${prefix}_${formattedDate}_${pfiId}`;
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options).replace(/ /g, "");
};

export default generateAgreementNumber;