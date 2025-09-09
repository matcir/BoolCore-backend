function userDataValidation(fields = []) {
  return function (req, res, next) {
    const data = req.body;
    const errors = [];

    fields.forEach((field) => {
      const value = data[field];

      switch (field) {
        case "name":
        case "last_name":
        case "description":
        case "address":
        case "city":
        case "country":
          if (!value || typeof value !== "string" || value.trim() === "") {
            errors.push(`Il campo '${field}' è obbligatorio.`);
          }
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value || !emailRegex.test(value)) {
            errors.push("Il campo 'email' non è valido.");
          }
          break;

        case "cap":
          if (!value || !/^\d{5}$/.test(value)) {
            errors.push("Il campo 'cap' deve essere un CAP valido (5 cifre).");
          }
          break;

        case "price":
          if (value === undefined || typeof value !== "number" || value < 0) {
            errors.push("Il campo 'price' deve essere un numero positivo.");
          }
          break;

        case "discount":
          if (value === undefined || typeof value !== "number" || value < 0 || value > 100) {
            errors.push("Il campo 'discount' deve essere un numero tra 0 e 100.");
          }
          break;

        case "product_id":
        case "quantity":
        case "id":
          if (value === undefined || isNaN(Number(value))) {
            errors.push(`Il campo '${field}' deve essere un numero.`);
          }
          break;

        // Aggiungi altri casi specifici qui se necessario
        default:
          // Se vuoi validare altri tipi di campo, aggiungi qui
          break;
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}

module.exports = userDataValidation;