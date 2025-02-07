export const formatDate = (date) => {
  if (date === null) {
    return "";
  } else {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
};

export const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "0.00";
  
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };
  
