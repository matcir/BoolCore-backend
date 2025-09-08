function userDataValidation(fields = []) {
  return function (req, res, next) {
    const {
      name,
      last_name,
      description,
      email,
      address,
      city,
      cap,
      price,
      discount,
      country,
    } = req.body;

    const errori = [];

    if (fields.includes("name")) {
      if (!name || typeof name !== "string" || name.trim() === "") {
        errori.push("Il campo 'name' è obbligatorio.");
      }
    }

    if (fields.includes("description")) {
      if (!description || typeof description !== "string" || description.trim() === "") {
        errori.push("Il campo 'description' è obbligatorio.");
      }
    }

    if (fields.includes("last_name")) {
      if (!last_name || typeof last_name !== "string" || last_name.trim() === "") {
        errori.push("Il campo 'last_name' è obbligatorio.");
      }
    }

    if (fields.includes("email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errori.push("Il campo 'email' non è valido.");
      }
    }

    if (fields.includes("address")) {
      if (!address || typeof address !== "string" || address.trim() === "") {
        errori.push("Il campo 'address' è obbligatorio.");
      }
    }

    if (fields.includes("city")) {
      if (!city || typeof city !== "string" || city.trim() === "") {
        errori.push("Il campo 'city' è obbligatorio.");
      }
    }

    if (fields.includes("cap")) {
      if (!cap || !/^\d{5}$/.test(cap)) {
        errori.push("Il campo 'cap' deve essere un CAP valido (5 cifre).");
      }
    }

    if (fields.includes("price")) {
      if (price === undefined || typeof price !== "number" || price < 0) {
        errori.push("Il campo 'price' deve essere un numero positivo.");
      }
    }

    if (fields.includes("discount")) {
      if (discount === undefined || typeof discount !== "number" || discount < 0 || discount > 100) {
        errori.push("Il campo 'discount' deve essere un numero tra 0 e 100.");
      }
    }

    if (fields.includes("country")) {
      if (!country || typeof country !== "string" || country.trim() === "") {
        errori.push("Il campo 'country' è obbligatorio.");
      }
    }

    if (errori.length > 0) {
      return res.status(400).json({ errors: errori });
    }

    next();
  };
}

module.exports = userDataValidation;