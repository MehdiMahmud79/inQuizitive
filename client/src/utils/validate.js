const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const setStyle = (name, value, callback) => {
  if (!value) return callback("text-gray-400 m-2");
  switch (name) {
    case "email":
      if (value) {
        const validEmail = validateEmail(value);
        if (!validEmail) {
          return callback("text-red-600 m-2");
        } else {
          return callback("text-green-600 m-2");
        }
      }
      break;
    case "password":
      if (value) {
        if (value.length >= 6) {
          return callback("text-green-600 m-2");
        } else {
          return callback("text-red-600 m-2");
        }
      }
      break;
    case "password2":
      if (value) {
        if (value.length >= 6) {
          return callback("text-green-600 m-2");
        } else {
          return callback("text-red-600 m-2");
        }
      }
      break;
    case "username":
      if (value) {
        if (value.length > 2) {
          return callback("text-green-600 m-2");
        } else {
          return callback("text-red-600 m-2");
        }
      }
      break;
    default:
      return;
  }

  if (name === "username" && value.length > 2) {
    return callback("text-green-600 m-2");
  } else {
    return callback("text-red-600 m-2");
  }
};
