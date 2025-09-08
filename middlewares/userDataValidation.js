function userDataValidation(req, res, next) {
  const {
    name,
    last_name,
    email,
    address,
    city,
    cap,
    country,
  } = req.body

  const errori = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errori.push("Il campo 'name' è obbligatorio.");
  }

  if (!last_name || typeof last_name !== "string" || last_name.trim() === "") {
    errori.push("Il campo 'last_name' è obbligatorio.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errori.push("Il campo 'email' non è valido.");
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    errori.push("Il campo 'address' è obbligatorio.");
  }

  if (!city || typeof city !== "string" || city.trim() === "") {
    errori.push("Il campo 'city' è obbligatorio.");
  }

  if (!cap || !/^\d{5}$/.test(cap)) {
    errori.push("Il campo 'cap' deve essere un CAP valido (5 cifre).");
  }

  if (!country || typeof country !== "string" || country.trim() === "") {
    errori.push("Il campo 'country' è obbligatorio.");
  }

  if (errori.length > 0) {
    return res.status(400).json({ errors: errori });
  }

  next()
}

module.exports = userDataValidation;
